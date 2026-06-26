from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base

class Risk(Base):
    __tablename__ = "risks"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    description: Mapped[str] = mapped_column(String, nullable=False)
    impact: Mapped[str] = mapped_column(String, nullable=False)       # High, Medium, Low
    probability: Mapped[str] = mapped_column(String, nullable=False)  # High, Medium, Low
    mitigation: Mapped[str] = mapped_column(String, nullable=True)
