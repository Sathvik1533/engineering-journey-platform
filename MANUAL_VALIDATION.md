# EJP Engineering Operating System - MANUAL_VALIDATION.md

This document serves as the complete **Manual Validation Guide** for the **Engineering Journey Platform (EJP) Version 1.0**. Follow these steps to verify every feature of the Engineering Operating System from a daily user's perspective.

---

## 📋 Manual Test Procedures

### 1. Initial State Database Seeding
- **Feature Name:** Database persistence & seeding
- **Test Objective:** Verify that an empty database triggers default values and initial seeding on first launch.
- **Exact User Actions:**
  1. Delete the local sqlite database file if it exists: `rm backend/engineering_os.db`.
  2. Launch the backend FastAPI server: `uvicorn app.main:app --reload`.
  3. Load the frontend workspace page in your browser.
- **Expected UI Behavior:** Shows the initial dark loading spinner, then opens the dashboard showing Phase 0 as *Active* and Day 1 as *Recommended*.
- **Expected Backend Behavior:** Creates `engineering_os.db`, tables are generated via SQLAlchemy, and a default state row is inserted.
- **Expected Engineering State Updates:** `completed_topics` is initialized as empty `[]`, and `current_phase` is set to `0`.
- **Expected Recommendation Changes:** Recommends `day-1`.
- **Expected Timeline Changes:** Current date defaults to `"2026-06-26"`, timeline status is *"On Schedule"*.
- **Possible Failure Cases:** Database file locks, SQL connection timeouts, or missing tables due to SQLAlchemy mapping mismatch.

---

### 2. Roadmap Node Status Render
- **Feature Name:** SVG Roadmap graph rendering
- **Test Objective:** Verify that node borders and connecting lines reflect database progress.
- **Exact User Actions:**
  1. Click the **Interactive Roadmap** tab in the sidebar navigation.
  2. Inspect the *Phase 0: Python Core* node, the *Week 1* node, and the *SQL* node.
- **Expected UI Behavior:**
  - *Phase 0* node glows purple with a play icon.
  - *Week 1* node is styled with an active purple border.
  - Subsequent week nodes are greyed out with dashed borders (Locked cursor).
- **Expected Backend Behavior:** None (handled locally via state cache).
- **Possible Failure Cases:** SVG canvas bounds overflow, incorrect bezier curves offsets, or rendering locked nodes as clickable.

---

### 3. Detailed Syllabus Navigation
- **Feature Name:** Topic drawer & 10-Element journey tabs
- **Test Objective:** Verify that clicking an active node displays all 10 EJP spec elements.
- **Exact User Actions:**
  1. Open the **Interactive Roadmap** tab.
  2. Click the *Phase 0* or *Week 1* node.
  3. Click between the *Overview*, *10-Element Journey*, and *Daily Tasks* tabs in the drawer header.
- **Expected UI Behavior:** The drawer slides out from the right edge with a blurred backdrop. Tabs render:
  - *Overview:* Objectives, technology stack, and milestones.
  - *Journey:* Why this exists, subtopics, practice tasks list, mini-build deliverables, capabilities, connections, and unlocks.
  - *Tasks:* List of checklist day items with checkboxes.
- **Expected Backend Behavior:** `GET /api/syllabus/{node_id}` fetches the schema description.
- **Possible Failure Cases:** Drawer slides off-screen, scroll overflow blocks checklist checkboxes, or missing fallbacks for missing fields in `syllabus.json`.

---

### 4. Progress Checklists Completion
- **Feature Name:** Progress tracking (TOGGLE_TASK)
- **Test Objective:** Verify that checking off a day task updates capability scores and recommendations.
- **Exact User Actions:**
  1. Open the drawer for *Week 1*.
  2. Click the checkbox next to *"Day 1: Variables, Types & Flow Control"*.
- **Expected UI Behavior:** Checkbox fills green with a checkmark, text is struck through, and dashboard percentages rise.
- **Expected Backend Behavior:** `POST /api/state/event` dispatches `TOGGLE_TASK` event.
- **Expected Engineering State Updates:** `"day-1"` added to the `completed_topics` array.
- **Expected Recommendation Changes:** Recommends `"day-2"`.
- **Expected Timeline Changes:** No date shift, but overall syllabus completion increases.
- **Possible Failure Cases:** Event submission returns HTTP 400 due to malformed JSON, or UI doesn't refresh automatically because of state cache staleness.

