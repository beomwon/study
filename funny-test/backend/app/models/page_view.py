from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date

class PageView(BaseModel):
    id: Optional[str] = None
    page_name: str
    view_count: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
