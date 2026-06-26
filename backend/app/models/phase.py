from sqlalchemy import Integer, String, JSON
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base
from typing import List, Dict, Any

class Phase(Base):
    __tablename__ = "phases"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    phase_num: Mapped[int] = mapped_column(Integer, unique=True, index=True, nullable=False)
    title: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=True)
    status: Mapped[str] = mapped_column(String, default="Locked")  # Active, Done, Locked
    
    # SQLAlchemy 2.0 supports mapping JSON columns directly.
    # JSON maps natively to Dict/List objects in Python.
    # This works seamlessly on both PostgreSQL and SQLite.
    weeks: Mapped[List[Dict[str, Any]]] = mapped_column(JSON, default=list)
