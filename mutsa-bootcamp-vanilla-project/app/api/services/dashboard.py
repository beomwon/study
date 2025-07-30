from fastapi import HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext
from app.services.supabase import get_reading_logs
from datetime import datetime

def get_dashboard_data(user_id: str):
    logs = get_reading_logs(user_id)
    if not logs:
        return {"message": "No reading logs found."}
    
    current_year, current_month = datetime.now().year, datetime.now().month
    month_count, year_count = 0, 0
    total_reviews = []
    for log in logs:
        log_date = datetime.fromisoformat(log["created_at"])
        if log_date.year == current_year:
            year_count += 1
            if log_date.month == current_month:
                month_count += 1
        total_reviews.append({
            "title": log["title"],
            "oneLineDescription": log["one_line_description"],
            "date": log_date.strftime("%Y-%m-%d")
        })

    return {
        "monthBookmarkCount": month_count,
        "yearBookmarkCount": year_count,
        "totalReviews": total_reviews
    }