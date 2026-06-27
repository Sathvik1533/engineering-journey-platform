from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.database import engine, SessionLocal
from app.models.base import Base
from app.routers import mission, phase, risk, ai, state, syllabus, debug, knowledge, execute
from app.services import knowledge_engine

# Lifespan context manager controls application startup and shutdown events
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create all tables on startup if they don't exist yet.
    # This acts as a safety fallback if the developer hasn't run Alembic migrations.
    Base.metadata.create_all(bind=engine)
    
    # Initialize the Knowledge Engine
    # Path is relative to project root where docs/ is located
    knowledge_engine.initialize(docs_path="../docs")
    
    # Seed database with initial default data if it's empty
    seed_initial_data()
    
    yield
    # Shutdown operations (if any) go here

app = FastAPI(
    title="Engineering OS API",
    description="A student-focused FastAPI + SQLAlchemy 2.0 learning backend supporting the Engineering OS v4.0 dashboard.",
    version="4.0.0",
    lifespan=lifespan
)

# Enable Cross-Origin Resource Sharing (CORS) so your local HTML dashboard file 
# can make requests to this backend server from different origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permits requests from any origin (e.g. local browser file:// URI)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Register endpoints from routers
app.include_router(mission.router)
app.include_router(phase.router)
app.include_router(risk.router)
app.include_router(ai.router)
app.include_router(state.router)
app.include_router(syllabus.router)
app.include_router(debug.router)
app.include_router(knowledge.router)
app.include_router(execute.router)

@app.get("/")
def root():
    """
    Root status endpoint.
    
    * **Request**: None.
    * **Response**: JSON status message confirming the server is live.
    * **Database Interaction**: None.
    * **Why this approach**: Standard health check route verifying that the API is online.
    """
    return {
        "status": "online",
        "app": "Engineering OS API",
        "version": "4.0.0",
        "docs_url": "/docs"
    }

def seed_initial_data():
    """
    Seeds default planner records on startup if the database tables are empty.
    """
    db = SessionLocal()
    try:
        from app.models.mission import Mission
        from app.models.phase import Phase
        from app.models.risk import Risk
        from sqlalchemy import select, func

        # Check mission counts using standard count select
        mission_count = db.scalar(select(func.count()).select_from(Mission))
        if mission_count == 0:
            print("DB Seed: Seeding default dashboard data...")

            # 1. Default Mission
            default_mission = Mission(
                title="Phase 0 — Python Core Completion",
                subtitle="Pre-Semester Sprint · 24 Jun – 05 Jul 2026 · 10 days · Zero slack",
                this_week="Functions, data structures, OOP",
                today_focus="Build a multi-class script from scratch",
                exit_gate="Multi-class script <45 min, no AI",
                ai_stage="Stage 1 — Zero AI (new concept)",
                is_completed=False
            )
            db.add(default_mission)

            # 2. Curriculum Phases
            default_phases = [
                Phase(
                    phase_num=0,
                    title="Python Core & Fundamentals",
                    description="Pre-semester preparation focusing on pure syntax and logic.",
                    status="Active",
                    weeks=[
                        {"week_num": "Week 1", "title": "Syntax & Functions", "checklist": ["Modular functions", "Control flow loops", "Variable scope"]},
                        {"week_num": "Week 2", "title": "Data Structures & OOP", "checklist": ["Lists, Dicts, Sets", "Multi-class architecture", "Exit gate benchmark"]}
                    ]
                ),
                Phase(
                    phase_num=1,
                    title="SQL Strengthening",
                    description="Relational database design, indexes, and aggregation querying.",
                    status="Starting",
                    weeks=[
                        {"week_num": "Week 1-2", "title": "Queries & Joins", "checklist": ["ERDs and normalization", "Multi-table Joins", "Subqueries"]},
                        {"week_num": "Week 3-4", "title": "Window Functions", "checklist": ["Rank/Partition functions", "Index query plans", "ACID transactions"]}
                    ]
                ),
                Phase(
                    phase_num=2,
                    title="Frontend Layouts & Logic",
                    description="HTML5, responsive CSS grids, and modern async JS.",
                    status="Locked",
                    weeks=[
                        {"week_num": "Week 1-2", "title": "HTML5 & CSS3 Grids", "checklist": ["Semantic tags", "Grid & Flexbox", "CSS custom variables"]},
                        {"week_num": "Week 3-4", "title": "JavaScript DOM", "checklist": ["ES6+ syntax elements", "Fetch API calls", "Event listeners loop"]}
                    ]
                )
            ]
            db.add_all(default_phases)

            # 3. Risks
            default_risks = [
                Risk(
                    description="Timeline slippage due to exams",
                    impact="High",
                    probability="Medium",
                    mitigation="Execute standard Type C Full Freeze, carrying no roadmap clocks forward."
                ),
                Risk(
                    description="Over-reliance on AI helper code generation",
                    impact="High",
                    probability="High",
                    mitigation="Enforce strict Stage 1 Zero AI restrictions on all new programming concepts."
                )
            ]
            db.add_all(default_risks)

            db.commit()
            print("DB Seed: Seeding complete.")
    except Exception as e:
        print(f"DB Seed Error: Could not seed default data ({e})")
        db.rollback()
    finally:
        db.close()
