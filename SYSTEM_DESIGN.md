# EJP Engineering Operating System - SYSTEM_DESIGN.md

This document details the system design of the computational engines in the **Engineering Journey Platform (EJP) Version 1.0**.

---

## ⚙️ Core Engines Specifications

### 1. Engineering State Engine
- **Role:** Serves as the central database coordinator, maintaining a single global row representing Kotagiri Sathwik's active engineering profile.
- **Data Shape:** Maps dates, current semester names, completed task lists (`completed_topics`), confidence level keys, capability scores, next unlocked gates, and active recommendations.
- **Implementation:** Written using SQLAlchemy 2.0 native JSON mapping types in [state.py](file:///Users/k.sathvik/.gemini/antigravity/scratch/backend/app/models/state.py).

### 2. Execution Engine
- **Role:** Controls day-to-day checklist completions and assessment stopwatch timers.
- **Logic:** Checkbox selections send a `TOGGLE_TASK` event. Timed assessments are initialized using [TimerCard.tsx](file:///Users/k.sathvik/.gemini/antigravity/scratch/frontend/src/components/TimerCard.tsx) which updates state using `PASS_ASSESSMENT` upon successful verification.

### 3. Recommendation Engine
- **Role:** Computes the highest-priority target with granular reasons explaining *why chosen*, *capability improved*, and *milestone unlocked*.
- **Priority Hierarchy:**
  1. **Sunday Review Blocker:** Suspends all learning targets on Sundays, requiring the Weekly Review Protocol reflection.
  2. **Exam Freeze Mode:** If active, pauses lectures and serves revision tasks.
  3. **Exit Gate Assessment Blocker:** Blocks subsequent modules if previous phase exit gate assessments are incomplete.
  4. **Chronological Day Progression:** Recommends the next incomplete task index.

### 4. Capability Engine
- **Role:** Calculates confidence profiles and broad domain capability vectors.
- **Weights Matrix:**
  - **Backend Capability:** `Python (20%) + SQL (25%) + FastAPI (30%) + SQLAlchemy (25%)`
  - **Frontend Capability:** `HTML/CSS (20%) + JavaScript (30%) + React (30%) + TypeScript (20%)`
  - **AI Agents Capability:** `AI Engineering (100%)`
  - **Interview Readiness Capability:** `System Design (40%) + DSA (40%) + Professional Growth (20%)`
- **Logic:** Derived in [capability.py](file:///Users/k.sathvik/.gemini/antigravity/scratch/backend/app/services/capability.py) by multiplying task counts against weighted maps.

### 5. Recovery & Timeline Engine
- **Role:** Measures date slippage relative to graduation targets (May 2027) and adapts study guidelines.
- **Formula:**
  $$\text{Expected Date} = \text{Start Date} + 7 \times (\text{Week} - 1)$$
  $$\text{Slippage Days} = \text{Simulated Date} - \text{Expected Date}$$
  $$\text{Remaining Buffer} = \max(0, 11 - \max(0, \text{Slippage}))$$
- **Trigger:** When buffer reaches 0, recommendations alter user advisories, shifting suggested daily study from 3 to 4 hours.

---

## 🤖 Context-Aware AI Mentor Design

- **Prompt Hydration:** On every chat request, the API gathers current state context (completed items, active phase, simulated date, active priority) and maps it into system guidelines.
- **State Protection:** The AI writes a JSON payload containing proposed state updates. The React component intercepts the JSON, formatting actions as actionable UI alerts rather than executing mutations directly.
