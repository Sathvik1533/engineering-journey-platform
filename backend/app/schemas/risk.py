from pydantic import BaseModel, ConfigDict
from typing import Optional

class RiskBase(BaseModel):
    description: str
    impact: str         # High, Medium, Low
    probability: str    # High, Medium, Low
    mitigation: Optional[str] = None

class RiskCreate(RiskBase):
    pass

class RiskUpdate(BaseModel):
    description: Optional[str] = None
    impact: Optional[str] = None
    probability: Optional[str] = None
    mitigation: Optional[str] = None

class Risk(RiskBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
