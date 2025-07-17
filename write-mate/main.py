from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
import uvicorn

from routers import charcount, spellcheck, synonyms, length, improve, detectai

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# 기능별 라우터 등록
app.include_router(charcount.router, prefix="/api")
app.include_router(spellcheck.router, prefix="/api")
app.include_router(synonyms.router, prefix="/api")
app.include_router(length.router, prefix="/api")
app.include_router(improve.router, prefix="/api")
app.include_router(detectai.router, prefix="/api")


# 아래는 개발용 서버 실행 코드
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=4000, reload=True)