from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
import uvicorn

from backend.routers import practice

# cors설정으로 interview페이지는 코드 입력 후에만 접근 가능

app = FastAPI()
app.mount("/front/static", StaticFiles(directory="front/static"), name="static")
templates = Jinja2Templates(directory="front/templates")

# 기능별 라우터 등록
app.include_router(practice.router, prefix="/practice")

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/current", response_class=HTMLResponse)
async def current(request: Request):
    return templates.TemplateResponse("practice/result.html", {"request": request})

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# 개발용 서버 실행 코드
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)