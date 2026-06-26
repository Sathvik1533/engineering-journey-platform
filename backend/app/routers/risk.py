from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.risk import Risk, RiskCreate, RiskUpdate
from app.crud import risk as crud_risk

router = APIRouter(prefix="/risks", tags=["Risks"])

@router.get("/", response_model=List[Risk])
def read_risks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve all logs in the Risk Register.
    
    * **Request**: 
      * Optional query parameters `skip` and `limit` to control database pagination.
    * **Response**: 
      * List of Risk items validating against the Pydantic `Risk` schema.
    * **Database Interaction**: 
      * Performs a `SELECT` statement on the `risks` table.
    * **Why this approach**: 
      * Standard pagination structure to fetch risk items. Keeping the database operations inside the CRUD module separates routing definitions from data query implementation.
    """
    return crud_risk.get_risks(db, skip=skip, limit=limit)

@router.post("/", response_model=Risk, status_code=status.HTTP_201_CREATED)
def create_risk(risk: RiskCreate, db: Session = Depends(get_db)):
    """
    Log a new risk in the register.
    
    * **Request**: 
      * JSON object containing fields (description, impact, probability, mitigation) defined in the `RiskCreate` schema.
    * **Response**: 
      * The created database record containing its newly generated auto-incrementing primary key ID.
    * **Database Interaction**: 
      * Executes an `INSERT` statement on the `risks` table, commits the transaction, and refreshes the model instance.
    * **Why this approach**: 
      * Pydantic schemas enforce type safety (e.g., ensuring description is text and impact/probability strings are correct) before executing queries.
    """
    return crud_risk.create_risk(db, risk=risk)

@router.get("/{risk_id}", response_model=Risk)
def read_risk(risk_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a specific logged risk.
    
    * **Request**: 
      * Path parameter `risk_id` representing the primary key ID.
    * **Response**: 
      * Single Risk JSON object matching the requested database ID.
    * **Database Interaction**: 
      * Performs a `SELECT` query filtered by `where(id == risk_id)`.
    * **Why this approach**: 
      * Standard mapping. If no record matches, raises a clean `404 Not Found` response.
    """
    db_risk = crud_risk.get_risk(db, risk_id=risk_id)
    if db_risk is None:
        raise HTTPException(status_code=404, detail="Risk not found")
    return db_risk

@router.put("/{risk_id}", response_model=Risk)
def update_risk(risk_id: int, risk_update: RiskUpdate, db: Session = Depends(get_db)):
    """
    Update details of a logged risk.
    
    * **Request**: 
      * Path parameter `risk_id` and a JSON body containing updated risk fields.
    * **Response**: 
      * The updated database record validating against the `Risk` schema.
    * **Database Interaction**: 
      * Runs a `SELECT` check, changes values, commits changes, and refreshes the instance.
    * **Why this approach**: 
      * Allows updating a risk mitigation plan or scaling down its probability/impact ratings without recreating the log entry.
    """
    db_risk = crud_risk.update_risk(db, risk_id=risk_id, risk_update=risk_update)
    if db_risk is None:
        raise HTTPException(status_code=404, detail="Risk not found")
    return db_risk

@router.delete("/{risk_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_risk(risk_id: int, db: Session = Depends(get_db)):
    """
    Remove a log entry from the Risk Register.
    
    * **Request**: 
      * Path parameter `risk_id`.
    * **Response**: 
      * Empty payload with HTTP status code `204 No Content`.
    * **Database Interaction**: 
      * Performs a `DELETE` query targeting the specific row matching `risk_id`.
    * **Why this approach**: 
      * Standard REST delete endpoint status returning no body payload.
    """
    success = crud_risk.delete_risk(db, risk_id=risk_id)
    if not success:
        raise HTTPException(status_code=404, detail="Risk not found")
    return None
