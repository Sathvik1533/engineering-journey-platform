from pydantic import BaseModel, ConfigDict
from typing import Optional

class MissionBase(BaseModel):
    title: str
    subtitle: Optional[str] = None
    this_week: Optional[str] = None
    today_focus: Optional[str] = None
    exit_gate: Optional[str] = None
    ai_stage: Optional[str] = None
    is_completed: bool = False

class MissionCreate(MissionBase):
    pass

class MissionUpdate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    this_week: Optional[str] = None
    today_focus: Optional[str] = None
    exit_gate: Optional[str] = None
    ai_stage: Optional[str] = None
    is_completed: Optional[bool] = None

class Mission(MissionBase):
    id: int

    # Pydantic v2 configuration. 
    # 'from_attributes=True' replaces Pydantic v1 'orm_mode=True'
    # enabling automatic conversion of SQLAlchemy objects to Pydantic objects.
    model_config = ConfigDict(from_attributes=True)
