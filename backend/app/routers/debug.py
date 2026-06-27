"""
Engineering OS — Debug Router
/api/debug/* endpoints power the Developer Mode overlay and Time Machine.
These endpoints are NEVER called during normal user flow — only activated
by Cmd+Shift+D or the Time Machine panel.
"""

import json
from datetime import datetime, timedelta
from typing import Dict, Any, List, Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.database import get_db
from app.models.state import EngineeringState
from app.services.capability import calculate_capabilities
from app.services.recommendation import get_daily_recommendation
from app.services.recovery import calculate_schedule_status
from app.services.event_system import get_week_for_completed_topics
from pydantic import BaseModel

router = APIRouter(prefix="/debug", tags=["Developer Mode"])


# ─────────────────────────────────────────────────────────────────────────────
# 1. FULL DIAGNOSTIC SNAPSHOT
# Returns complete engine output for Developer Mode panel inspection.
# ─────────────────────────────────────────────────────────────────────────────

@router.get("/snapshot")
def get_diagnostic_snapshot(db: Session = Depends(get_db)) -> Dict[str, Any]:
    """
    Returns a full internal state snapshot:
    - Raw EngineeringState from DB
    - Timeline Engine output
    - Recommendation Engine output
    - Capability Engine output
    - Recovery Engine output
    - AI context summary
    - Performance metrics
    """
    state = db.execute(select(EngineeringState)).scalars().first()
    if not state:
        return {"error": "Engineering State not initialized"}

    # Re-run all engines live (read-only, no DB write)
    timeline_data = calculate_schedule_status(state.current_date, state.current_week)
    conf_levels, cap_scores = calculate_capabilities(state.completed_topics)

    rec_data = get_daily_recommendation(
        completed_topics=state.completed_topics,
        current_date_str=state.current_date,
        confidence_levels=conf_levels,
        is_maintenance=state.is_maintenance,
    )

    # Parse stored recommendation justification if it exists
    try:
        stored_justification = json.loads(state.recommendation_justification) if state.recommendation_justification else {}
    except Exception:
        stored_justification = {"raw": state.recommendation_justification}

    # Detect exam windows
    d = state.current_date
    in_midterm_1 = "2026-08-31" <= d <= "2026-09-05"
    in_midterm_2 = "2026-11-02" <= d <= "2026-11-07"
    in_semester_end = "2026-11-16" <= d <= "2026-11-28"
    in_placement_season = d >= "2027-01-01"

    # Calculate days to next exam
    exam_windows = [
        ("Midterm 1", "2026-08-31"),
        ("Midterm 2", "2026-11-02"),
        ("Semester End", "2026-11-16"),
        ("Placement Season", "2027-01-01"),
    ]
    days_to_exams = {}
    try:
        today = datetime.strptime(d, "%Y-%m-%d")
        for name, date_str in exam_windows:
            target = datetime.strptime(date_str, "%Y-%m-%d")
            delta = (target - today).days
            days_to_exams[name] = delta
    except Exception:
        days_to_exams = {}

    # Completion analytics
    completed = list(state.completed_topics) if state.completed_topics else []
    total_days = 23
    completed_days = [t for t in completed if t.startswith("day-")]
    completed_gates = [t for t in completed if t.startswith("week-")]

    snapshot = {
        "engineering_state": {
            "id": state.id,
            "current_date": state.current_date,
            "current_semester": state.current_semester,
            "current_week": state.current_week,
            "current_phase": state.current_phase,
            "current_technology": state.current_technology,
            "current_topic": state.current_topic,
            "current_project": state.current_project,
            "recommended_task_id": state.recommended_task_id,
            "daily_streak": state.daily_streak,
            "weekly_progress": state.weekly_progress,
            "schedule_status": state.schedule_status,
            "is_maintenance": state.is_maintenance,
        },
        "timeline_engine": {
            "status": timeline_data.get("status", "On Schedule"),
            "remaining_buffer": timeline_data.get("remainingBuffer", 11),
            "slippage_days": timeline_data.get("slippageDays", 0),
            "in_midterm_1_window": in_midterm_1,
            "in_midterm_2_window": in_midterm_2,
            "in_semester_end_window": in_semester_end,
            "in_placement_season": in_placement_season,
            "days_to_next_events": days_to_exams,
        },
        "recommendation_engine": {
            "live_task_id": rec_data["taskId"],
            "live_justification": rec_data.get("justification", ""),
            "capability_improved": rec_data.get("capabilityImproved", ""),
            "milestone_unlocked": rec_data.get("milestoneUnlocked", ""),
            "stored_justification": stored_justification,
        },
        "capability_engine": {
            "confidence_levels": conf_levels,
            "capability_scores": cap_scores,
            "overall_readiness": round(
                sum(cap_scores.values()) / max(len(cap_scores), 1), 1
            ),
        },
        "recovery_engine": {
            "status": timeline_data.get("status", "On Schedule"),
            "buffer_days_remaining": timeline_data.get("remainingBuffer", 11),
            "slippage_days": timeline_data.get("slippageDays", 0),
            "is_critical": timeline_data.get("slippageDays", 0) > 5,
        },
        "completion_analytics": {
            "completed_days": completed_days,
            "completed_day_count": len(completed_days),
            "total_days": total_days,
            "completion_percentage": round(
                len(completed_days) / total_days * 100, 1
            ),
            "completed_exit_gates": completed_gates,
            "all_completed_topics": completed,
        },
        "ai_context": {
            "current_topic": state.current_topic,
            "current_technology": state.current_technology,
            "active_milestones": list(state.active_milestones) if state.active_milestones else [],
            "pending_assessments": list(state.pending_assessments) if state.pending_assessments else [],
            "ai_mentor_context_fields": [
                "current_topic", "current_technology", "capability_scores",
                "recommendation_justification", "active_milestones"
            ],
        },
        "meta": {
            "snapshot_taken_at": datetime.utcnow().isoformat() + "Z",
            "api_version": "4.0.0",
            "engines_run": ["Timeline", "Recommendation", "Capability", "Recovery"],
        }
    }

    return snapshot


