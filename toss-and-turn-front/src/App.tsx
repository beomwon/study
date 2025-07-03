// import { useEffect, useState } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [log, setLog] = useState<string[]>([]);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [status, setStatus] = useState<string>("대기 중");
  const [deviceInfo, setDeviceInfo] = useState<string>("");
  const [sensorData, setSensorData] = useState<{
    eventCount: number;
    x: number;
    y: number;
    z: number;
    magnitude: number;
    delta: number;
    hasAccelWithGravity: boolean;
    hasAccel: boolean;
    hasRotation: boolean;
  } | null>(null);

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

      // 초기 센서 데이터 영역 표시
      setSensorData({
        eventCount: 0,
        x: 0, y: 0, z: 0,
        magnitude: 0, delta: 0,
        hasAccelWithGravity: false,
        hasAccel: false,
        hasRotation: false
      });

      let lastMagnitude = 0;
      let lastSent = 0;
      let eventCount = 0;

      const MIN_INTERVAL = 1000;

      const handleDeviceMotion = (event: DeviceMotionEvent) => {
        eventCount++;

        if (!isMeasuring) return;

        const acceleration = event.accelerationIncludingGravity;
        const accel = event.acceleration;
        const rotationRate = event.rotationRate;

        // 모든 센서 데이터 확인
        const hasAccelWithGravity = !!(
          acceleration &&
          (acceleration.x !== null ||
            acceleration.y !== null ||
            acceleration.z !== null)
        );
        const hasAccel = !!(
          accel &&
          (accel.x !== null || accel.y !== null || accel.z !== null)
        );
        const hasRotation = !!(
          rotationRate &&
          (rotationRate.alpha !== null ||
            rotationRate.beta !== null ||
            rotationRate.gamma !== null)
        );

        // 센서 데이터가 null인지 확인
        if (!acceleration) {
          setStatus(`센서 데이터 없음 (이벤트 ${eventCount}번째)`);
          setSensorData({
            eventCount,
            x: 0,
            y: 0,
            z: 0,
            magnitude: 0,
            delta: 0,
            hasAccelWithGravity: false,
            hasAccel,
            hasRotation,
          });
          return;
        }

        const x = acceleration.x ?? 0;
        const y = acceleration.y ?? 0;
        const z = acceleration.z ?? 0;

        // 모든 값이 0인지 확인
        if (x === 0 && y === 0 && z === 0) {
          setStatus(`센서 값이 모두 0 (이벤트 ${eventCount}번째)`);
          setSensorData({
            eventCount,
            x,
            y,
            z,
            magnitude: 0,
            delta: 0,
            hasAccelWithGravity,
            hasAccel,
            hasRotation,
          });
          return;
        }

        const magnitude = Math.sqrt(x * x + y * y + z * z);
        const delta = Math.abs(magnitude - lastMagnitude);
        const now = Date.now();

        // 실시간 센서 데이터 업데이트
        setSensorData({
          eventCount,
          x,
          y,
          z,
          magnitude,
          delta,
          hasAccelWithGravity,
          hasAccel,
          hasRotation,
        });

        // 상태 메시지 단순화
        setStatus(`측정 중... 휴대폰을 움직여보세요!`);

        // 임계값을 낮춰서 더 민감하게 감지
        const LOWER_THRESHOLD = 0.5;

        if (delta > LOWER_THRESHOLD && now - lastSent > MIN_INTERVAL) {
          const time = new Date().toLocaleTimeString();
          setLog((prev) => [
            ...prev,
            `📍 ${time} 움직임 감지! Δ=${delta.toFixed(2)}`,
          ]);
          lastSent = now;
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
            `⚠️ 5초 동안 센서 이벤트 없음 - 다음을 확인해주세요:`,
            `1. Safari 설정 > 개인정보 보호 및 보안 > 모션 및 방향 접근`,
            `2. 설정 > Safari > 고급 > 웹사이트 데이터에서 권한 확인`,
            `3. 페이지 새로고침 후 다시 시도`,
          ]);
        } else {
          setLog((prev) => [
            ...prev,
            `✅ 5초간 ${eventCount}개 센서 이벤트 수신됨`,
          ]);
        }
      }, 5000);

      // 추가: iOS에서 화면을 깨우기 위한 더미 이벤트
      if (isIOS) {
        // 화면 깨우기
        window.addEventListener("touchstart", () => {}, { passive: true });

        // DeviceOrientationEvent도 시도
        if (typeof DeviceOrientationEvent !== "undefined") {
          const orientationHandler = (event: DeviceOrientationEvent) => {
            if (eventCount <= 2) {
              setLog((prev) => [
                ...prev,
                `🧭 방향 센서: α=${event.alpha?.toFixed(
                  1
                )}, β=${event.beta?.toFixed(1)}, γ=${event.gamma?.toFixed(1)}`,
              ]);
            }
          };
          window.addEventListener("deviceorientation", orientationHandler);
          setLog((prev) => [...prev, `🧭 DeviceOrientation 이벤트도 등록됨`]);
        }
      }
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
    // 센서 데이터는 유지하지 않고 초기화
    // setSensorData(null);
  };

  return (
    <div className="app">
      <h1>🌙 Toss and Turn</h1>
      <h2>수면 중 뒤척임 감지기</h2>
      <p className="version">v1.6 - 실시간 센서 데이터 표시</p>

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

      {sensorData && (
        <div className="sensor-data" style={{
          background: '#f8fafc',
          border: '2px solid #10b981',
          borderRadius: '8px',
          padding: '1rem',
          margin: '1rem 0',
          textAlign: 'left'
        }}>
          <h3 style={{
            marginTop: 0,
            textAlign: 'center',
            color: '#059669',
            fontSize: '1.1rem'
          }}>📊 실시간 센서 데이터</h3>
          
          <p style={{fontSize: '0.8rem', color: '#666', textAlign: 'center'}}>
            sensorData 상태: {sensorData ? '✅ 존재함' : '❌ null'}
          </p>
          
          <div className="sensor-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.5rem',
            margin: '1rem 0'
          }}>
            <div className="sensor-item" style={{
              background: 'white',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              fontFamily: 'monospace',
              fontSize: '0.9rem'
            }}>
              <strong>이벤트 수:</strong> {sensorData.eventCount}
            </div>
            <div className="sensor-item" style={{
              background: 'white',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              fontFamily: 'monospace',
              fontSize: '0.9rem'
            }}>
              <strong>X축:</strong> {sensorData.x.toFixed(3)}
            </div>
            <div className="sensor-item" style={{
              background: 'white',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              fontFamily: 'monospace',
              fontSize: '0.9rem'
            }}>
              <strong>Y축:</strong> {sensorData.y.toFixed(3)}
            </div>
            <div className="sensor-item" style={{
              background: 'white',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              fontFamily: 'monospace',
              fontSize: '0.9rem'
            }}>
              <strong>Z축:</strong> {sensorData.z.toFixed(3)}
            </div>
            <div className="sensor-item" style={{
              background: 'white',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              fontFamily: 'monospace',
              fontSize: '0.9rem'
            }}>
              <strong>합성값:</strong> {sensorData.magnitude.toFixed(3)}
            </div>
            <div className="sensor-item" style={{
              background: 'white',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              fontFamily: 'monospace',
              fontSize: '0.9rem'
            }}>
              <strong>움직임:</strong> {sensorData.delta.toFixed(3)}
            </div>
          </div>
          <div className="sensor-status" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginTop: '1rem'
          }}>
            <div
              className={`status-indicator ${
                sensorData.hasAccelWithGravity ? "active" : "inactive"
              }`}
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                fontSize: '0.9rem',
                textAlign: 'center',
                background: sensorData.hasAccelWithGravity ? '#dcfce7' : '#fef2f2',
                border: sensorData.hasAccelWithGravity ? '1px solid #16a34a' : '1px solid #dc2626',
                color: sensorData.hasAccelWithGravity ? '#166534' : '#991b1b'
              }}
            >
              중력포함가속도: {sensorData.hasAccelWithGravity ? "✅" : "❌"}
            </div>
            <div
              className={`status-indicator ${
                sensorData.hasAccel ? "active" : "inactive"
              }`}
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                fontSize: '0.9rem',
                textAlign: 'center',
                background: sensorData.hasAccel ? '#dcfce7' : '#fef2f2',
                border: sensorData.hasAccel ? '1px solid #16a34a' : '1px solid #dc2626',
                color: sensorData.hasAccel ? '#166534' : '#991b1b'
              }}
            >
              가속도: {sensorData.hasAccel ? "✅" : "❌"}
            </div>
            <div
              className={`status-indicator ${
                sensorData.hasRotation ? "active" : "inactive"
              }`}
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                fontSize: '0.9rem',
                textAlign: 'center',
                background: sensorData.hasRotation ? '#dcfce7' : '#fef2f2',
                border: sensorData.hasRotation ? '1px solid #16a34a' : '1px solid #dc2626',
                color: sensorData.hasRotation ? '#166534' : '#991b1b'
              }}
            >
              회전: {sensorData.hasRotation ? "✅" : "❌"}
            </div>
          </div>
        </div>
      )}

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
