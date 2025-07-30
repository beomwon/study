from fastapi import HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext
from app.services.supabase import create_review as supabase_create_review
from app.services.supabase import get_user_reviews as supabase_get_user_reviews
from app.services.supabase import get_user_review as supabase_get_user_review
from datetime import datetime
from app.services.aladin import get_book_info, get_bestseller_book_list

class ReviewData(BaseModel):
    title: str
    imageUrl: str
    oneLineDescription: str
    detailDescription: str
    rate: float
    currentPage: int
    totalPage: int
    date: str
    public: bool
    isbn13: str

def get_book_list():
    book_list = get_bestseller_book_list()
    return {"books": book_list}

def get_book_detail(isbn13: str):
    book_info = get_book_info(isbn13)
    if not book_info:
        raise HTTPException(status_code=404, detail="Book not found.")
    
    return book_info

def create_review(user_id: str, review_data: ReviewData):
    # Assuming review_data is a Pydantic model with the necessary fields
    review = {
        "user_id": user_id,
        "title": review_data.title,
        "image_url": review_data.imageUrl,
        "one_line_description": review_data.oneLineDescription,
        "detail_description": review_data.detailDescription,
        "rate": review_data.rate,
        "current_page": review_data.currentPage,
        "total_page": review_data.totalPage,
        "date": datetime.strptime(review_data.date, "%Y-%m-%d").isoformat(),
        "public": review_data.public,
        "isbn13": review_data.isbn13,
        "created_at": datetime.utcnow().isoformat(),
    }

    result = supabase_create_review(review)
    return {"success": result}

def get_user_reviews(user_id: str):
    # This function should retrieve reviews for the given user_id
    # Assuming there's a function in supabase to get user reviews
    reviews = supabase_get_user_reviews(user_id)
    if not reviews:
        return {"message": "No reviews found for this user."}
    
    total_reviews = []
    for review in reviews:
        total_reviews.append({
            "title": review["title"],
            "imageUrl": review["image_url"],
            "isbn13": review["isbn13"]
        })

    return {"totalReviews": total_reviews}

# body{
#   “title”: string,
#   “imageUrl”: string,
#   “rate”: number,
#   “currentPage”: number,
#   “totalPage”: number
#   “oneLineDescription”: string,
#   “detailDescription”: string
# }

def get_user_review(user_id: str, isbn13: str):
    # This function should retrieve reviews for the given user_id
    # Assuming there's a function in supabase to get user reviews
    detail_review = supabase_get_user_review(user_id, isbn13)
    if not detail_review:
        raise HTTPException(status_code=404, detail="Review not found.")
    
    return {
        "title": detail_review["title"],
        "imageUrl": detail_review["image_url"],
        "oneLineDescription": detail_review["one_line_description"],
        "detailDescription": detail_review["detail_description"],
        "rate": detail_review["rate"],
        "currentPage": detail_review["current_page"],
        "totalPage": detail_review["total_page"]
    }

