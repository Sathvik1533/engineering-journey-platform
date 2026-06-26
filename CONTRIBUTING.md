# EJP Engineering Operating System - CONTRIBUTING.md

This document guides developers on running tests, checking compilation builds, and modifying the codebase of the **Engineering Journey Platform (EJP)**.

---

## 💻 Local Workspace Guidelines

### 1. Setting Up the Backend (FastAPI)
- Locate the backend folder at `/Users/k.sathvik/.gemini/antigravity/scratch/backend`.
- Initialize a python virtual environment:
  ```bash
  python3 -m venv venv
  source venv/bin/activate
  pip install -r requirements.txt
  ```
- Start the development API server (defaulting to port 8000):
  ```bash
  uvicorn app.main:app --reload
  ```

### 2. Setting Up the Frontend (React + TS + Vite)
- Locate the frontend folder at `/Users/k.sathvik/.gemini/antigravity/scratch/frontend`.
- Install node dependencies and start the Vite dev server:
  ```bash
  npm install
  npm run dev
  ```

---

## 🧪 Verification Commands

Before committing code modifications, execute local tests and confirm bundler safety:

### Run Backend Engine Tests
Verify core capabilities, timeline slippage, and event mutators using python unittests:
```bash
cd backend
./venv/bin/python -m unittest tests/test_engines.py
```

### Validate Frontend Compilation Builds
Ensure type-safety and layout packaging runs cleanly before commits:
```bash
cd frontend
npm run build
```

---

## 🛡️ Coding Principles (S-Rules)

1. **Keep State Unified:** Never modify states inside components directly. All updates must be dispatched as event calls to `triggerEvent()` which POSTs to the backend `/api/state/event` bus.
2. **PostgreSQL Compatibility:** When updating database models in `state.py`, map variables using native SQLAlchemy 2.0 types and indexes. Never use SQLite-exclusive functions.
3. **No Hardcoded Curriculum:** Add syllabus content to [syllabus.json](file:///Users/k.sathvik/.gemini/antigravity/scratch/backend/app/data/syllabus.json) rather than frontend TypeScript.
