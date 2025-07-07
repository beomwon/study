// Supabase 설정
// 환경변수에서 값을 가져옵니다 (로컬 개발 + Vercel 배포 지원)
function getEnvValue(key) {
  // 1. Vercel 환경변수 주입 (배포)
  if (window?.ENV && window.ENV[key] && !window.ENV[key].startsWith("%")) {
    return window.ENV[key];
  }

  // 2. 로컬 개발용 - 개발자가 직접 설정할 수 있는 글로벌 변수
  if (window.DEV_ENV && window.DEV_ENV[key]) {
    return window.DEV_ENV[key];
  }

  return null;
}

const SUPABASE_CONFIG = {
  url:
    getEnvValue("VITE_SUPABASE_URL") ||
    "https://odbsearmmyphvcpaixgm.supabase.co",
  anonKey:
    getEnvValue("VITE_SUPABASE_ANON_KEY") ||
    getEnvValue("VITE_SUPABASE_KEY") ||
    "your-anon-key",
};

// TMI 테이블 설정
const TMI_TABLE_NAME = "tmi";

// 설정을 전역으로 내보내기
window.SUPABASE_CONFIG = SUPABASE_CONFIG;
window.TMI_TABLE_NAME = TMI_TABLE_NAME;

// 개발 환경에서 설정 확인 로그
if (console && typeof console.log === "function") {
  console.log("🔧 Supabase 설정:", {
    url: SUPABASE_CONFIG.url.includes("your-project-url")
      ? "❌ 설정 필요"
      : "✅ 설정됨",
    anonKey: SUPABASE_CONFIG.anonKey.includes("your-anon-key")
      ? "❌ 설정 필요"
      : "✅ 설정됨",
    tableName: TMI_TABLE_NAME,
    envCheck: {
      hasWindow: !!window,
      hasENV: !!window?.ENV,
      envValues: window?.ENV || "없음",
    },
  });
}
