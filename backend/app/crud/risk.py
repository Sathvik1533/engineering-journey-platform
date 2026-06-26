from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.risk import Risk
from app.schemas.risk import RiskCreate, RiskUpdate

# CRUD helper methods for Risk Register using SQLAlchemy 2.0 query structures.

def get_risk(db: Session, risk_id: int):
    return db.scalar(select(Risk).where(Risk.id == risk_id))

def get_risks(db: Session, skip: int = 0, limit: int = 100):
    return list(db.scalars(select(Risk).offset(skip).limit(limit)).all())

def create_risk(db: Session, risk: RiskCreate):
    db_risk = Risk(**risk.model_dump())
    db.add(db_risk)
    db.commit()
    db.refresh(db_risk)
    return db_risk

def update_risk(db: Session, risk_id: int, risk_update: RiskUpdate):
    db_risk = get_risk(db, risk_id)
    if not db_risk:
        return None
    
    update_data = risk_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_risk, key, value)
        
    db.commit()
    db.refresh(db_risk)
    return db_risk

def delete_risk(db: Session, risk_id: int):
    db_risk = get_risk(db, risk_id)
    if db_risk:
        db.delete(db_risk)
        db.commit()
        return True
    return False
