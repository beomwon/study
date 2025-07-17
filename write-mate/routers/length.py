from fastapi import APIRouter, Request
from services.length import analyze_length

router = APIRouter()

@router.post("/length")
async def length(data: dict):
    text = data.get("text", "")
    return analyze_length(text)
