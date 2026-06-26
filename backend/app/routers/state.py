from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.database import get_db
from app.models.state import EngineeringState
from app.services.event_system import process_event
from pydantic import BaseModel
from typing import Dict, Any

router = APIRouter(prefix="/state", tags=["State"])

class EventRequest(BaseModel):
    eventType: str
    payload: Dict[str, Any]

@router.get("/")
def get_state(db: Session = Depends(get_db)):
    """
    Fetches the single source of truth EngineeringState.
    If no state exists, seeds the default startup state.
    """
    result = db.execute(select(EngineeringState)).scalars().first()
    if not result:
        # Seed default state
        default_state = EngineeringState(
            current_date="2026-06-26",
            current_semester="Semester 3-1",
            current_week=1,
            current_phase=0,
            current_technology="Python Core",
            current_topic="Syntax & Loops",
            current_project="CLI Calculator",
            completed_topics=[],
            pending_assessments=["week-2", "week-4", "week-6", "week-10"],
            active_milestones=["Syntax mastery", "OOP structure"],
            confidence_levels={
                "python": 0, "sql": 0, "html_css": 0, "js_dom": 0,
                "react": 0, "typescript": 0, "fastapi": 0, "sqlalchemy": 0,
                "ai_engineering": 0, "system_design": 0, "dsa": 0, "professional_growth": 0
            },
            capability_scores={
                "backend": 0, "frontend": 0, "ai_agents": 0, "interview_readiness": 0
            },
            next_unlock="week-1",
            recommended_task_id="day-1",
            recommendation_justification="Begin with Day 1 mission to establish core syntax conventions before building calculators."
        )
        db.add(default_state)
        db.commit()
        db.refresh(default_state)
        return default_state
    return result

@router.post("/event")
def trigger_event(req: EventRequest, db: Session = Depends(get_db)):
    """
    State mutation entrypoint. All user actions post events here,
    which runs the engine pipelines before committing state changes.
    """
    state = db.execute(select(EngineeringState)).scalars().first()
    if not state:
        raise HTTPException(status_code=404, detail="Engineering State not initialized")
        
    try:
        updated_state = process_event(db, state, req.eventType, req.payload)
        return updated_state
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to process event: {e}")
