from fastapi import APIRouter, Request
from services.charcount import get_char_count

router = APIRouter()

@router.post("/charcount")
async def char_count(data: dict):
    text = data.get("text", "")
    return get_char_count(text)
