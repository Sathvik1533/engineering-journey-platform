from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.phase import Phase
from app.schemas.phase import PhaseCreate, PhaseUpdate

# CRUD helper methods for Phases using SQLAlchemy 2.0 query structures.

def get_phase(db: Session, phase_id: int):
    return db.scalar(select(Phase).where(Phase.id == phase_id))

def get_phase_by_num(db: Session, phase_num: int):
    return db.scalar(select(Phase).where(Phase.phase_num == phase_num))

def get_phases(db: Session, skip: int = 0, limit: int = 100):
    return list(db.scalars(select(Phase).order_by(Phase.phase_num).offset(skip).limit(limit)).all())

def create_phase(db: Session, phase: PhaseCreate):
    # Map input schemas containing custom nested validation arrays into database serializable lists
    phase_data = phase.model_dump()
    db_phase = Phase(**phase_data)
    db.add(db_phase)
    db.commit()
    db.refresh(db_phase)
    return db_phase

def update_phase(db: Session, phase_id: int, phase_update: PhaseUpdate):
    db_phase = get_phase(db, phase_id)
    if not db_phase:
        return None
    
    update_data = phase_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        # Pydantic v2 subschemas are serialized back into base dictionary lists for DB JSON save
        if key == "weeks" and value is not None:
            value = [week.model_dump() if hasattr(week, "model_dump") else week for week in value]
        setattr(db_phase, key, value)
        
    db.commit()
    db.refresh(db_phase)
    return db_phase

def delete_phase(db: Session, phase_id: int):
    db_phase = get_phase(db, phase_id)
    if db_phase:
        db.delete(db_phase)
        db.commit()
        return True
    return False
