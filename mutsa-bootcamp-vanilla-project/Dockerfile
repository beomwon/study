# Python 베이스 이미지 사용
FROM python:3.10-slim

# 작업 디렉토리 생성 및 이동
WORKDIR /app

# requirements 복사 및 설치
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# 소스 코드 복사
COPY . .

# 환경변수 설정 (필요시)
ENV PYTHONUNBUFFERED=1

# uvicorn으로 FastAPI 실행
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