# ─────────────────────────────────────────────────────────────────────────────
# 2. TIME MACHINE SIMULATION
# Simulates state at a given date WITHOUT writing to DB.
# Returns projected state: recommendation, timeline status, exam window detection.
# ─────────────────────────────────────────────────────────────────────────────

class TimeMachineRequest(BaseModel):
    simulate_date: str           # YYYY-MM-DD
    override_completed: Optional[List[str]] = None  # optional override for completed topics


@router.post("/simulate")
def simulate_state(req: TimeMachineRequest, db: Session = Depends(get_db)) -> Dict[str, Any]:
    """
    Time Machine: projects what the EngineeringState would look like on simulate_date.
    Read-only — no DB writes. Uses real engines for authentic projection.
    """
    state = db.execute(select(EngineeringState)).scalars().first()
    if not state:
        return {"error": "Engineering State not initialized"}

    sim_date = req.simulate_date
    completed = req.override_completed if req.override_completed is not None \
        else (list(state.completed_topics) if state.completed_topics else [])

    # Detect exam windows
    in_exam = (
        "2026-08-31" <= sim_date <= "2026-09-05"
        or "2026-11-02" <= sim_date <= "2026-11-07"
        or "2026-11-16" <= sim_date <= "2026-11-28"
    )

    # Determine semester
    if sim_date >= "2026-12-07":
        semester = "Semester 3-2"
    else:
        semester = "Semester 3-1"

    # Infer week
    sim_week = get_week_for_completed_topics(completed)

    # Run engines with simulated date
    timeline_data = calculate_schedule_status(sim_date, sim_week)
    conf_levels, cap_scores = calculate_capabilities(completed)
    rec_data = get_daily_recommendation(
        completed_topics=completed,
        current_date_str=sim_date,
        confidence_levels=conf_levels,
        is_maintenance=in_exam,
    )

    # Calculate days from now
    try:
        real_today = datetime.strptime(state.current_date, "%Y-%m-%d")
        sim_target = datetime.strptime(sim_date, "%Y-%m-%d")
        delta_days = (sim_target - real_today).days
    except Exception:
        delta_days = 0

    # Detect special time contexts
    try:
        sim_dt = datetime.strptime(sim_date, "%Y-%m-%d")
        weekday_name = sim_dt.strftime("%A")
        is_sunday = sim_dt.weekday() == 6
    except Exception:
        weekday_name = "Unknown"
        is_sunday = False

    return {
        "simulated_date": sim_date,
        "delta_from_today": delta_days,
        "weekday": weekday_name,
        "is_sunday": is_sunday,
        "projected_semester": semester,
        "projected_week": sim_week,
        "is_exam_window": in_exam,
        "timeline": {
            "status": timeline_data.get("status", "On Schedule"),
            "remaining_buffer": timeline_data.get("remainingBuffer", 11),
            "slippage_days": timeline_data.get("slippageDays", 0),
        },
        "recommendation": {
            "task_id": rec_data["taskId"],
            "justification": rec_data.get("justification", ""),
            "capability": rec_data.get("capabilityImproved", ""),
            "milestone": rec_data.get("milestoneUnlocked", ""),
        },
        "capability": {
            "confidence_levels": conf_levels,
            "capability_scores": cap_scores,
            "overall_readiness": round(
                sum(cap_scores.values()) / max(len(cap_scores), 1), 1
            ),
        },
        "meta": {
            "simulated_at": datetime.utcnow().isoformat() + "Z",
            "simulation_mode": True,
            "db_unchanged": True,
        }
    }


