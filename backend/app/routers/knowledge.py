"""
Knowledge Router — REST API for the Knowledge Engine.

Endpoints:
  GET /api/knowledge/graph        → Dynamic graph (nodes + edges) for RoadmapVisualizer
  GET /api/knowledge/topics       → All topic objects (keyed by id)
  GET /api/knowledge/topics/{id}  → Single topic object with full educational content
"""

from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from app.services import knowledge_engine

router = APIRouter(prefix="/knowledge", tags=["Knowledge"])


@router.get("/graph")
def get_graph() -> Dict[str, Any]:
    """
    Returns the dynamically-generated roadmap graph.
    
    Replaces the static `roadmapGraph.ts` import in the frontend.
    The graph is generated from the Knowledge Engine's topic dependency data.
    
    Response shape:
      { nodes: [GraphNode], edges: [GraphEdge], total_topics: int }
    """
    return knowledge_engine.get_graph()


@router.get("/topics")
def get_all_topics() -> Dict[str, Any]:
    """
    Returns all topic objects keyed by topic ID.
    
    Used by:
      - Recommendation Engine to access full topic metadata
      - AI Mentor to build context for the current topic
      - Frontend for bulk preloading
    """
    return knowledge_engine.get_all_topics()


@router.get("/topics/{topic_id}")
def get_topic(topic_id: str) -> Dict[str, Any]:
    """
    Returns a single, complete TopicObject for the given topic ID.
    
    Used by EngineeringWorkspace when a graph node is selected.
    Contains the full educational content: mission, why, concepts,
    practice, mini_build, assessment, exit_criteria, resources,
    interview_questions, reflection_prompts, and code_template.
    """
    topic = knowledge_engine.get_topic(topic_id)
    if not topic:
        raise HTTPException(
            status_code=404,
            detail=f"Topic '{topic_id}' not found. Known IDs: {list(knowledge_engine.get_all_topics().keys())[:10]}"
        )
    return topic


@router.get("/topics/{topic_id}/prerequisites-status")
def get_prerequisites_status(topic_id: str, completed: str = "") -> Dict[str, Any]:
    """
    Returns whether the prerequisites for a topic are met.
    
    Query param `completed` is a comma-separated list of completed topic IDs.
    Example: /api/knowledge/topics/week-3/prerequisites-status?completed=phase-0,week-1,week-2
    """
    topic = knowledge_engine.get_topic(topic_id)
    if not topic:
        raise HTTPException(status_code=404, detail=f"Topic '{topic_id}' not found.")
    
    completed_list = [t.strip() for t in completed.split(",") if t.strip()]
    prereqs = topic.get("prerequisites", [])
    met = [p for p in prereqs if p in completed_list]
    missing = [p for p in prereqs if p not in completed_list]
    
    return {
        "topic_id": topic_id,
        "all_met": len(missing) == 0,
        "prerequisites": prereqs,
        "met": met,
        "missing": missing,
    }
