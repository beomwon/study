# FastAPI + Supabase Backend

## 설정 방법

### 1. 의존성 설치

```bash
pip install -r requirements.txt
```

### 2. 환경 변수 설정

`.env` 파일에서 다음 값들을 설정하세요:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
```

Supabase 프로젝트에서 이 값들을 얻는 방법:

1. [Supabase Dashboard](https://app.supabase.com) 로그인
2. 프로젝트 선택
3. Settings > API에서 URL과 anon public key 복사

### 3. 데이터베이스 설정

Supabase SQL Editor에서 `database_schema.sql` 파일의 내용을 실행하여 테이블을 생성하세요.

### 4. 서버 실행

```bash
python main.py
```

또는

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API 엔드포인트

### 기본

- `GET /` - API 정보
- `GET /health` - 헬스 체크
- `GET /docs` - Swagger UI 문서

### 사용자 관리

- `POST /api/v1/users/` - 사용자 생성
- `GET /api/v1/users/{user_id}` - 사용자 조회
- `GET /api/v1/users/` - 사용자 목록 조회
- `PUT /api/v1/users/{user_id}` - 사용자 수정
- `DELETE /api/v1/users/{user_id}` - 사용자 삭제

### 별자리 운세

- `GET /api/v1/horoscope/` - 별자리 운세 조회
- `GET /api/v1/horoscope/ranking` - 별자리 랭킹 조회
- `POST /api/v1/horoscope/save-result` - 테스트 결과 저장

## 프로젝트 구조

```
backend/
├── main.py              # FastAPI 메인 애플리케이션
├── config.py            # 설정 파일
├── database.py          # Supabase 데이터베이스 연결
├── models.py            # Pydantic 모델
├── requirements.txt     # Python 의존성
├── .env                 # 환경 변수 (gitignore에 추가 필요)
├── database_schema.sql  # 데이터베이스 스키마
├── README.md           # 이 파일
└── routes/
    ├── __init__.py
    ├── users.py         # 사용자 관련 라우트
    └── horoscope.py     # 별자리 운세 관련 라우트
```

## 개발 팁

1. **API 문서**: 서버 실행 후 `http://localhost:8000/docs`에서 자동 생성된 API 문서를 확인할 수 있습니다.

2. **CORS 설정**: `config.py`의 `ALLOWED_ORIGINS`에 프론트엔드 URL을 추가하세요.

3. **데이터베이스 마이그레이션**: 스키마 변경 시 Supabase Dashboard의 SQL Editor에서 직접 실행하세요.

4. **로그**: 개발 중에는 `DEBUG=True`로 설정하여 상세한 오류 정보를 확인할 수 있습니다.
