import json
from typing import List, Dict
from sqlalchemy.orm import Session
from app.models.state import EngineeringState
from app.services.capability import calculate_capabilities
from app.services.recommendation import get_daily_recommendation
from app.services.recovery import calculate_schedule_status

def process_event(db: Session, state: EngineeringState, event_type: str, payload: dict) -> EngineeringState:
    """
    Core Event System processor.
    Accepts an event, runs all core engines, updates the EngineeringState record,
    and commits the changes to the database.
    """
    
    # Check if we are in exam freeze / maintenance mode
    is_maintenance = "dsa" in state.recommended_task_id and state.recommended_task_id.startswith("revision")
    
    if event_type == "TOGGLE_TASK":
        task_id = payload.get("taskId")
        is_checked = payload.get("isChecked", False)
        
        current_completed = list(state.completed_topics) if state.completed_topics else []
        
        if is_checked:
            if task_id not in current_completed:
                current_completed.append(task_id)
        else:
            if task_id in current_completed:
                current_completed.remove(task_id)
                
        state.completed_topics = current_completed

    elif event_type == "PASS_ASSESSMENT":
        assessment_id = payload.get("assessmentId")
        current_completed = list(state.completed_topics) if state.completed_topics else []
        
        if assessment_id not in current_completed:
            current_completed.append(assessment_id)
            
        state.completed_topics = current_completed
        
        # Unlock next phase sequence mapping
        if assessment_id == "week-2":
            state.next_unlock = "week-3"
            state.current_phase = 1
            state.current_technology = "SQL / PostgreSQL"
            state.current_topic = "Database Schema & Joins"
            state.current_project = "Normalized E-commerce Schema"
        elif assessment_id == "week-4":
            state.next_unlock = "week-5"
            state.current_phase = 2
            state.current_technology = "HTML5 / CSS3"
            state.current_topic = "Semantic Layouts & CSS Grids"
            state.current_project = "Portfolio Landing Page"
        elif assessment_id == "week-6":
            state.next_unlock = "week-7"
            state.current_phase = 3
            state.current_technology = "React + TypeScript"
            state.current_topic = "React Elements & State Hooks"
            state.current_project = "Task Stage Planner"
        elif assessment_id == "week-10":
            state.next_unlock = "week-11"
            state.current_phase = 5
            state.current_technology = "FastAPI / SQLAlchemy"
            state.current_topic = "Async API Routers & Pydantic"
            state.current_project = "Task REST API CRUD"

    elif event_type == "SET_DATE":
        new_date_str = payload.get("date")
        state.current_date = new_date_str
        
        # Check if date overlaps with known MLR exam dates
        # Midterm 1: 31 Aug – 5 Sep 2026
        # Midterm 2: 2 Nov – 7 Nov 2026
        # Semester End Exams: 16 Nov – 28 Nov 2026
        if ("2026-08-31" <= new_date_str <= "2026-09-05" or 
            "2026-11-02" <= new_date_str <= "2026-11-07" or
            "2026-11-16" <= new_date_str <= "2026-11-28"):
            is_maintenance = True
        else:
            is_maintenance = False
            
        # Determine semester dynamically
        if new_date_str >= "2026-12-07":
            state.current_semester = "Semester 3-2"
        else:
            state.current_semester = "Semester 3-1"

    elif event_type == "TRIGGER_FREEZE":
        # Force toggle maintenance revision mode
        is_maintenance = payload.get("isFreeze", False)
        
    state.is_maintenance = is_maintenance

    # ─────────────────────────────────────────────────────────────
    # Run Core Calculation Engines in Sequence (Refinement 3)
    # ─────────────────────────────────────────────────────────────
    
    # 1. Timeline / Date Check (Recovery Engine)
    status_info = calculate_schedule_status(state.current_date, state.current_week)
    state.remaining_buffer = status_info.get("remainingBuffer", 11)
    state.slippage_days = status_info.get("slippageDays", 0)
    state.schedule_status = status_info.get("status", "On Schedule")
    
    # 2. Skill Metrics Calculation (Capability Engine)
    conf_levels, cap_scores = calculate_capabilities(state.completed_topics)
    state.confidence_levels = conf_levels
    state.capability_scores = cap_scores

    # 3. Dynamic Priority Recommendation (Recommendation Engine)
    rec_info = get_daily_recommendation(
        completed_topics=state.completed_topics, 
        current_date_str=state.current_date, 
        confidence_levels=state.confidence_levels,
        is_maintenance=is_maintenance
    )
    state.recommended_task_id = rec_info["taskId"]
    state.recommendation_justification = json.dumps({
        "why": rec_info.get("justification", ""),
        "capability": rec_info.get("capabilityImproved", "General programming & logic"),
        "milestone": rec_info.get("milestoneUnlocked", "Next curriculum phase")
    })

    # Save details on the currently active week/phase based on completed gates
    state.current_week = get_week_for_completed_topics(state.completed_topics)

    # 4. Weekly progress percentage
    # Count how many days of the current week are completed
    current_week_prefix = f"week-{state.current_week}"
    # In EJP syllabus, we map tasks to day numbers or weeks.
    # Let's count completion percentage of active tasks:
    completed_days_count = sum(1 for t in state.completed_topics if t.startswith('day-'))
    state.weekly_progress = min(100, int((completed_days_count / 23.0) * 100))
    
    # Maintain daily streak
    if len(state.completed_topics) > 0:
        state.daily_streak = max(1, len(state.completed_topics))

    # Commit modifications to SQLite / PostgreSQL (Refinement 2)
    db.commit()
    db.refresh(state)
    return state

def get_week_for_completed_topics(completed: List[str]) -> int:
    """
    Simple mapping helper to track the current active week
    based on exit gate completion.
    """
    if "week-18" in completed: return 19
    if "week-15" in completed: return 16
    if "week-12" in completed: return 13
    if "week-10" in completed: return 11
    if "week-8" in completed: return 9
    if "week-6" in completed: return 7
    if "week-4" in completed: return 5
    if "week-2" in completed: return 3
    return 1
