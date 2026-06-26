from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class WeekSchema(BaseModel):
    week_num: str
    title: str
    checklist: List[str]

class PhaseBase(BaseModel):
    phase_num: int
    title: str
    description: Optional[str] = None
    status: str = "Locked"  # e.g., Active, Done, Locked
    weeks: List[WeekSchema] = []

class PhaseCreate(PhaseBase):
    pass

class PhaseUpdate(BaseModel):
    phase_num: Optional[int] = None
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    weeks: Optional[List[WeekSchema]] = None

class Phase(PhaseBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
