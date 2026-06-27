import os
import json
from fastapi import APIRouter, HTTPException
from fastapi.responses import PlainTextResponse

router = APIRouter(prefix="/syllabus", tags=["Syllabus"])

# Locate the syllabus.json path dynamically relative to the current file
DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
SYLLABUS_PATH = os.path.join(DATA_DIR, "syllabus.json")
DOCS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), "docs")

def load_syllabus_data() -> dict:
    if not os.path.exists(SYLLABUS_PATH):
        raise HTTPException(status_code=500, detail=f"Syllabus file not found at {SYLLABUS_PATH}")
    try:
        with open(SYLLABUS_PATH, "r") as f:
            return json.load(f)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to read syllabus: {e}")

@router.get("/")
def get_full_syllabus():
    """
    Exposes the complete syllabus tree to the frontend client.
    """
    return load_syllabus_data()

@router.get("/docs/{doc_name}")
def get_syllabus_document(doc_name: str):
    """
    Reads and returns the raw content of the requested curriculum markdown document.
    """
    # Prevent path traversal vulnerabilities
    safe_name = os.path.basename(doc_name)
    if not safe_name.endswith(".md"):
        safe_name = f"{safe_name}.md"
        
    doc_path = os.path.join(DOCS_DIR, safe_name)
    
    if not os.path.exists(doc_path):
        # Check alternative naming
        alt_name = safe_name.replace("Volume", "")
        doc_path_alt = os.path.join(DOCS_DIR, alt_name)
        if os.path.exists(doc_path_alt):
            doc_path = doc_path_alt
        else:
            raise HTTPException(status_code=404, detail=f"Curriculum volume doc {doc_name} not found")
            
    try:
        with open(doc_path, "r", encoding="utf-8") as f:
            content = f.read()
        return PlainTextResponse(content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to read document: {e}")

@router.get("/{node_id}")
def get_node_details(node_id: str):
    """
    Exposes specific module details (checked off progress, topics, practice).
    """
    syllabus = load_syllabus_data()
    if node_id not in syllabus:
        raise HTTPException(status_code=404, detail=f"Curriculum node {node_id} not found in database")
    return syllabus[node_id]

