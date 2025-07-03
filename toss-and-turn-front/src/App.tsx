import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [log, setLog] = useState<string[]>([]);
  const [isMeasuring, setIsMeasuring] = useState(false);

  const startMeasurement = async () => {
    setIsMeasuring(true);

    if (
      typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      const permission = await DeviceMotionEvent.requestPermission();
      if (permission !== "granted") {
        alert("센서 권한이 필요합니다.");
        return;
      }
    }

    let lastMagnitude = 0;
    let lastSent = 0;

    const THRESHOLD = 2.5;
    const MIN_INTERVAL = 1000;

    window.addEventListener("devicemotion", (event) => {
      if (!isMeasuring) return;

      const { x = 0, y = 0, z = 0 } = event.accelerationIncludingGravity ?? {};
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const delta = Math.abs(magnitude - lastMagnitude);
      const now = Date.now();

      if (delta > THRESHOLD && now - lastSent > MIN_INTERVAL) {
        const time = new Date().toLocaleTimeString();
        setLog((prev) => [...prev, `📍 ${time} Δ=${delta.toFixed(2)}`]);
        lastSent = now;

        // 추후: FastAPI 또는 Supabase로 전송 예정
      }

      lastMagnitude = magnitude;
    });
  };

  return (
    <div className="app">
      <h1>🌙 Toss and Turn</h1>
      <h2>수면 중 뒤척임 감지기</h2>
      {!isMeasuring ? (
        <button onClick={startMeasurement}>측정 시작</button>
      ) : (
        <p>측정 중... 움직이면 기록됩니다.</p>
      )}
      <div className="log">
        {log.slice(-10).map((entry, i) => (
          <div key={i}>{entry}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
