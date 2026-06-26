from datetime import datetime
from typing import Dict, List, Any

def get_daily_recommendation(
    completed_topics: List[str], 
    current_date_str: str, 
    confidence_levels: Dict[str, int], 
    is_maintenance: bool = False
) -> Dict[str, str]:
    """
    Analyzes the unified EngineeringState to determine:
    1. What is the recommended task ID for today?
    2. Why is this the highest priority? (Justification reasoning)
    3. What capability does it improve?
    4. What future milestone does it unlock?
    """
    try:
      current_date = datetime.strptime(current_date_str, "%Y-%m-%d")
      is_sunday = current_date.weekday() == 6  # 6 is Sunday in Python's datetime
    except Exception:
      is_sunday = False

    # Rule 1: Sunday Weekly Review Blocker
    if is_sunday:
        return {
            "taskId": "sunday-review",
            "justification": "It is Sunday. In alignment with EJP Law 5 (Consistency over Intensity) and the PERDS review dimension, this is your mandatory rest day. You must perform the 45-minute Weekly Review Protocol this evening to assess metrics, write your reflection log, and unlock the next week.",
            "capabilityImproved": "Aptitude and reflective planning (PERDS)",
            "milestoneUnlocked": "Next week's curriculum sprint"
        }

    # Rule 2: Maintenance Mode (Type C College Exam Freeze)
    if is_maintenance:
        low_skills = [skill for skill, conf in confidence_levels.items() if 0 < conf < 80]
        revision_target = low_skills[0] if low_skills else "dsa"
        
        return {
            "taskId": f"revision-{revision_target}",
            "justification": "Platform is shifted to Maintenance Mode (Type C Exam Freeze) due to academic exam overlaps. Primary concept learning is suspended. Priority is shifted to local revision drills of your weakest tech block and a 15-minute DSA review to maintain logic patterns.",
            "capabilityImproved": "Reinforcing weak skills (" + revision_target.upper() + ") and maintaining logic habits under load.",
            "milestoneUnlocked": "Resuming sprints with zero memory deficits."
        }

    # Rule 3: Timed Exit Gate Assessment Blocker
    if all(d in completed_topics for d in ["day-1", "day-2", "day-3", "day-4", "day-5"]):
        if "week-2" not in completed_topics:
            return {
                "taskId": "week-2-assessment",
                "justification": "All Phase 0 (Python Core) daily missions are checked. You are blocked from Phase 1 SQL lectures until you pass the 45-minute timed Phase 0 Exit Gate Assessment to verify OOP encapsulation and concurrency.",
                "capabilityImproved": "Core Python programming speed and concurrency architecture validation.",
                "milestoneUnlocked": "Phase 1 SQL Strengthening modules."
            }

    if all(d in completed_topics for d in ["day-6", "day-7"]):
        if "week-4" not in completed_topics:
            return {
                "taskId": "week-4-assessment",
                "justification": "All Phase 1 (SQL) daily missions are checked. You are blocked from Phase 2 Frontend modules until you pass the 15-minute timed Phase 1 Exit Gate Assessment to verify analytical window functions.",
                "capabilityImproved": "Relational schema design and optimized window joins querying.",
                "milestoneUnlocked": "Phase 2 Frontend layouts modules."
            }

    if all(d in completed_topics for d in ["day-8", "day-9"]):
        if "week-6" not in completed_topics:
            return {
                "taskId": "week-6-assessment",
                "justification": "All Phase 2 (Frontend) daily missions are checked. You are blocked from Phase 3 React elements until you pass the 60-minute timed Phase 2 Exit Gate Assessment to verify async API fetches.",
                "capabilityImproved": "Responsive interface layouts and asynchronous DOM scripting.",
                "milestoneUnlocked": "Phase 3 React elements modules."
            }

    if all(d in completed_topics for d in ["day-10", "day-11", "day-12", "day-13"]):
        if "week-10" not in completed_topics:
            return {
                "taskId": "week-10-assessment",
                "justification": "All Phase 3 & 4 (React) daily missions are checked. You are blocked from Phase 5 FastAPI routers until you pass the 180-minute timed Phase 4 Exit Gate (Kanban UI) Assessment.",
                "capabilityImproved": "Component state management, Context data flows, and TS typings.",
                "milestoneUnlocked": "Phase 5 FastAPI REST backends."
            }

    # Rule 4: Chronological Day Progression
    total_days = 23
    for d in range(1, total_days + 1):
        day_id = f"day-{d}"
        if day_id not in completed_topics:
            justification = f"This is the next incomplete daily mission in your curriculum (Day {d}). Complete this day's concept learning and submit the mini-build to maintain your active streak."
            capability = "General programming and logic"
            milestone = "Next daily mission or the week's exit gate assessment."
            
            if d <= 5:
                justification = f"Day {d} Mission: Focus on Python core foundations. No AI is permitted during compilation to build muscle memory."
                capability = "Object-Oriented Programming and basic syntax speed"
                milestone = "Phase 0 Exit Gate (Day 5)"
            elif d <= 7:
                justification = f"Day {d} Mission: Database schemas and window queries. Master joins and indexing executions before proceeding to backends."
                capability = "Relational queries, transaction boundaries, and schema normalization"
                milestone = "Phase 1 Exit Gate (Day 7)"
            elif d <= 9:
                justification = f"Day {d} Mission: Semantic markup and JavaScript DOM. Build layouts without helper frameworks."
                capability = "Responsive CSS rendering, semantic HTML5, and async JS DOM scripts"
                milestone = "Phase 2 Exit Gate (Day 9)"
            elif d <= 13:
                justification = f"Day {d} Mission: React component states, hooks, and Context API. Prepares for full-stack integration."
                capability = "Modular component creation, dynamic state flows, and custom hook design"
                milestone = "Phase 4 Exit Gate (Day 13)"
            elif d <= 15:
                justification = f"Day {d} Mission: FastAPI router dependencies, ORM sessions, and migrations."
                capability = "Async web request handling, REST API CRUD controllers, and Alembic db schemas"
                milestone = "Phase 5 Exit Gate (Day 15)"
            elif d <= 18:
                justification = f"Day {d} Mission: AI RAG pipeline design, vector databases embedding, and LangGraph loops."
                capability = "Multimodal inference, vector similarity search, and structured output parsing"
                milestone = "Phase 6 Exit Gate (Day 18)"

            return {
                "taskId": day_id,
                "justification": justification,
                "capabilityImproved": capability,
                "milestoneUnlocked": milestone
            }

    # Fallback: Curriculum Graduation
    return {
        "taskId": "graduation",
        "justification": "Congratulations! You have completed all daily missions and exit gate assessments. Your Engineering OS indicates 100% placement readiness. Proceed to interview funnels.",
        "capabilityImproved": "Overall portfolio quality and competitive interview preparation.",
        "milestoneUnlocked": "Placement hiring cycles and career compounding."
    }

