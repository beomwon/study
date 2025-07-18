from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext

from app.api.services import auth as auth_service

router = APIRouter()


class SignUpRequest(BaseModel):
    email: str
    password: str
    nickname: str

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/sign-up")
def sign_up(data: SignUpRequest):
    return auth_service.sign_up(data)

@router.post("/login")
def login(data: LoginRequest):
    return auth_service.login(data)
