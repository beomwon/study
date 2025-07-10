# Portfolio Backend

FastAPI 기반 포트폴리오 백엔드 API

## 설치 및 실행

1. 가상환경 생성 및 활성화

```bash
python -m venv venv
venv\Scripts\activate  # Windows
```

2. 패키지 설치

```bash
pip install -r requirements.txt
```

3. 서버 실행

```bash
python main.py
```

또는

```bash
uvicorn main:app --reload
```

## API 엔드포인트

### 기본 정보

- `GET /` - API 기본 정보
- `GET /health` - 헬스 체크

### 프로젝트 관련

- `GET /api/projects/` - 모든 프로젝트 목록
- `GET /api/projects/{project_id}` - 특정 프로젝트 상세 정보
- `GET /api/projects/category/{tech}` - 기술스택별 프로젝트 필터링

### 개인 정보 관련

- `GET /api/info/profile` - 개인 프로필
- `GET /api/info/skills` - 기술 스택
- `GET /api/info/education` - 학력 정보
- `GET /api/info/experience` - 경력 정보
- `GET /api/info/contact` - 연락처 정보

## API 문서

서버 실행 후 `http://localhost:8000/docs`에서 Swagger UI를 통해 API 문서를 확인할 수 있습니다.
