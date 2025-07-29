from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routers.auth import router as auth_router
from app.core.middleware import AuthAndIPMiddleware

app = FastAPI()

app.add_middleware(AuthAndIPMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)

@app.get("/health")
async def health_check():
    return { "status": "healthy" }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)