// Vercel Edge Function으로 TMI 데이터 글로벌 캐싱
export default async function handler(request, response) {
  // CORS 헤더 설정
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    response.status(200).end();
    return;
  }

  if (request.method !== "GET") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    // 24시간 글로벌 캐싱 설정 (모든 사용자 공유)
    response.setHeader(
      "Cache-Control",
      "public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600"
    );

    // Supabase 환경변수 확인
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey =
      process.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase 환경변수가 설정되지 않음, fallback TMI 사용");
      return sendFallbackTMI(response);
    }

    // 동적 import로 Supabase 클라이언트 초기화 (Edge Function 호환)
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 오늘 날짜 구하기
    const today = new Date().toISOString().split("T")[0];
    console.log(`📅 TMI 요청 날짜: ${today}`);

    // TMI 데이터 조회
    const { data, error } = await supabase
      .from("tmi")
      .select("*")
      .eq("date", today)
      .single();

    if (error) {
      console.warn("Supabase 쿼리 오류:", error.message);
      return sendFallbackTMI(response);
    }

    if (data) {
      console.log("✅ Supabase TMI 데이터 조회 성공");
      response.status(200).json({
        success: true,
        data: data,
        cached: true,
        source: "supabase",
        timestamp: new Date().toISOString(),
      });
    } else {
      console.log("📝 TMI 데이터 없음, fallback 사용");
      return sendFallbackTMI(response);
    }
  } catch (error) {
    console.error("TMI API 오류:", error);
    return sendFallbackTMI(response);
  }
}

// Fallback TMI 응답 함수
function sendFallbackTMI(response) {
  const fallbackTMIs = [
    "오늘은 새로운 시작을 위한 완벽한 날입니다! ✨",
    "작은 변화가 큰 기쁨을 가져다 줄 것입니다 🌟",
    "당신의 미소가 누군가에게 희망이 될 수 있어요 😊",
    "오늘 하루도 당신답게 빛나세요! 🌈",
    "긍정적인 에너지로 가득한 하루 되세요 💫",
    "작은 친절이 세상을 바꿀 수 있어요 🤗",
    "오늘의 도전이 내일의 성장이 됩니다 🚀",
  ];

  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
  );
  const selectedTMI = fallbackTMIs[dayOfYear % fallbackTMIs.length];
  const todayString = today.toISOString().split("T")[0];

  response.status(200).json({
    success: true,
    data: {
      date: todayString,
      content: selectedTMI,
      is_fallback: true,
    },
    cached: true,
    source: "fallback",
    timestamp: today.toISOString(),
  });
}
