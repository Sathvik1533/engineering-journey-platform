from sqlalchemy import Integer, String, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base

class Mission(Base):
    __tablename__ = "missions"

    # In SQLAlchemy 2.0, Mapped[type] is the standard way to declare column types.
    # mapped_column() is used to configure constraint options.
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String, nullable=False)
    subtitle: Mapped[str] = mapped_column(String, nullable=True)
    this_week: Mapped[str] = mapped_column(String, nullable=True)
    today_focus: Mapped[str] = mapped_column(String, nullable=True)
    exit_gate: Mapped[str] = mapped_column(String, nullable=True)
    ai_stage: Mapped[str] = mapped_column(String, nullable=True)
    is_completed: Mapped[bool] = mapped_column(Boolean, default=False)
