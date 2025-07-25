from pydantic import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    ENV: str = "dev"  # 선택 사항

    # ✅ Supabase 관련
    SUPABASE_URL: str
    SUPABASE_KEY: str
    SUPABASE_SERVICE_ROLE_KEY: str

    # ✅ JWT 관련
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # ✅ 구글 로그인 관련
    GOOGLE_ID: str
    GOOGLE_PASSWORD: str

    # ✅ 허용된 IP (빈 문자열일 경우 빈 리스트)
    ALLOWED_IPS: List[str] = []

    class Config:
        env_file = ".env"

    @property
    def effective_allowed_ips(self) -> List[str]:
        if self.ENV == "dev":
            return []
        return self.ALLOWED_IPS

settings = Settings()