---

### 5. Exam Freeze Mode Toggle
- **Feature Name:** Dynamic academic calendar (TRIGGER_FREEZE)
- **Test Objective:** Verify that triggering exam freeze mode shifts focus to revision drills.
- **Exact User Actions:**
  1. Navigate to **Mission Control** (Dashboard).
  2. Click the **Activate Freeze** button in the Type C Exam Freeze card.
- **Expected UI Behavior:** The card border turns amber and reads *"Active (Click to Resume)"*.
- **Expected Backend Behavior:** `POST /api/state/event` dispatches `TRIGGER_FREEZE` with `{ isFreeze: true }`.
- **Expected Recommendation Changes:** Recommendation switches to revision drills (`revision-python` or similar target) and a 15-minute DSA practice.
- **Possible Failure Cases:** Recommendation engine ignores freeze toggle or continues suggesting new day lectures.

---

### 6. Simulated Date Slippage & Recovery
- **Feature Name:** Recovery & Timeline Engine (SET_DATE)
- **Test Objective:** Verify that date shifts adapt the schedule advice and consume buffer.
- **Exact User Actions:**
  1. Navigate to **Mission Control** (Dashboard).
  2. Click the simulated calendar date selector and select `"2026-07-06"` (10 days past start date).
- **Expected UI Behavior:** Timeline status turns red displaying *"Behind Schedule"*, and the advice callout shifts to schedule compression protocols.
- **Expected Backend Behavior:** `POST /api/state/event` dispatches `SET_DATE` with `{ date: "2026-07-06" }`.
- **Expected Engineering State Updates:** `current_date` saved as `"2026-07-06"`.
- **Expected Timeline Changes:** Buffer period drops to `1 day` (11 - 10 = 1).
- **Possible Failure Cases:** Date parsing error or timezone calculations offset dates incorrectly.

---

### 7. AI Mentor Action Approvals
- **Feature Name:** Validation-only AI Mentor interactions
- **Test Objective:** Verify that AI action proposals require explicit user approval.
- **Exact User Actions:**
  1. Click **AI Mentor** in the header.
  2. Type *"complete day 1"* in the input box and send.
  3. Inspect the response message and click the **Approve & Execute** button.
- **Expected UI Behavior:** Response bubble appears showing the AI's proposal, hosting an action box. Clicking `Approve & Execute` disables the button and updates the state.
- **Expected Backend Behavior:** `/api/ai/chat` returns proposed action json. Approving dispatches event to `/api/state/event`.
- **Expected Engineering State Updates:** `"day-1"` is checked off in the database.
- **Possible Failure Cases:** AI response returns invalid action JSON payloads, or the button execution fails.

---

### 8. Timed Exit Assessments Unlock
- **Feature Name:** TimerCard & Exit Gate Unlock (PASS_ASSESSMENT)
- **Test Objective:** Verify that passing exit assessments shifts technology mode and unlocks downstream weeks.
- **Exact User Actions:**
  1. Toggle all days 1-5 as completed.
  2. Click *Week 2* node to open drawer.
  3. Under the assessment section, click **Start Timer** (starts 45-minute countdown).
  4. Click **Declare Success (Exit Met)**.
- **Expected UI Behavior:** Timer card changes to a green *"Exit Gate Mastered"* badge. Roadmap *Phase 1: SQL* node glows purple (unlocked). *Phase 0* changes to *Done* (green check).
- **Expected Backend Behavior:** `POST /api/state/event` dispatches `PASS_ASSESSMENT` with `{ assessmentId: "week-2" }`.
- **Expected Engineering State Updates:** `current_phase` changes to `1`, `current_technology` updates to `"SQL / PostgreSQL"`.
- **Expected Recommendation Changes:** Recommends `"day-6"`.
- **Possible Failure Cases:** Timer doesn't stop, or unlock engine fails to increment current phase index.
