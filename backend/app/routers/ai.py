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
from app.services import knowledge_engine

router = APIRouter(prefix="/ai", tags=["AI"])

class ChatMessage(BaseModel):
    role: str  # user or assistant
    content: str

class ChatPayload(BaseModel):
    messages: List[ChatMessage]

class DebugRequest(BaseModel):
    code: str
    language: str
    stdout: str
    stderr: str
    topicId: str

class DebugResponse(BaseModel):
    hint: str
    explanation: str
    suggested_fix: str

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
    topic_ctx = "No current topic details."
    
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
        # Pull topic data from knowledge engine
        topic_obj = knowledge_engine.get_topic(state.recommended_task_id)
        if topic_obj:
            topic_ctx = (
                f"Title: {topic_obj.get('title')}\n"
                f"Mission: {topic_obj.get('mission')}\n"
                f"Why This Matters: {topic_obj.get('why')}\n"
                f"Concepts: {', '.join(topic_obj.get('concepts', []))}\n"
                f"Subtopics: {', '.join(topic_obj.get('subtopics', []))}\n"
                f"Practice Tasks: {', '.join(topic_obj.get('practice', []))}\n"
                f"Mini Build: {topic_obj.get('mini_build')}\n"
                f"Assessment/Exit Criteria: {topic_obj.get('assessment')}\n"
            )

    custom_instructions = read_file_safe("app/ai_prompt.txt", "Be a helpful coding tutor.")

    system_prompt = f"""
{custom_instructions}

You are the Engineering OS AI Companion. You have access to the user's current live Engineering State and the details of their current topic.

---
CURRENT LIVE STATE:
{state_ctx}

---
CURRENT TOPIC METADATA:
{topic_ctx}

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
                "https://api.groq.com/openai/v1/chat/completions",
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

@router.post("/debug", response_model=DebugResponse)
async def debug_endpoint(payload: DebugRequest):
    """
    Code debugger endpoint. Evaluates Monaco editor submissions.
    """
    topic_obj = knowledge_engine.get_topic(payload.topicId)
    topic_info = f"Topic: {payload.topicId}"
    if topic_obj:
        topic_info += f"\nTitle: {topic_obj.get('title')}\nConcepts: {', '.join(topic_obj.get('concepts', []))}\nExit Criteria: {', '.join(topic_obj.get('exit_criteria', []))}"

    system_prompt = f"""
You are a senior engineering mentor code debugger. The user is writing code in the Monaco editor.
Analyze their code, execution output, and any error message.

---
TOPIC CONTEXT:
{topic_info}

---
CODE WRITTEN BY USER ({payload.language}):
```
{payload.code}
```

---
EXECUTION OUTPUT STDOUT:
{payload.stdout}

---
EXECUTION OUTPUT STDERR / ERRORS:
{payload.stderr}

---
INSTRUCTIONS:
You must respond with a JSON object containing exactly three keys:
1. "hint": (string) A concise, non-obvious hint to guide them. Do not give away the solution.
2. "explanation": (string) Explain why the code errored or what logic flaw exists in relation to the concepts.
3. "suggested_fix": (string) A constructive guideline on how they should modify their code structure.

Format the output strictly as a JSON object. Do not include markdown wraps (```json) in your raw response.
"""

    if not settings.GROQ_API_KEY or settings.GROQ_API_KEY.strip() == "":
        return DebugResponse(
            hint="Try checking your syntax or variables.",
            explanation="Groq API Key is not set, so mock debug response is active.",
            suggested_fix="Double check loops and function return types."
        )

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            res = await client.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {settings.GROQ_API_KEY.strip()}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "llama3-70b-8192",
                    "messages": [{"role": "system", "content": system_prompt}],
                    "response_format": {"type": "json_object"},
                    "temperature": 0.2
                }
            )
            
            if res.status_code != 200:
                raise HTTPException(status_code=500, detail="Failed to get debugging advice from AI helper.")
                
            completion = res.json()
            raw_content = completion["choices"][0]["message"]["content"]
            parsed_res = json.loads(raw_content)
            
            return DebugResponse(
                hint=parsed_res.get("hint", "Verify your variable declarations."),
                explanation=parsed_res.get("explanation", "Logic checks failed."),
                suggested_fix=parsed_res.get("suggested_fix", "Refactor the logic.")
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI connection error: {str(e)}")




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
