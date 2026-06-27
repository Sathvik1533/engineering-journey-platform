import sys
import subprocess
import tempfile
import os
import sqlite3
from typing import Dict, Any, Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/execute", tags=["Execution"])

class ExecutionRequest(BaseModel):
    language: str
    code: str
    context: Optional[str] = None  # Optional setup or test code

class ExecutionResponse(BaseModel):
    stdout: str
    stderr: str
    passed: bool
    message: str

def run_python_code(code: str) -> tuple[str, str, bool]:
    # We write the code to a temporary file and run it via subprocess
    with tempfile.NamedTemporaryFile(suffix=".py", delete=False) as tmp:
        tmp.write(code.encode("utf-8"))
        tmp_path = tmp.name

    try:
        # Run with a 5-second timeout and capture output
        res = subprocess.run(
            [sys.executable, tmp_path],
            capture_output=True,
            text=True,
            timeout=5.0
        )
        passed = (res.returncode == 0)
        return res.stdout, res.stderr, passed
    except subprocess.TimeoutExpired:
        return "", "Timeout Error: Code execution exceeded 5.0 seconds.", False
    except Exception as e:
        return "", f"System Error: {str(e)}", False
    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)

def run_javascript_code(code: str) -> tuple[str, str, bool]:
    with tempfile.NamedTemporaryFile(suffix=".js", delete=False) as tmp:
        tmp.write(code.encode("utf-8"))
        tmp_path = tmp.name

    try:
        # Run with node
        res = subprocess.run(
            ["node", tmp_path],
            capture_output=True,
            text=True,
            timeout=5.0
        )
        passed = (res.returncode == 0)
        return res.stdout, res.stderr, passed
    except subprocess.TimeoutExpired:
        return "", "Timeout Error: Code execution exceeded 5.0 seconds.", False
    except FileNotFoundError:
        return "", "Environment Error: Node.js is not installed on this server.", False
    except Exception as e:
        return "", f"System Error: {str(e)}", False
    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)

def run_sql_code(code: str) -> tuple[str, str, bool]:
    # We execute SQL statements in a transient in-memory SQLite database
    conn = sqlite3.connect(":memory:")
    cursor = conn.cursor()
    stdout_lines = []
    stderr = ""
    passed = True

    try:
        # Split statements by semicolon
        statements = [s.strip() for s in code.split(";") if s.strip()]
        for stmt in statements:
            cursor.execute(stmt)
            # If it's a SELECT query, print the rows
            if stmt.upper().startswith("SELECT"):
                cols = [desc[0] for desc in cursor.description]
                rows = cursor.fetchall()
                stdout_lines.append(f"Query: {stmt}")
                stdout_lines.append(" | ".join(cols))
                stdout_lines.append("-" * (len(" | ".join(cols))))
                for row in rows:
                    stdout_lines.append(" | ".join(str(val) for val in row))
                stdout_lines.append("")
            else:
                conn.commit()
                stdout_lines.append(f"Executed: {stmt} (Rows affected: {cursor.rowcount})")
        
        stdout = "\n".join(stdout_lines)
    except Exception as e:
        stdout = "\n".join(stdout_lines)
        stderr = f"SQL Error: {str(e)}"
        passed = False
    finally:
        conn.close()

    return stdout, stderr, passed

@router.post("", response_model=ExecutionResponse)
def execute_code(req: ExecutionRequest):
    lang = req.language.lower()
    if lang == "python":
        stdout, stderr, passed = run_python_code(req.code)
    elif lang in ["javascript", "typescript"]:
        stdout, stderr, passed = run_javascript_code(req.code)
    elif lang == "sql":
        stdout, stderr, passed = run_sql_code(req.code)
    else:
        raise HTTPException(status_code=400, detail=f"Unsupported language: {req.language}")

    message = "Code ran successfully." if passed else "Code run failed."
    if stderr:
        message = "Errors detected during execution."

    return ExecutionResponse(
        stdout=stdout,
        stderr=stderr,
        passed=passed,
        message=message
    )
