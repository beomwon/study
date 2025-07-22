# 베이스 이미지
FROM python:3.10-slim AS python-base

# Node.js 설치를 위한 베이스 이미지
FROM node:20-slim AS node-base

# 1. Node.js 의존성 설치 단계
FROM node-base AS node-deps
WORKDIR /app/front
COPY front/package.json ./
RUN npm install --production

# 2. Python 의존성 설치 단계
FROM python-base AS python-deps
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# 3. 최종 이미지
FROM python-base
WORKDIR /app

# Node.js 빌드 결과 복사 (필요시)
COPY --from=node-deps /app/front/node_modules ./front/node_modules
COPY --from=node-deps /app/front/package.json ./front/package.json

# 프로젝트 전체 복사
COPY . .

# Python 의존성 설치
RUN pip install --no-cache-dir -r requirements.txt

# 환경 변수
ENV PYTHONUNBUFFERED=1

# 포트 오픈
EXPOSE 8000

# 실행 명령 (프로덕션: uvicorn ASGI 서버)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
