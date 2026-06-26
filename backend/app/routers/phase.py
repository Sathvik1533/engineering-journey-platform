from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.phase import Phase, PhaseCreate, PhaseUpdate
from app.crud import phase as crud_phase

router = APIRouter(prefix="/phases", tags=["Phases"])

@router.get("/", response_model=List[Phase])
def read_phases(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve all curriculum phases.
    
    * **Request**: 
      * Optional query parameters `skip` and `limit` to paginate results.
    * **Response**: 
      * Ordered list of Phase JSON objects sorted by their phase numbers.
    * **Database Interaction**: 
      * Executes a `SELECT` statement on the `phases` table, ordering rows chronologically via `order_by(Phase.phase_num)`.
    * **Why this approach**: 
      * Keeping phases sorted chronologically by default matches the dashboard curriculum layout, saving the client app from sorting them locally.
    """
    return crud_phase.get_phases(db, skip=skip, limit=limit)

@router.post("/", response_model=Phase, status_code=status.HTTP_201_CREATED)
def create_phase(phase: PhaseCreate, db: Session = Depends(get_db)):
    """
    Create a new curriculum phase.
    
    * **Request**: 
      * JSON object payload matching the `PhaseCreate` schema, including validation of weekly curriculum structures.
    * **Response**: 
      * The created Phase record containing its DB ID and populated default properties.
    * **Database Interaction**: 
      * Executes an `INSERT` statement to add the phase record (including serialization of JSON week cards data).
    * **Why this approach**: 
      * Validates the phase structure before database insertion. The `weeks` property uses SQLAlchemy JSON types which are mapped automatically into relational databases.
    """
    db_phase = crud_phase.get_phase_by_num(db, phase_num=phase.phase_num)
    if db_phase:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=f"Phase number {phase.phase_num} already exists."
        )
    return crud_phase.create_phase(db, phase=phase)

@router.get("/{phase_id}", response_model=Phase)
def read_phase(phase_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a specific curriculum phase.
    
    * **Request**: 
      * Path parameter `phase_id` representing the primary key ID.
    * **Response**: 
      * Single Phase object matching the requested database ID.
    * **Database Interaction**: 
      * Performs a `SELECT` query filtered by `where(id == phase_id)`.
    * **Why this approach**: 
      * Standard path parameter mapping. If no record matches, returning a clear `404 Not Found` response tells the client application that the ID is invalid.
    """
    db_phase = crud_phase.get_phase(db, phase_id=phase_id)
    if db_phase is None:
        raise HTTPException(status_code=404, detail="Phase not found")
    return db_phase

@router.put("/{phase_id}", response_model=Phase)
def update_phase(phase_id: int, phase_update: PhaseUpdate, db: Session = Depends(get_db)):
    """
    Update details of a curriculum phase.
    
    * **Request**: 
      * Path parameter `phase_id` and a JSON body containing updated phase parameters.
    * **Response**: 
      * The updated database record validating against the `Phase` schema.
    * **Database Interaction**: 
      * Runs a `SELECT` check, changes values, commits changes to the database, and refreshes the instance.
    * **Why this approach**: 
      * Enables modifications of details (like locking/unlocking phases or appending week tasks) without needing to recreate or replace the entire phase entity.
    """
    db_phase = crud_phase.update_phase(db, phase_id=phase_id, phase_update=phase_update)
    if db_phase is None:
        raise HTTPException(status_code=404, detail="Phase not found")
    return db_phase

@router.delete("/{phase_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_phase(phase_id: int, db: Session = Depends(get_db)):
    """
    Remove a curriculum phase.
    
    * **Request**: 
      * Path parameter `phase_id`.
    * **Response**: 
      * Empty payload with HTTP status code `204 No Content`.
    * **Database Interaction**: 
      * Performs a `DELETE` query targeting the specific row matching `phase_id`.
    * **Why this approach**: 
      * Returns standard RESTful empty payload on success.
    """
    success = crud_phase.delete_phase(db, phase_id=phase_id)
    if not success:
        raise HTTPException(status_code=404, detail="Phase not found")
    return None
