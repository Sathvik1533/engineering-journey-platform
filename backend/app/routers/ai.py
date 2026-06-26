import os
import json
import httpx
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

from app.database import get_db
from app.config import settings
from app.models.state import EngineeringState

router = APIRouter(prefix="/ai", tags=["AI"])

class ChatMessage(BaseModel):
    role: str  # user or assistant
    content: str

class ChatPayload(BaseModel):
    messages: List[ChatMessage]

def read_file_safe(filepath: str, default_content: str = "") -> str:
    if os.path.exists(filepath):
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                return f.read().strip()
        except Exception:
            return default_content
    return default_content

@router.post("/chat")
async def chat_endpoint(payload: ChatPayload, db: Session = Depends(get_db)):
    """
    Unified AI Chat Endpoint.
    
    * **Request**: List of conversation messages (history + new input).
    * **Response**: Markdown response and PROPOSED database actions.
    * **Refinement 4 Compliance**: AI never modifies persistent state directly. It outputs proposed actions,
      which must be validated and executed via the client calling the API's Event System.
    """
    
    # Gather database state context
    state = db.execute(select(EngineeringState)).scalars().first()
    state_ctx = "None"
    if state:
        state_ctx = (
            f"Current Date: {state.current_date}\n"
            f"Semester: {state.current_semester}\n"
            f"Active Week: {state.current_week}\n"
            f"Current Tech: {state.current_technology}\n"
            f"Current Topic: {state.current_topic}\n"
            f"Completed Topics: {', '.join(state.completed_topics)}\n"
            f"Confidence Levels: {json.dumps(state.confidence_levels)}\n"
            f"Recommended Task ID: {state.recommended_task_id}\n"
            f"Remaining Buffer Days: {state.remaining_buffer}\n"
            f"Slippage Days: {state.slippage_days}\n"
            f"Schedule Status: {state.schedule_status}\n"
            f"Daily Streak: {state.daily_streak}\n"
            f"Weekly Progress: {state.weekly_progress}%\n"
            f"Is Exam Freeze/Maintenance Active: {state.is_maintenance}\n"
        )

    roadmap_txt = read_file_safe("app/roadmap.txt", "No roadmap timeline configured.")
    custom_instructions = read_file_safe("app/ai_prompt.txt", "Be a helpful coding tutor.")

    system_prompt = f"""
{custom_instructions}

You are the Engineering OS AI Companion. You have access to the user's current live Engineering State.

---
MASTER ROADMAP:
{roadmap_txt}

---
CURRENT LIVE STATE:
{state_ctx}

---
CRITICAL RULES & RESPONSE FORMAT:
You MUST respond with a JSON object. Do not include markdown wraps (```json) in your raw response.
The JSON object MUST contain exactly two keys:
1. "response": (string) Your conversational text. Respond in Markdown format. Act as a personalized coding tutor.
2. "actions": (array of objects) Proposed actions to update progress. Supported shapes:
   - Toggle completed topic:
     {{ "type": "toggle_checklist", "taskId": "day-1", "checked": true|false }}
   - Pass assessment:
     {{ "type": "pass_assessment", "assessmentId": "week-2" }}
   - Set Date:
     {{ "type": "set_date", "date": "2026-07-06" }}
   - Trigger exam freeze:
     {{ "type": "trigger_freeze", "isFreeze": true|false }}

If no update is requested, return "actions": [].
"""

    if not settings.GROQ_API_KEY or settings.GROQ_API_KEY.strip() == "":
        return handle_mock_chat(payload.messages[-1].content, state)

    messages_payload = [{"role": "system", "content": system_prompt}]
    for msg in payload.messages:
        messages_payload.append({"role": msg.role, "content": msg.content})

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            res = await client.post(
                "https://api.groq.com/openapi/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {settings.GROQ_API_KEY.strip()}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "llama3-70b-8192",
                    "messages": messages_payload,
                    "response_format": {"type": "json_object"},
                    "temperature": 0.2
                }
            )
            
            if res.status_code != 200:
                return {
                    "response": f"⚠️ Groq API returned error status {res.status_code}. Verify your API Key.",
                    "actions": []
                }
                
            completion = res.json()
            raw_content = completion["choices"][0]["message"]["content"]
            parsed_res = json.loads(raw_content)
            
            return {
                "response": parsed_res.get("response", ""),
                "actions": parsed_res.get("actions", [])
            }
            
    except Exception as e:
        return {
            "response": f"⚠️ Failed to communicate with Groq: {str(e)}. Offline fallback active.",
            "actions": []
        }

def handle_mock_chat(user_msg: str, state: Optional[EngineeringState]) -> Dict[str, Any]:
    msg_lower = user_msg.lower()
    response = ""
    actions = []
    
    if "focus to" in msg_lower or "focus on" in msg_lower:
        parts = user_msg.split("to" if "to" in msg_lower else "on")
        target = parts[-1].strip().strip("'\"")
        response = f"I've proposed updating your active focus targets to **'{target}'**."
        # Note: We return this as a proposed toggle or state action
        actions.append({
            "type": "proposal",
            "message": f"Update focus to '{target}'"
        })
    elif "complete" in msg_lower or "check off" in msg_lower:
        # Match day number
        import re
        match = re.search(r"day\s*(\d+)", msg_lower)
        if match:
            day_num = match.group(1)
            actions.append({
                "type": "toggle_checklist",
                "taskId": f"day-{day_num}",
                "checked": True
            })
            response = f"Proposing to check off **'Day {day_num} Mission'** in your curriculum."
        else:
            response = "I couldn't identify the day number. Try saying 'complete day 1'."
    elif "freeze" in msg_lower:
        actions.append({
            "type": "trigger_freeze",
            "isFreeze": True
        })
        response = "Proposing to trigger an Exam Freeze."
    else:
        response = (
            "### Engineering OS AI Offline Companion 🤖\n\n"
            "Hey Sathwik! I am ready to be your personalized tutor, but the **`GROQ_API_KEY` is currently missing**.\n\n"
            "**In the meantime, I can propose offline actions! Try typing:**\n"
            "* *'complete day 1'*\n"
            "* *'freeze'* to simulate an exam freeze."
        )
        
    return {
        "response": response,
        "actions": actions
    }
