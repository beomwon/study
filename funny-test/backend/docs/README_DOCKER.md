# Funny Test Backend - Docker 배포

## 🚀 Docker로 실행하기

### 1️⃣ 환경변수 설정
```bash
# .env.example을 복사해서 .env 파일 생성
cp .env.example .env

# .env 파일에서 Supabase 정보 입력
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
```

### 2️⃣ Docker Compose로 실행 (권장)
```bash
# 백그라운드로 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 중지
docker-compose down
```

### 3️⃣ Docker 직접 실행
```bash
# 이미지 빌드
docker build -t funny-test-api .

# 컨테이너 실행
docker run -d \
  --name funny-test-api \
  -p 8000:8000 \
  --env-file .env \
  funny-test-api
```

## 📋 API 엔드포인트
- **GET** `/` - API 정보
- **GET** `/health` - 헬스체크
- **GET** `/api/v1/page-views` - 모든 페이지 조회수
- **POST** `/api/v1/page-view/{page_name}` - 페이지 조회수 증가
- **GET** `/api/v1/tmi` - 오늘의 TMI

## 🔧 개발환경에서 실행
```bash
# 의존성 설치
pip install -r requirements.txt

# 개발 서버 실행
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## 📦 프로덕션 배포
1. `.env` 파일에 프로덕션 환경변수 설정
2. `docker-compose up -d` 실행
3. 리버스 프록시(nginx) 설정으로 도메인 연결

## 🐛 문제 해결
```bash
# 컨테이너 로그 확인
docker-compose logs api

# 컨테이너 내부 접속
docker-compose exec api bash

# 전체 재시작
docker-compose down && docker-compose up -d
```
