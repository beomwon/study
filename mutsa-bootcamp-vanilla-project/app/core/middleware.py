from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from jose import jwt, JWTError
from config.settings import settings
import time




def is_allowed_ip(client_ip: str) -> bool:
    allowed_ips = settings.ALLOWED_IPS
    # dev 환경(빈 리스트)이면 모두 허용
    if not allowed_ips:
        return True
    return client_ip in allowed_ips

def get_token_from_header(auth_header: str) -> str:
    if not auth_header or not auth_header.startswith("Bearer "):
        return None
    return auth_header.split(" ", 1)[1]

def verify_and_refresh_token(token: str):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email = payload.get("email")
        exp = payload.get("exp")
        now = int(time.time())
        if exp is None or now > exp:
            return None, None, "만료"
        # 만료 5분(300초) 이내면 새 토큰 발급
        if exp - now < 300:
            from app.core.jwt import create_access_token
            new_token = create_access_token({"sub": payload.get("sub"), "email": email})
            return payload, new_token, None
        if not email:
            return None, None, "이메일 없음"
        return payload, None, None
    except JWTError:
        return None, None, "유효하지 않음"

class AuthAndIPMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        client_ip = request.client.host
        if not is_allowed_ip(client_ip):
            return JSONResponse(status_code=403, content={"detail": "허용되지 않은 IP입니다."})

        # 인증 없이 통과시킬 경로 (startswith로 체크)
        open_paths = ["/login", "/sign-up"]
        if any(request.url.path.startswith(path) for path in open_paths) or \
           request.url.path.startswith("/docs") or request.url.path.startswith("/openapi"):
            return await call_next(request)

        auth_header = request.headers.get("Authorization")
        token = get_token_from_header(auth_header)
        if not token:
            return JSONResponse(status_code=401, content={"detail": "엑세스 토큰이 필요합니다."})

        payload, refresh_token, error = verify_and_refresh_token(token)
        if error == "만료":
            return JSONResponse(status_code=401, content={"detail": "토큰이 만료되었습니다."})
        if error == "유효하지 않음":
            return JSONResponse(status_code=401, content={"detail": "유효하지 않은 토큰입니다."})
        if error == "이메일 없음":
            raise HTTPException(status_code=401, detail="토큰에 이메일 정보가 없습니다.")

        request.state.user_email = payload.get("email")
        response = await call_next(request)
        if refresh_token:
            response.headers["X-Refresh-Token"] = refresh_token
        return response
