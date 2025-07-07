// 로컬 개발용 간단한 API 서버
// 사용법: node dev-server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// .env 파일 로드
dotenv.config();

const app = express();
const PORT = 3001;

// CORS 설정
app.use(cors());
app.use(express.json());

// TMI API 엔드포인트
app.get("/api/tmi", async (req, res) => {
  try {
    console.log("🌐 로컬 API TMI 요청 받음");

    // 24시간 캐싱 헤더 설정
    res.setHeader("Cache-Control", "public, max-age=86400");

    // 환경변수에서 Supabase 설정 확인
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey =
      process.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_KEY;

    if (supabaseUrl && supabaseKey) {
      // Supabase 사용 시도
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(supabaseUrl, supabaseKey);

        const today = new Date().toISOString().split("T")[0];
        const { data, error } = await supabase
          .from("tmi")
          .select("*")
          .eq("date", today)
          .single();

        if (!error && data) {
          console.log("✅ 로컬 API: Supabase TMI 성공");
          return res.json({
            success: true,
            data: data,
            cached: true,
            source: "local-supabase",
            timestamp: new Date().toISOString(),
          });
        }
      } catch (supabaseError) {
        console.warn("⚠️ 로컬 API: Supabase 오류:", supabaseError.message);
      }
    }

    // Fallback TMI
    console.log("📝 로컬 API: Fallback TMI 사용");
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

    res.json({
      success: true,
      data: {
        date: today.toISOString().split("T")[0],
        content: selectedTMI,
        is_fallback: true,
      },
      cached: true,
      source: "local-fallback",
      timestamp: today.toISOString(),
    });
  } catch (error) {
    console.error("❌ 로컬 API 오류:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 로컬 API 서버가 http://localhost:${PORT} 에서 실행 중`);
  console.log(`📡 TMI API: http://localhost:${PORT}/api/tmi`);
});

export default app;
