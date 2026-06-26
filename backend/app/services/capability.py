from typing import Dict, List

def calculate_capabilities(completed_topics: List[str]) -> tuple[Dict[str, int], Dict[str, int]]:
    """
    Recalculates confidence levels (0-100) and capability scores (0-100)
    across all engineering domains based on the list of completed topics.
    
    Completed topics are formatted as: 'day-1', 'week-1', 'phase-0', etc.
    """
    # 1. Base Confidence Levels (Skills)
    confidence = {
      "python": 0,
      "sql": 0,
      "html_css": 0,
      "js_dom": 0,
      "react": 0,
      "typescript": 0,
      "fastapi": 0,
      "sqlalchemy": 0,
      "ai_engineering": 0,
      "system_design": 0,
      "dsa": 0,
      "professional_growth": 0
    }
    
    # Python Core (Phase 0, Days 1-5, Weeks 1-2)
    python_items = ["day-1", "day-2", "day-3", "day-4", "day-5", "week-1", "week-2"]
    completed_py = [x for x in python_items if x in completed_topics]
    confidence["python"] = int((len(completed_py) / len(python_items)) * 100)
    
    # SQL (Phase 1, Days 6-7, Weeks 3-4)
    sql_items = ["day-6", "day-7", "week-3", "week-4"]
    completed_sql = [x for x in sql_items if x in completed_topics]
    confidence["sql"] = int((len(completed_sql) / len(sql_items)) * 100) if sql_items else 0
    
    # Frontend (Phase 2, Days 8-9, Weeks 5-6)
    fe_items = ["day-8", "day-9", "week-5", "week-6"]
    completed_fe = [x for x in fe_items if x in completed_topics]
    confidence["html_css"] = int((len(completed_fe) / len(fe_items)) * 80) if "week-5" in completed_topics else 0
    confidence["js_dom"] = int((len(completed_fe) / len(fe_items)) * 100) if "week-6" in completed_topics else 0

    # React + TS (Phase 3 & 4, Weeks 7-10, Days 10-13)
    react_items = ["day-10", "day-11", "day-12", "day-13", "week-7", "week-8", "week-9", "week-10"]
    completed_react = [x for x in react_items if x in completed_topics]
    confidence["react"] = int((len(completed_react) / len(react_items)) * 100) if react_items else 0
    confidence["typescript"] = 90 if "week-8" in completed_topics else (50 if "day-11" in completed_topics else 0)

    # FastAPI Backend (Phase 5, Weeks 11-12, Days 14-15)
    api_items = ["day-14", "day-15", "week-11", "week-12"]
    completed_api = [x for x in api_items if x in completed_topics]
    confidence["fastapi"] = int((len(completed_api) / len(api_items)) * 100) if api_items else 0
    confidence["sqlalchemy"] = 85 if "week-12" in completed_topics else 0

    # AI & Integration (Phase 6, Weeks 13-15, Days 16-18)
    ai_items = ["day-16", "day-17", "day-18", "week-13", "week-14", "week-15"]
    completed_ai = [x for x in ai_items if x in completed_topics]
    confidence["ai_engineering"] = int((len(completed_ai) / len(ai_items)) * 100) if ai_items else 0

    # Placement (Phase 7, Weeks 16-18, Days 19-21)
    placement_items = ["day-19", "day-20", "day-21", "week-16", "week-17", "week-18"]
    completed_placement = [x for x in placement_items if x in completed_topics]
    confidence["system_design"] = 80 if "week-16" in completed_topics else 0
    confidence["dsa"] = 85 if "week-17" in completed_topics else 0

    # Career (Phase 8, Weeks 19-20, Days 22-23)
    career_items = ["day-22", "day-23", "week-19", "week-20"]
    completed_career = [x for x in career_items if x in completed_topics]
    confidence["professional_growth"] = int((len(completed_career) / len(career_items)) * 100) if career_items else 0

    # 2. Dynamic Capability Scores (Broad Domain Capabilities)
    capabilities = {
      "backend": int((confidence["python"] * 0.2) + (confidence["sql"] * 0.2) + (confidence["fastapi"] * 0.3) + (confidence["sqlalchemy"] * 0.3)),
      "frontend": int((confidence["html_css"] * 0.2) + (confidence["js_dom"] * 0.2) + (confidence["react"] * 0.4) + (confidence["typescript"] * 0.2)),
      "ai_agents": int((confidence["ai_engineering"] * 0.7) + (confidence["python"] * 0.3)),
      "interview_readiness": int((confidence["system_design"] * 0.4) + (confidence["dsa"] * 0.4) + (confidence["professional_growth"] * 0.2))
    }

    return confidence, capabilities