# ─────────────────────────────────────────────────────────────────────────────
# 3. QUICK PRESET TIME JUMPS
# Returns the simulated date for common jump presets (no DB call needed).
# ─────────────────────────────────────────────────────────────────────────────

@router.get("/presets")
def get_time_presets(db: Session = Depends(get_db)) -> Dict[str, Any]:
    """Returns list of time jump presets relative to the current date."""
    state = db.execute(select(EngineeringState)).scalars().first()
    current = state.current_date if state else datetime.utcnow().strftime("%Y-%m-%d")

    try:
        today = datetime.strptime(current, "%Y-%m-%d")
    except Exception:
        today = datetime.utcnow()

    def fmt(d: datetime) -> str:
        return d.strftime("%Y-%m-%d")

    presets = [
        {"id": "today", "label": "Today", "date": current},
        {"id": "tomorrow", "label": "Tomorrow", "date": fmt(today + timedelta(days=1))},
        {"id": "next_week", "label": "Next Week", "date": fmt(today + timedelta(weeks=1))},
        {"id": "next_month", "label": "Next Month", "date": fmt(today + timedelta(days=30))},
        {"id": "midterm1_start", "label": "Midterm 1 Start", "date": "2026-08-31"},
        {"id": "midterm1_end", "label": "Midterm 1 End", "date": "2026-09-05"},
        {"id": "midterm2_start", "label": "Midterm 2 Start", "date": "2026-11-02"},
        {"id": "semester_end_start", "label": "Semester End Exams", "date": "2026-11-16"},
        {"id": "semester_end_last", "label": "Semester End (Last Day)", "date": "2026-11-28"},
        {"id": "semester_32", "label": "Semester 3-2 Start", "date": "2026-12-07"},
        {"id": "placement_season", "label": "Placement Season", "date": "2027-01-01"},
        {"id": "graduation", "label": "Graduation Target", "date": "2027-05-01"},
    ]

    return {
        "current_date": current,
        "presets": presets,
    }
