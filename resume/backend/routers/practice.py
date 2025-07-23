from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import os

import backend.services.practice as practice_service

router = APIRouter()
templates = Jinja2Templates(directory="front/templates")

@router.get("/file-upload", response_class=HTMLResponse)
def practice_page(request: Request):
    return templates.TemplateResponse("practice/file-upload.html", {"request": request})

@router.get("/question", response_class=HTMLResponse)
def practice_page(request: Request):
    return templates.TemplateResponse("practice/question.html", {"request": request})

@router.post("/send-file")
async def make_question_and_analysis(
    resume_pdf: UploadFile = File(...),
    company_pdf: UploadFile = File(None)
):
    return await practice_service.make_question_and_analysis(resume_pdf, company_pdf)