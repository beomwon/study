# FastAPI Template Project

## 구조

- app/
  - main.py
  - api/
  - core/
  - models/
  - services/
  - utils/
- config/
  - settings.py
- .env
- requirements.txt

## 주요 기능

- JWT 인증
- CORS 설정
- Supabase 연동
- 환경변수 관리

---

### 1. requirements.txt

```
fastapi
uvicorn
python-dotenv
python-jose[cryptography]
supabase
httpx
passlib[bcrypt]
```

### 2. .env 예시

```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
SECRET_KEY=your_jwt_secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 3. config/settings.py

```python
from dotenv import load_dotenv
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(dotenv_path=BASE_DIR / ".env")

class Settings:
    SUPABASE_URL: str = os.getenv("SUPABASE_URL")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY")
    SECRET_KEY: str = os.getenv("SECRET_KEY")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

settings = Settings()
```

### 4. app/main.py

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import router as api_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
```

### 5. app/api/**init**.py

```python
from fastapi import APIRouter
from . import auth

router = APIRouter()
router.include_router(auth.router, prefix="/auth", tags=["auth"])
```

### 6. app/api/auth.py

```python
from fastapi import APIRouter, Depends, HTTPException
from jose import jwt
from datetime import datetime, timedelta
from config.settings import settings

router = APIRouter()

@router.post("/login")
def login():
    # 로그인 로직 구현
    return {"msg": "login"}
```

### 7. app/core/jwt.py

```python
from jose import jwt
from datetime import datetime, timedelta
from config.settings import settings

def create_access_token(data: dict, expires_delta: int = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_delta or settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt
```

### 8. app/services/supabase.py

```python
from supabase import create_client
from config.settings import settings

supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
```

---

이 구조로 폴더와 파일을 생성할까요?
