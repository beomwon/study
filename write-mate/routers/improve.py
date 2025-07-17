from fastapi import APIRouter, Request
from services.improve import improve_style

router = APIRouter()

@router.post("/improve")
async def improve(data: dict):
    text = data.get("text", "")
    return improve_style(text)
