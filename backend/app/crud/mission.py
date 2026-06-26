from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.mission import Mission
from app.schemas.mission import MissionCreate, MissionUpdate

# CRUD helper methods implementing SQLAlchemy 2.0 syntax (using select() and db.scalar/db.scalars).

def get_mission(db: Session, mission_id: int):
    # db.scalar(select(Model)) is the modern 2.0 query syntax, replacing legacy db.query(Model)
    return db.scalar(select(Mission).where(Mission.id == mission_id))

def get_missions(db: Session, skip: int = 0, limit: int = 100):
    # db.scalars().all() returns a list of models fetched from the DB
    return list(db.scalars(select(Mission).offset(skip).limit(limit)).all())

def create_mission(db: Session, mission: MissionCreate):
    # In Pydantic v2, .model_dump() replaces the old .dict() method
    db_mission = Mission(**mission.model_dump())
    db.add(db_mission)
    db.commit()
    db.refresh(db_mission)
    return db_mission

def update_mission(db: Session, mission_id: int, mission_update: MissionUpdate):
    db_mission = get_mission(db, mission_id)
    if not db_mission:
        return None
    
    # Exclude unset fields so we only overwrite values provided in the request
    update_data = mission_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_mission, key, value)
        
    db.commit()
    db.refresh(db_mission)
    return db_mission

def delete_mission(db: Session, mission_id: int):
    db_mission = get_mission(db, mission_id)
    if db_mission:
        db.delete(db_mission)
        db.commit()
        return True
    return False
