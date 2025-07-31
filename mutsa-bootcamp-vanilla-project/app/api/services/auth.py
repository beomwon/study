from fastapi import HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext
from app.services.supabase import get_user_by_email, create_user, supabase_update_user_nickname
from app.core.jwt import create_access_token
from datetime import datetime
from app.utils.auth_code import send_auth_code as send_auth_code_util

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class SignUpRequest(BaseModel):
    email: str
    password: str
    nickname: str

class LoginRequest(BaseModel):
    email: str
    password: str

def send_auth_code(recipient: str):
    if get_user_by_email(recipient):
        return {"success": False, "message": "이미 사용 중인 이메일이에요."}
    
    try:
        code = send_auth_code_util(recipient)
    except Exception as e:
        return {"success": False, "message": "인증번호 전송에 실패했어요.", "error": str(e)}
    
    return {"success": True, "code": code}

def sign_up(email: str, password: str):
    hashed_pw = pwd_context.hash(password)

    created_at = datetime.utcnow().isoformat()
    user = create_user(email, hashed_pw, "책갈피 유저", created_at)
    if not user:
        return {"success": False, "message": "회원가입에 실패했어요."}
    return {"success": True, "email": email}

def update_user_nickname(email: str, nickname: str):
    user = get_user_by_email(email)
    if not user:
        raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")
    
    user = supabase_update_user_nickname(email, nickname)
    if not user:
        return {"success": False, "message": "닉네임 업데이트에 실패했어요."}

    return {"success": True}

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
    return {"token": access_token, "token_type": "bearer", "nickname": user["nickname"]}
