from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.mission import Mission, MissionCreate, MissionUpdate
from app.crud import mission as crud_mission

router = APIRouter(prefix="/missions", tags=["Missions"])

@router.get("/", response_model=List[Mission])
def read_missions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve all missions.
    
    * **Request**: 
      * Query parameters `skip` (number of records to bypass) and `limit` (max records to return) to handle database pagination.
    * **Response**: 
      * List of Mission JSON objects validating against the `Mission` schema.
    * **Database Interaction**: 
      * Executes a `SELECT` statement on the `missions` table utilizing SQLAlchemy 2.0 query limits.
    * **Why this approach**: 
      * Decoupling database queries into a CRUD layer makes the code easy to test, read, and maintain. Using database-level pagination protects server memory from over-allocation.
    """
    return crud_mission.get_missions(db, skip=skip, limit=limit)

@router.post("/", response_model=Mission, status_code=status.HTTP_201_CREATED)
def create_mission(mission: MissionCreate, db: Session = Depends(get_db)):
    """
    Create a new mission.
    
    * **Request**: 
      * JSON payload matching the `MissionCreate` schema.
    * **Response**: 
      * The created database record containing its newly generated auto-incrementing primary key ID.
    * **Database Interaction**: 
      * Performs an `INSERT` operation into the `missions` table, commits the active transaction, and refreshes the model instance.
    * **Why this approach**: 
      * Pre-validating payloads with Pydantic prevents invalid formats from hitting the database. Returning `201 Created` status code is the HTTP standard for resource creation.
    """
    return crud_mission.create_mission(db, mission=mission)

@router.get("/{mission_id}", response_model=Mission)
def read_mission(mission_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a specific mission by its ID.
    
    * **Request**: 
      * Path parameter `mission_id` representing the database primary key.
    * **Response**: 
      * Single Mission JSON object matching the requested ID.
    * **Database Interaction**: 
      * Performs a `SELECT` query filtered by `where(id == mission_id)`.
    * **Why this approach**: 
      * Validates if the record exists first. If missing, raises a clean `404 Not Found` HTTP exception immediately instead of returning null values which can cause frontend UI errors.
    """
    db_mission = crud_mission.get_mission(db, mission_id=mission_id)
    if db_mission is None:
        raise HTTPException(status_code=404, detail="Mission not found")
    return db_mission

@router.put("/{mission_id}", response_model=Mission)
def update_mission(mission_id: int, mission_update: MissionUpdate, db: Session = Depends(get_db)):
    """
    Update details of a specific mission.
    
    * **Request**: 
      * Path parameter `mission_id` and a JSON body containing fields to update.
    * **Response**: 
      * The updated database record validating against the `Mission` schema.
    * **Database Interaction**: 
      * Performs a `SELECT` statement to query existence, applies `SET` updates to modified fields, commits the transaction, and refreshes the model.
    * **Why this approach**: 
      * Using Pydantic's `exclude_unset=True` dynamically scales the update query, meaning client requests only modify columns they explicitly specify, preventing overwriting unaffected columns.
    """
    db_mission = crud_mission.update_mission(db, mission_id=mission_id, mission_update=mission_update)
    if db_mission is None:
        raise HTTPException(status_code=404, detail="Mission not found")
    return db_mission

@router.delete("/{mission_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_mission(mission_id: int, db: Session = Depends(get_db)):
    """
    Remove a specific mission.
    
    * **Request**: 
      * Path parameter `mission_id`.
    * **Response**: 
      * Empty response body returning HTTP status code `204 No Content`.
    * **Database Interaction**: 
      * Performs a `DELETE` query targeting the specific row matching `mission_id`.
    * **Why this approach**: 
      * A successful delete has no data left to show, so returning `204 No Content` is the correct HTTP standard for resources that no longer exist.
    """
    success = crud_mission.delete_mission(db, mission_id=mission_id)
    if not success:
        raise HTTPException(status_code=404, detail="Mission not found")
    return None
