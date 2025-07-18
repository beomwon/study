from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext
from app.services.supabase import get_user_by_email, create_user
from app.core.jwt import create_access_token
from config.settings import settings
from app.api.services import auth as auth_service
from datetime import datetime

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class SignUpRequest(BaseModel):
    email: str
    password: str
    nickname: str

class LoginRequest(BaseModel):
    email: str
    password: str

def sign_up(data: SignUpRequest):
    # 이메일 중복 체크
    if get_user_by_email(data.email):
        raise HTTPException(status_code=400, detail="이미 사용 중인 이메일입니다.")
    # 비밀번호 해싱
    hashed_pw = pwd_context.hash(data.password)
    # Supabase에 유저 저장
    created_at = datetime.utcnow().isoformat()
    user = create_user(data.email, hashed_pw, data.nickname, created_at)
    if not user:
        raise HTTPException(status_code=500, detail="회원가입에 실패했습니다.")
    return {"msg": "회원가입 성공", "email": user["email"], "nickname": user["nickname"]}

def login(data: LoginRequest):
    user = get_user_by_email(data.email)
    if not user:
        raise HTTPException(status_code=401, detail="존재하지 않는 이메일입니다.")
    hashed_pw = user.get("password")
    if not pwd_context.verify(data.password, hashed_pw):
        raise HTTPException(status_code=401, detail="비밀번호가 일치하지 않습니다.")
    # JWT 토큰 발급
    token_data = {"sub": str(user["id"]), "email": user["email"]}
    access_token = create_access_token(token_data)
    return {"access_token": access_token, "token_type": "bearer", "nickname": user["nickname"]}
