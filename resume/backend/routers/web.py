from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates

router = APIRouter()
templates = Jinja2Templates(directory="front/templates")

@router.post("/test")
def test_page(request: Request, data: dict):
    return templates.TemplateResponse("test.html", {"request": request, "data": data})
