import unittest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.base import Base
from app.models.state import EngineeringState
from app.services.capability import calculate_capabilities
from app.services.recommendation import get_daily_recommendation
from app.services.recovery import calculate_schedule_status
from app.services.event_system import process_event

# In-memory SQLite configuration for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

class TestCoreEngines(unittest.TestCase):
    def setUp(self):
        # Set up in-memory database and tables
        self.engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
        TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
        Base.metadata.create_all(bind=self.engine)
        self.db = TestingSessionLocal()

    def tearDown(self):
        self.db.close()
        Base.metadata.drop_all(bind=self.engine)

    def test_capability_calculations(self):
        # 1. Empty completions should return zero percentages
        conf, cap = calculate_capabilities([])
        self.assertEqual(conf["python"], 0)
        self.assertEqual(cap["backend"], 0)
        
        # 2. Check Python items completion
        conf, cap = calculate_capabilities(["day-1", "day-2", "day-3", "day-4", "day-5", "week-1", "week-2"])
        self.assertEqual(conf["python"], 100)
        self.assertEqual(cap["backend"], 20)  # Python (100 * 0.2) + other zeros = 20

    def test_recommendation_priorities(self):
        # 1. Check Sunday Review trigger (June 28, 2026 is Sunday)
        rec = get_daily_recommendation([], "2026-06-28", {})
        self.assertEqual(rec["taskId"], "sunday-review")
        self.assertIn("Weekly Review", rec["justification"])

        # 2. Check timed assessment blocker
        rec = get_daily_recommendation(["day-1", "day-2", "day-3", "day-4", "day-5"], "2026-06-26", {})
        self.assertEqual(rec["taskId"], "week-2-assessment")

        # 3. Check regular progression recommendation
        rec = get_daily_recommendation(["day-1"], "2026-06-26", {})
        self.assertEqual(rec["taskId"], "day-2")

    def test_recovery_date_variance(self):
        # 1. On schedule
        res = calculate_schedule_status("2026-06-26", 1)
        self.assertEqual(res["status"], "On Schedule")
        self.assertEqual(res["slippageDays"], 0)
        
        # 2. Behind schedule (Expected for Week 1 is 2026-06-26)
        res = calculate_schedule_status("2026-07-06", 1)
        self.assertEqual(res["status"], "Behind Schedule")
        self.assertEqual(res["slippageDays"], 10)
        self.assertEqual(res["remainingBuffer"], 1)  # 11 - 10 = 1

    def test_event_processing(self):
        # Initialize EngineeringState
        state = EngineeringState(
            current_date="2026-06-26",
            current_week=1,
            completed_topics=[],
            confidence_levels={},
            capability_scores={}
        )
        self.db.add(state)
        self.db.commit()
        self.db.refresh(state)

        # Trigger TOGGLE_TASK event
        updated = process_event(self.db, state, "TOGGLE_TASK", {"taskId": "day-1", "isChecked": True})
        self.assertIn("day-1", updated.completed_topics)
        self.assertEqual(updated.recommended_task_id, "day-2")
        
        # Trigger PASS_ASSESSMENT event
        # Complete all days 1-5 first
        process_event(self.db, state, "TOGGLE_TASK", {"taskId": "day-2", "isChecked": True})
        process_event(self.db, state, "TOGGLE_TASK", {"taskId": "day-3", "isChecked": True})
        process_event(self.db, state, "TOGGLE_TASK", {"taskId": "day-4", "isChecked": True})
        process_event(self.db, state, "TOGGLE_TASK", {"taskId": "day-5", "isChecked": True})
        
        updated = process_event(self.db, state, "PASS_ASSESSMENT", {"assessmentId": "week-2"})
        self.assertIn("week-2", updated.completed_topics)
        self.assertEqual(updated.current_phase, 1)
        self.assertEqual(updated.current_technology, "SQL / PostgreSQL")

if __name__ == "__main__":
    unittest.main()
