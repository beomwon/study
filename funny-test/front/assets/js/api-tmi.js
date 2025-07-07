// 글로벌 TMI 캐싱을 위한 대체 함수
// 이 함수로 기존 loadTodayTMI() 함수를 교체하면 됩니다.

// API 엔드포인트를 통한 TMI 로드 (글로벌 캐싱)
async function loadTodayTMIFromAPI() {
  const tmiContent = document.getElementById("tmiContent");
  const tmiDateDisplay = document.getElementById("tmiDateDisplay");

  if (!tmiContent) {
    console.warn("TMI 콘텐츠 엘리먼트를 찾을 수 없습니다.");
    return;
  }

  try {
    console.log("🌐 API에서 TMI 데이터 요청...");

    // API 엔드포인트로 요청 (Vercel이 24시간 캐싱)
    const response = await fetch("/api/tmi", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const result = await response.json();

    if (result.success && result.data) {
      console.log("✅ API TMI 데이터 로드 성공:", result);

      // TMI 표시
      displayTMI(result.data, tmiContent, tmiDateDisplay);

      // 로그에 캐싱 정보 표시
      if (result.cached) {
        console.log("📦 서버 캐시된 데이터 사용됨");
      }
    } else {
      throw new Error("API에서 유효한 TMI 데이터를 받지 못했습니다.");
    }
  } catch (error) {
    console.error("❌ API TMI 로딩 오류:", error);

    // Fallback TMI 표시
    showFallbackTMI();
  }
}

// 사용법:
// 기존 loadTodayTMI() 대신 loadTodayTMIFromAPI()를 호출하면 됩니다.
// 페이지 초기화 부분을 다음과 같이 수정:
/*
document.addEventListener("DOMContentLoaded", function () {
  cleanupOldTMICache();
  initSupabase();
  initCarousel();
  initHorizontalScroll();
  initAdBanner();
  initHoroscopeBanner();
  loadTodayTMIFromAPI(); // 이 부분 변경
});
*/
