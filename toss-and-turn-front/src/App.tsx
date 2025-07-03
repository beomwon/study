// import { useEffect, useState } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [log, setLog] = useState<string[]>([]);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [status, setStatus] = useState<string>("대기 중");
  const [deviceInfo, setDeviceInfo] = useState<string>("");

  const startMeasurement = async () => {
    setStatus("권한 요청 중...");

    // 디바이스 정보 수집
    const userAgent = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    setDeviceInfo(
      `${isIOS ? "iOS" : "Other"} - ${isSafari ? "Safari" : "Other Browser"}`
    );

    setLog((prev) => [
      ...prev,
      `🔍 디바이스: ${isIOS ? "iOS" : "Other"}, 브라우저: ${
        isSafari ? "Safari" : "Other"
      }`,
    ]);

    try {
      // DeviceMotionEvent 지원 여부 확인
      if (typeof DeviceMotionEvent === "undefined") {
        setStatus("이 브라우저는 DeviceMotion을 지원하지 않습니다.");
        setLog((prev) => [...prev, `❌ DeviceMotionEvent가 정의되지 않음`]);
        return;
      }

      setLog((prev) => [...prev, `✅ DeviceMotionEvent 지원됨`]);

      // iOS 13+ 권한 요청
      if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
        setLog((prev) => [...prev, `🔐 iOS 권한 요청 필요`]);
        setStatus("iOS 권한 요청 중...");

        const permission = await (DeviceMotionEvent as any).requestPermission();
        setLog((prev) => [...prev, `🔐 권한 결과: ${permission}`]);

        if (permission !== "granted") {
          setStatus("센서 권한이 거부되었습니다.");
          alert(
            "센서 권한이 필요합니다. 설정에서 Safari > 모션 및 방향 접근을 허용해주세요."
          );
          return;
        }
        setStatus("권한 허용됨");
        setLog((prev) => [...prev, `✅ 권한 허용됨`]);
      } else {
        setLog((prev) => [
          ...prev,
          `ℹ️ 권한 요청 불필요 (iOS 13 미만 또는 다른 OS)`,
        ]);
      }

      setIsMeasuring(true);
      setStatus("측정 중... 휴대폰을 움직여보세요!");

      let lastMagnitude = 0;
      let lastSent = 0;
      let eventCount = 0;

      const THRESHOLD = 2.5;
      const MIN_INTERVAL = 1000;

      const handleDeviceMotion = (event: DeviceMotionEvent) => {
        eventCount++;

        if (!isMeasuring) return;

        const acceleration = event.accelerationIncludingGravity;

        // 센서 데이터가 null인지 확인
        if (!acceleration) {
          setStatus(`센서 데이터 없음 (이벤트 ${eventCount}번째)`);
          return;
        }

        const x = acceleration.x ?? 0;
        const y = acceleration.y ?? 0;
        const z = acceleration.z ?? 0;

        // 모든 값이 0인지 확인
        if (x === 0 && y === 0 && z === 0) {
          setStatus(`센서 값이 모두 0 (이벤트 ${eventCount}번째)`);
          return;
        }

        const magnitude = Math.sqrt(x * x + y * y + z * z);
        const delta = Math.abs(magnitude - lastMagnitude);
        const now = Date.now();

        // 디버깅용 - 매번 현재 값 표시 (더 자세히)
        setStatus(
          `측정 중... 움직임: ${delta.toFixed(2)}, XYZ: (${x.toFixed(
            1
          )}, ${y.toFixed(1)}, ${z.toFixed(1)})`
        );

        if (delta > THRESHOLD && now - lastSent > MIN_INTERVAL) {
          const time = new Date().toLocaleTimeString();
          setLog((prev) => [
            ...prev,
            `📍 ${time} 움직임 감지! Δ=${delta.toFixed(2)}, 좌표: (${x.toFixed(
              1
            )}, ${y.toFixed(1)}, ${z.toFixed(1)})`,
          ]);
          lastSent = now;

          // 추후: FastAPI 또는 Supabase로 전송 예정
        }

        lastMagnitude = magnitude;
      };

      window.addEventListener("devicemotion", handleDeviceMotion);
      setLog((prev) => [...prev, `🎯 DeviceMotion 이벤트 리스너 등록됨`]);

      // 테스트용 로그 추가
      setLog((prev) => [
        ...prev,
        `🚀 ${new Date().toLocaleTimeString()} 측정 시작됨`,
      ]);

      // 5초 후 센서 작동 여부 확인
      setTimeout(() => {
        if (eventCount === 0) {
          setStatus("⚠️ 센서 이벤트가 발생하지 않음");
          setLog((prev) => [
            ...prev,
            `⚠️ 5초 동안 센서 이벤트 없음 - 브라우저 설정 확인 필요`,
          ]);
        }
      }, 5000);
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
      <h1>🌙 Toss and Turn</h1>
      <h2>수면 중 뒤척임 감지기</h2>
      <p className="version">v1.5 - iOS 디버깅 강화</p>

      {deviceInfo && (
        <div className="device-info">
          <p>
            <strong>디바이스:</strong> {deviceInfo}
          </p>
        </div>
      )}

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
