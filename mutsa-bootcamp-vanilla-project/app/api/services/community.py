from fastapi import HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext
from app.services.supabase import get_public_reading_logs
from datetime import datetime

# body{
#   “publicReviews”: {
#     “title”: string,
#     “imageUrl”: string,
#     “oneLineDescription”: string,
#     “nickname”: string,
#     “date”: string
#   }[]
# }

def get_community_data():
    community_data = get_public_reading_logs()
    publicReviews = []
    for log in community_data:
        log_date = datetime.fromisoformat(log["created_at"])
        publicReviews.append({
            "title": log["title"],
            "imageUrl": log["image_url"],
            "oneLineDescription": log["one_line_description"],
            "nickname": log["users"]["nickname"],
            "date": log_date.strftime("%Y-%m-%d")
        })
    return { "publicReviews": publicReviews }