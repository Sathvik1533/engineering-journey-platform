# EJP Engineering Operating System - DATA_MODEL.md

This document details the database schema and JSON configurations implemented in **EJP Version 1.0**.

---

## 🗄️ Database Table - `engineering_state`

The table holds a single row representing the active state. All fields map directly between local SQLite and production PostgreSQL.

| Column | SQLAlchemy Type | Postgres Equivalent | Default / Description |
| :--- | :--- | :--- | :--- |
| **id** | `Integer` | `SERIAL PRIMARY KEY` | Auto-incrementing identifier (index=True) |
| **current_date** | `String` | `VARCHAR` | `"2026-06-26"` |
| **current_semester**| `String` | `VARCHAR` | `"Semester 3-1"` |
| **current_week** | `Integer` | `INTEGER` | `1` |
| **current_phase** | `Integer` | `INTEGER` | `0` |
| **current_technology**| `String` | `VARCHAR` | `"Python Core"` |
| **current_topic** | `String` | `VARCHAR` | `"Syntax & Loops"` |
| **current_project** | `String` | `VARCHAR` | `"CLI Calculator"` |
| **completed_topics**| `JSON` | `JSONB` | `[]` (List of completed task/assessment keys) |
| **pending_assessments**| `JSON` | `JSONB` | `["week-2", "week-4", "week-6", "week-10"]` |
| **active_milestones**| `JSON` | `JSONB` | `["Syntax mastery", "OOP structure"]` |
| **confidence_levels**| `JSON` | `JSONB` | `{ python: 0, sql: 0, react: 0, ... }` |
| **capability_scores**| `JSON` | `JSONB` | `{ backend: 0, frontend: 0, ... }` |
| **next_unlock** | `String` | `VARCHAR` | `"week-1"` |
| **recommended_task_id**| `String` | `VARCHAR` | `"day-1"` |
| **recommendation_justification**| `String`| `TEXT` | JSON-serialized recommendation reason object |

---

## 📜 Dynamic JSON Schema - `syllabus.json`

The backend syllabus configuration at [syllabus.json](file:///Users/k.sathvik/.gemini/antigravity/scratch/backend/app/data/syllabus.json) is structured as an object map where keys are roadmap node IDs (e.g. `phase-0`, `week-1`):

```json
{
  "week-1": {
    "id": "week-1",
    "title": "Week 1: Python Syntax & Controls",
    "phaseNum": 0,
    "objective": "Rebuild core coding speed and syntax fluency.",
    "technology": "Python",
    "aiStage": "Stage 1 — Zero AI",
    "milestones": ["Write 20+ basic scripts"],
    "capabilitiesUnlocked": ["Syntax fluency", "Basic algorithm writing"],
    "exitCriteria": [
      "Implement variables, logical branches, and loops from memory"
    ],
    "dayMissions": [
      {
        "dayNum": 3,
        "title": "Functions & Scopes",
        "mission": "Define modular functions and local scopes.",
        "practice": ["Recursive factorial tracker", "Anagram solver"],
        "miniBuild": "CLI Library catalog search tool",
        "exitCriteria": "Write recursive functions under 10 minutes."
      }
    ],
    "timedAssessment": {
      "title": "Phase 0 Exit Gate Assessment",
      "durationMinutes": 45,
      "prompt": "Write a complete CLI Inventory and Order management system in Python."
    }
  }
}
```
