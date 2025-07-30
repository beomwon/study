from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext
import json
from app.api.services import dashboard as dashboard_service
from fastapi import Request

router = APIRouter()

@router.get("/dashboard")
async def get_dashboard_data(request: Request):
    user_id = request.state.user_id
    return dashboard_service.get_dashboard_data(user_id)