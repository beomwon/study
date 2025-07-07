// Supabase 설정
// 환경변수에서 값을 가져옵니다
const SUPABASE_CONFIG = {
  url:
    import.meta?.env?.VITE_SUPABASE_URL ||
    process.env?.VITE_SUPABASE_URL ||
    window?.ENV?.VITE_SUPABASE_URL ||
    "https://your-project-url.supabase.co", // 폴백 값
  anonKey:
    import.meta?.env?.VITE_SUPABASE_ANON_KEY ||
    process.env?.VITE_SUPABASE_ANON_KEY ||
    window?.ENV?.VITE_SUPABASE_ANON_KEY ||
    "your-anon-key", // 폴백 값
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
  });
}
