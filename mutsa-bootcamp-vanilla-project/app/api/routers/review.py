from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext
import json
from app.api.services import review as review_service
from fastapi import Request

router = APIRouter()

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

@router.get("/write/booklist")
async def get_book_list(request: Request):
    # user_id = request.state.user_id
    return review_service.get_book_list()

@router.get("/write/booklist/{isbn13}")
async def get_book_detail(request: Request):
    isbn13 = request.path_params.get("isbn13")
    return review_service.get_book_detail(isbn13)

@router.post("/reviews/write")
async def create_review(request: Request, review_data: ReviewData):
    user_id = request.state.user_id
    return review_service.create_review(user_id, review_data)

@router.get("/reviews")
async def get_reviews(request: Request):
    # Assuming there's a function to get reviews for a user
    return review_service.get_user_reviews(request.path_params.get("isbn13", None))

@router.get("/reviews/{isbn13}")
async def get_review_detail(request: Request):
    user_id = request.state.user_id
    # Assuming there's a function to get reviews for a user
    return review_service.get_user_review(user_id, request.path_params.get("isbn13", None))