from datetime import datetime
from typing import Dict, List, Any
from app.services import knowledge_engine

def get_daily_recommendation(
    completed_topics: List[str], 
    current_date_str: str, 
    confidence_levels: Dict[str, int], 
    is_maintenance: bool = False
) -> Dict[str, str]:
    """
    Analyzes the unified EngineeringState and the Knowledge Graph to determine:
    1. What is the recommended task ID for today?
    2. Why is this the highest priority? (Graph-based justification)
    3. What capability does it improve?
    4. What future milestone does it unlock?
    """
    try:
      current_date = datetime.strptime(current_date_str, "%Y-%m-%d")
      is_sunday = current_date.weekday() == 6  # 6 is Sunday in Python's datetime
    except Exception:
      is_sunday = False

    # Rule 1: Sunday Weekly Review Blocker
    if is_sunday:
        return {
            "taskId": "sunday-review",
            "justification": "It is Sunday. In alignment with EJP Law 5 (Consistency over Intensity) and the PERDS review dimension, this is your mandatory rest day. You must perform the 45-minute Weekly Review Protocol this evening to assess metrics, write your reflection log, and unlock the next week.",
            "capabilityImproved": "Aptitude and reflective planning (PERDS)",
            "milestoneUnlocked": "Next week's curriculum sprint"
        }

    # Rule 2: Maintenance Mode (Type C College Exam Freeze)
    if is_maintenance:
        low_skills = [skill for skill, conf in confidence_levels.items() if 0 < conf < 80]
        revision_target = low_skills[0] if low_skills else "dsa"
        
        return {
            "taskId": f"revision-{revision_target}",
            "justification": "Platform is shifted to Maintenance Mode (Type C Exam Freeze) due to academic exam overlaps. Primary concept learning is suspended. Priority is shifted to local revision drills of your weakest tech block and a 15-minute DSA review to maintain logic patterns.",
            "capabilityImproved": "Reinforcing weak skills (" + revision_target.upper() + ") and maintaining logic habits under load.",
            "milestoneUnlocked": "Resuming sprints with zero memory deficits."
        }

    # Traverse the Knowledge Graph to find the next unlockable topic
    graph_data = knowledge_engine.get_graph()
    nodes = graph_data.get("nodes", [])

    next_node = None
    for node in nodes:
        node_id = node["id"]
        if node_id not in completed_topics:
            # Check prerequisites
            prereqs = node.get("prerequisites", [])
            if all(p in completed_topics for p in prereqs):
                next_node = node
                break

    if next_node:
        topic_id = next_node["id"]
        topic = knowledge_engine.get_topic(topic_id)
        
        why = topic.get("why", "This is the logical next step in your curriculum.")
        title = topic.get("title", topic_id)
        unlocks = topic.get("unlocks", [])
        unlock_titles = []
        for u in unlocks:
            u_topic = knowledge_engine.get_topic(u)
            if u_topic:
                unlock_titles.append(u_topic.get("title"))
            else:
                unlock_titles.append(u)

        unlocks_str = ", ".join(unlock_titles) if unlock_titles else "the next phase"
        effort = topic.get("effort", "Variable effort")
        capability = topic.get("capability_gained", "General engineering capacity")

        justification = (
            f"Study **{title}** next because: {why} "
            f"Prerequisites are fully completed. "
            f"This topic unlocks {unlocks_str}. "
            f"Estimated effort: {effort}."
        )

        return {
            "taskId": topic_id,
            "justification": justification,
            "capabilityImproved": capability,
            "milestoneUnlocked": f"Unlocks: {unlocks_str}"
        }

    # Fallback: Curriculum Graduation
    return {
        "taskId": "graduation",
        "justification": "Congratulations! You have completed all daily missions and exit gate assessments. Your Engineering OS indicates 100% placement readiness. Proceed to interview funnels.",
        "capabilityImproved": "Overall portfolio quality and competitive interview preparation.",
        "milestoneUnlocked": "Placement hiring cycles and career compounding."
    }


