// import { useEffect, useState } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [log, setLog] = useState<string[]>([]);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [status, setStatus] = useState<string>("대기 중");

  const startMeasurement = async () => {
    setStatus("권한 요청 중...");

    try {
      // iOS 13+ 권한 요청
      if (
        typeof DeviceMotionEvent !== "undefined" &&
        typeof (DeviceMotionEvent as any).requestPermission === "function"
      ) {
        const permission = await (DeviceMotionEvent as any).requestPermission();
        if (permission !== "granted") {
          setStatus("센서 권한이 거부되었습니다.");
          alert("센서 권한이 필요합니다.");
          return;
        }
        setStatus("권한 허용됨");
      }

      setIsMeasuring(true);
      setStatus("측정 중... 휴대폰을 움직여보세요!");

      let lastMagnitude = 0;
      let lastSent = 0;

      const THRESHOLD = 2.5;
      const MIN_INTERVAL = 1000;

      const handleDeviceMotion = (event: DeviceMotionEvent) => {
        if (!isMeasuring) return;

        const acceleration = event.accelerationIncludingGravity;
        const x = acceleration?.x ?? 0;
        const y = acceleration?.y ?? 0;
        const z = acceleration?.z ?? 0;
        const magnitude = Math.sqrt(x * x + y * y + z * z);
        const delta = Math.abs(magnitude - lastMagnitude);
        const now = Date.now();

        // 디버깅용 - 매번 현재 값 표시
        setStatus(`측정 중... 현재 움직임: ${delta.toFixed(2)}`);

        if (delta > THRESHOLD && now - lastSent > MIN_INTERVAL) {
          const time = new Date().toLocaleTimeString();
          setLog((prev) => [
            ...prev,
            `📍 ${time} 움직임 감지! Δ=${delta.toFixed(2)}`,
          ]);
          lastSent = now;

          // 추후: FastAPI 또는 Supabase로 전송 예정
        }

        lastMagnitude = magnitude;
      };

      window.addEventListener("devicemotion", handleDeviceMotion);

      // 테스트용 로그 추가
      setLog((prev) => [
        ...prev,
        `🚀 ${new Date().toLocaleTimeString()} 측정 시작됨`,
      ]);
    } catch (error) {
      setStatus("오류 발생: " + error);
      console.error("센서 시작 오류:", error);
    }
  };

  const stopMeasurement = () => {
    setIsMeasuring(false);
    setStatus("측정 중지됨");
    setLog((prev) => [
      ...prev,
      `⏹️ ${new Date().toLocaleTimeString()} 측정 중지됨`,
    ]);
  };

  return (
    <div className="app">
      <h1>Toss and Turn</h1>
      <h2>수면 중 뒤척임 감지기</h2>

      <div className="status">
        <p>
          <strong>상태:</strong> {status}
        </p>
      </div>

      <div className="controls">
        {!isMeasuring ? (
          <button onClick={startMeasurement} className="start-btn">
            📱 측정 시작
          </button>
        ) : (
          <button onClick={stopMeasurement} className="stop-btn">
            ⏹️ 측정 중지
          </button>
        )}
      </div>

      <div className="log">
        <h3>활동 로그 (최근 10개)</h3>
        {log.length === 0 ? (
          <p>아직 기록된 활동이 없습니다.</p>
        ) : (
          log.slice(-10).map((entry, i) => (
            <div key={i} className="log-entry">
              {entry}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
