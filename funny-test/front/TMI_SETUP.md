# TMI 섹션 설정 가이드

## Supabase 설정

프론트엔드에서 TMI 데이터를 직접 가져오기 위해서는 Supabase 설정이 필요합니다.

### 1. config.js 파일 수정

`assets/js/config.js` 파일을 열고 다음 값들을 실제 Supabase 프로젝트 정보로 변경하세요:

```javascript
const SUPABASE_CONFIG = {
  url: "https://your-project-url.supabase.co", // 실제 Supabase URL
  anonKey: "your-anon-key", // 실제 anon key
};
```

### 2. Supabase 프로젝트에서 설정값 찾기

1. [Supabase Dashboard](https://app.supabase.com)에 로그인
2. 프로젝트 선택
3. 좌측 메뉴에서 "Settings" → "API" 클릭
4. "Project URL"과 "anon public" 키를 복사하여 config.js에 붙여넣기

### 3. TMI 테이블 구조

TMI 테이블은 다음과 같은 구조여야 합니다:

```sql
CREATE TABLE tmi (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Row Level Security (RLS) 설정

TMI 테이블에 대한 읽기 권한을 모든 사용자에게 부여해야 합니다:

```sql
-- TMI 테이블에 대한 SELECT 정책 생성
CREATE POLICY "Allow public read access" ON tmi
FOR SELECT USING (true);

-- RLS 활성화
ALTER TABLE tmi ENABLE ROW LEVEL SECURITY;
```

## 작동 방식

1. 페이지 로드 시 Supabase 클라이언트가 초기화됩니다
2. 오늘 날짜에 해당하는 TMI 데이터를 직접 조회합니다
3. 데이터가 있으면 TMI 섹션에 표시됩니다
4. 백엔드 서버 없이도 동작합니다

## 문제 해결

- **"설정을 확인해주세요" 메시지가 나타나는 경우**: config.js의 URL과 키를 확인해주세요
- **"TMI를 불러오는데 실패했습니다" 메시지가 나타나는 경우**:
  - 테이블명이 'tmi'인지 확인
  - RLS 정책이 올바르게 설정되었는지 확인
  - 오늘 날짜의 데이터가 존재하는지 확인

## TMI 데이터 삽입

백엔드의 `scripts/insert_tmi_data.py` 스크립트를 사용하여 TMI 데이터를 미리 삽입할 수 있습니다.
