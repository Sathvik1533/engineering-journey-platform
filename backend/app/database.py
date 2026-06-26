import sys
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.config import settings

DATABASE_URL = settings.DATABASE_URL

# SQLAlchemy 2.0 requires "postgresql://" instead of "postgres://"
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = None
is_fallback = False

# Fallback setup:
# If DATABASE_URL specifies postgresql but the connection or library fails,
# fall back to local SQLite.
if DATABASE_URL.startswith("postgresql"):
    try:
        # Check if the driver is installed and try to connect with a short timeout
        import psycopg2
        
        temp_engine = create_engine(
            DATABASE_URL,
            pool_pre_ping=True,  # checks connection health before executing queries
        )
        
        # Try a quick test connection
        with temp_engine.connect() as conn:
            pass
            
        engine = temp_engine
        print("Database connection: PostgreSQL connection established successfully.")
    except Exception as e:
        print(
            f"WARNING: Failed to connect to PostgreSQL ({e}).\n"
            "Falling back to local SQLite database: sqlite:///./engineering_os.db",
            file=sys.stderr
        )
        DATABASE_URL = "sqlite:///./engineering_os.db"
        is_fallback = True

if engine is None:
    # SQLite connection setup.
    # check_same_thread=False is required for SQLite in multithreaded applications (like FastAPI)
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
    )
    print(f"Database connection: Local SQLite initialized ({DATABASE_URL}).")

# sessionmaker creates Session classes which handle transactions and queries
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    """
    FastAPI Dependency to yield a database session context per request.
    Using a generator ensures the session is closed automatically when the request completes.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
