from pydantic import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    ENV: str = "dev"
    ALLOWED_IPS: List[str] = []

    class Config:
        env_file = ".env"

    @property
    def effective_allowed_ips(self) -> List[str]:
        # 개발 환경이면 모두 허용
        if self.ENV == "dev":
            return []  # 빈 리스트면 모두 허용
        return self.ALLOWED_IPS

settings = Settings()
