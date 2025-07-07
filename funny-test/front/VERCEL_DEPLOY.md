# Vercel 배포 가이드

## 환경변수 설정

Vercel 대시보드에서 다음 환경변수를 설정해야 합니다:

### 1. 환경변수 키-값 쌍

| 키 이름                  | 설명                  | 예시                                      |
| ------------------------ | --------------------- | ----------------------------------------- |
| `VITE_SUPABASE_URL`      | Supabase 프로젝트 URL | `https://your-project-id.supabase.co`     |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon 키      | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

### 2. Vercel에서 환경변수 설정하는 방법

#### A. Vercel 대시보드에서 설정

1. [Vercel Dashboard](https://vercel.com/dashboard)에 로그인
2. 프로젝트 선택
3. "Settings" 탭 클릭
4. 좌측 메뉴에서 "Environment Variables" 클릭
5. 다음 환경변수들을 추가:
   - Name: `VITE_SUPABASE_URL`, Value: `실제 Supabase URL`
   - Name: `VITE_SUPABASE_ANON_KEY`, Value: `실제 Supabase anon key`
6. Environment는 "Production", "Preview", "Development" 모두 체크
7. "Save" 버튼 클릭

#### B. Vercel CLI로 설정

```bash
# 프로덕션 환경
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production

# 프리뷰 환경
vercel env add VITE_SUPABASE_URL preview
vercel env add VITE_SUPABASE_ANON_KEY preview

# 개발 환경
vercel env add VITE_SUPABASE_URL development
vercel env add VITE_SUPABASE_ANON_KEY development
```

### 3. 배포 후 확인

배포가 완료되면 브라우저 개발자 도구의 콘솔에서 다음과 같은 로그를 확인할 수 있습니다:

```
🔧 Supabase 설정: {
  url: "✅ 설정됨",
  anonKey: "✅ 설정됨",
  tableName: "tmi"
}
```

만약 "❌ 설정 필요"가 표시되면 환경변수가 제대로 설정되지 않은 것입니다.

### 4. Supabase 설정값 찾기

1. [Supabase Dashboard](https://app.supabase.com) 로그인
2. 프로젝트 선택
3. 좌측 메뉴 "Settings" → "API" 클릭
4. "Project URL"을 `VITE_SUPABASE_URL`에 사용
5. "anon public" 키를 `VITE_SUPABASE_ANON_KEY`에 사용

### 5. 문제 해결

#### 환경변수가 인식되지 않는 경우:

- Vercel에서 재배포 (Deployments 탭에서 "Redeploy" 클릭)
- 환경변수명에 오타가 없는지 확인
- 모든 환경(Production, Preview, Development)에 설정했는지 확인

#### TMI가 로드되지 않는 경우:

- Supabase 테이블 `tmi`가 존재하는지 확인
- Row Level Security 정책이 설정되어 있는지 확인
- 오늘 날짜의 데이터가 존재하는지 확인

## 로컬 개발 환경

로컬에서 개발할 때는 `.env` 파일을 만들어 사용할 수 있습니다:

```bash
# .env 파일
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**주의**: `.env` 파일은 절대 Git에 커밋하지 마세요!
