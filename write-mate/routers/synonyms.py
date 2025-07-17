from fastapi import APIRouter, Request
from services.synonyms import suggest_synonyms

router = APIRouter()

@router.post("/synonyms")
async def synonyms(data: dict):
    text = data.get("text", "")
    return suggest_synonyms(text)
