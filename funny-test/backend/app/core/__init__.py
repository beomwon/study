"""
Core 모듈 - 설정 및 기본 구성요소
"""

from .config import settings
from .database import db

__all__ = ["settings", "db"]
