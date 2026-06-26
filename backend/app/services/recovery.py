from datetime import datetime, timedelta
from typing import Dict, Any

# Expected start dates for each week, assuming start date is 2026-06-26
START_DATE_STR = "2026-06-26"
GRADUATION_DATE_STR = "2027-05-31"

def get_expected_date_for_week(week_num: int) -> datetime:
    """
    Returns the expected start date for a given week number.
    Each week represents 7 calendar days.
    """
    start_date = datetime.strptime(START_DATE_STR, "%Y-%m-%d")
    # Buffer period takes 11 days (roughly 1.5 weeks)
    # Week 1 starts after the buffer (Day 11 is roughly 11 days after 2026-06-26)
    if week_num <= 2:
        # Buffer period weeks
        return start_date + timedelta(days=(week_num - 1) * 7)
    else:
        # Semester weeks start after the 11-day buffer
        return start_date + timedelta(days=11 + (week_num - 3) * 7)

def calculate_schedule_status(current_date_str: str, current_week: int) -> Dict[str, Any]:
    """
    Compares the current date with the expected start date of the current week.
    Calculates slippage in days, remaining buffer, and adapted schedule suggestion.
    """
    try:
        current_date = datetime.strptime(current_date_str, "%Y-%m-%d")
    except Exception:
        current_date = datetime.now()
        
    expected_date = get_expected_date_for_week(current_week)
    
    # Calculate difference
    delta = current_date - expected_date
    slippage_days = delta.days
    
    # Target Graduation Date Check
    grad_date = datetime.strptime(GRADUATION_DATE_STR, "%Y-%m-%d")
    days_left_to_grad = (grad_date - current_date).days
    
    # Standard buffer allocated is 11 days
    # Remaining buffer gets reduced by positive slippage
    remaining_buffer = max(0, 11 - max(0, slippage_days))
    
    status = "On Schedule"
    suggestion = "Continue your daily rhythm. Keep logging commits to maintain streak health."
    
    if slippage_days > 0:
        status = "Behind Schedule"
        if remaining_buffer > 0:
            suggestion = f"You have slipped by {slippage_days} days. Compressing remaining buffer period. Remaining buffer: {remaining_buffer} days."
        else:
            suggestion = f"CRITICAL: Out of buffer days! Remaining schedule must be compressed by {(slippage_days - 11)} days. Increase daily focused study from 3 to 4 hours."
    elif slippage_days < -3:
        status = "Ahead of Schedule"
        suggestion = "You are ahead of schedule. Keep this pace to secure early interview preparation cycles!"

    return {
        "status": status,
        "slippageDays": slippage_days,
        "remainingBuffer": remaining_buffer,
        "daysToGraduation": days_left_to_grad,
        "adaptedSuggestion": suggestion
    }
