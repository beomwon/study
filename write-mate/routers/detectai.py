from fastapi import APIRouter, Request
from services.detectai import detect_ai

router = APIRouter()

@router.post("/detectai")
async def detect_ai_route(data: dict):
    text = data.get("text", "")
    return detect_ai(text)
