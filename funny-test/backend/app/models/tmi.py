from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date

class TMI(BaseModel):
    id: Optional[str] = None
    date: date
    content: str
    created_at: Optional[datetime] = None
