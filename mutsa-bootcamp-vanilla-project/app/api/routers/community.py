from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext
import json
from app.api.services import community as community_service
from fastapi import Request

router = APIRouter()

@router.get("/community")
async def get_community_data(request: Request):
    # user_id = request.state.user_id
    return community_service.get_community_data()