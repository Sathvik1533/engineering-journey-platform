from sqlalchemy import Integer, String, JSON, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base
from typing import List, Dict, Any

class EngineeringState(Base):
    __tablename__ = "engineering_state"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    
    # 1. Temporal & Progress Context
    current_date: Mapped[str] = mapped_column(String, default="2026-06-26")
    current_semester: Mapped[str] = mapped_column(String, default="Semester 3-1")
    current_week: Mapped[int] = mapped_column(Integer, default=1)
    current_phase: Mapped[int] = mapped_column(Integer, default=0)
    current_technology: Mapped[str] = mapped_column(String, default="Python Core")
    current_topic: Mapped[str] = mapped_column(String, default="Syntax & Loops")
    current_project: Mapped[str] = mapped_column(String, default="CLI Calculator")

    # 2. Lists & Arrays (Stored as JSON in SQLite/Postgres)
    completed_topics: Mapped[List[str]] = mapped_column(JSON, default=list)
    pending_assessments: Mapped[List[str]] = mapped_column(JSON, default=list)
    active_milestones: Mapped[List[str]] = mapped_column(JSON, default=list)

    # 3. Dynamic Engine Maps
    confidence_levels: Mapped[Dict[str, int]] = mapped_column(JSON, default=dict)
    capability_scores: Mapped[Dict[str, int]] = mapped_column(JSON, default=dict)

    # 4. Navigation & Recommendations
    next_unlock: Mapped[str] = mapped_column(String, default="week-1")
    recommended_task_id: Mapped[str] = mapped_column(String, default="day-1")
    recommendation_justification: Mapped[str] = mapped_column(String, default="Begin with Day 1 mission to establish core syntax conventions before building calculators.")

    # 5. Dynamic Engine Output Cache (Refinement 5 Compliance)
    remaining_buffer: Mapped[int] = mapped_column(Integer, default=11)
    slippage_days: Mapped[int] = mapped_column(Integer, default=0)
    schedule_status: Mapped[str] = mapped_column(String, default="On Schedule")
    daily_streak: Mapped[int] = mapped_column(Integer, default=1)
    weekly_progress: Mapped[int] = mapped_column(Integer, default=0)
    is_maintenance: Mapped[bool] = mapped_column(Boolean, default=False)

