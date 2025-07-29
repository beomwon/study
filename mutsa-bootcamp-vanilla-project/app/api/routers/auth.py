from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext
import json
from app.api.services import auth as auth_service

router = APIRouter()

class SignUpRequest(BaseModel):
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class AuthCodeRequest(BaseModel):
    email: str

class UpdateNicknameRequest(BaseModel):
    email: str
    nickname: str

@router.post("/sign-up/update_user_nickname")
async def update_user_nickname(data: UpdateNicknameRequest):
    return auth_service.update_user_nickname(data.email, data.nickname)

@router.post("/sign-up/auth")
async def send_auth_code(data: AuthCodeRequest):
    return auth_service.send_auth_code(data.email)

@router.post("/sign-up")
async def sign_up(data: SignUpRequest):
    return auth_service.sign_up(data.email, data.password)

@router.post("/login")
async def login(data: LoginRequest):
    return auth_service.login(data)
