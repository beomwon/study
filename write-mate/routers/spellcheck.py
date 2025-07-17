from fastapi import APIRouter, Request
from services.spellcheck import check_spelling

router = APIRouter()

@router.post("/spellcheck")
async def spell_check(data: dict):
    text = data.get("text", "")
    return await check_spelling(text)
