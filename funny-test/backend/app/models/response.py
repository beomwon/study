from pydantic import BaseModel
from typing import Optional

class APIResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None
