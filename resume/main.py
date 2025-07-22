from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
import uvicorn

from backend.routers import practice

app = FastAPI()
app.mount("/front/static", StaticFiles(directory="front/static"), name="static")
templates = Jinja2Templates(directory="front/templates")

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# 기능별 라우터 등록
app.include_router(practice.router, prefix="/practice")


# 아래는 개발용 서버 실행 코드
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)