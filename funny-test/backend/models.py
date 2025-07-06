from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date

# 페이지 조회수 모델
class PageView(BaseModel):
    id: Optional[str] = None
    page_name: str
    view_count: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

# TMI 모델
class TMI(BaseModel):
    id: Optional[str] = None
    date: date
    content: str
    created_at: Optional[datetime] = None

# API 응답 모델
class APIResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None
