from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse

router = APIRouter()
templates = Jinja2Templates(directory="front/templates")

@router.get("/file-upload", response_class=HTMLResponse)
def practice_page(request: Request):
    return templates.TemplateResponse("practice/file-upload.html", {"request": request})
