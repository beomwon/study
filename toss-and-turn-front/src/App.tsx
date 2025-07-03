import { useState, useRef } from "react";
import "./App.css";

function App() {
  // const [log, setLog] = useState<string[]>([]); // 주석처리 - 화면에서 활동로그 숨김
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

  // 이벤트 리스너와 관련 변수들을 useRef로 관리
  const eventListenerRef = useRef<((event: DeviceMotionEvent) => void) | null>(
    null
  );
  const orientationListenerRef = useRef<
    ((event: DeviceOrientationEvent) => void) | null
  >(null);
  const eventCountRef = useRef(0);
  const lastMagnitudeRef = useRef(0);
  const lastSentRef = useRef(0);

  const startMeasurement = async () => {
    setStatus("권한 요청 중...");

    // 디바이스 정보 수집
    const userAgent = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    setDeviceInfo(
      `${isIOS ? "iOS" : "Other"} - ${isSafari ? "Safari" : "Other Browser"}`
    );

    // setLog((prev) => [...prev, `🔍 디바이스: ${isIOS ? "iOS" : "Other"}, 브라우저: ${isSafari ? "Safari" : "Other"}`]); // 주석처리

    try {
      // DeviceMotionEvent 지원 여부 확인
      if (typeof DeviceMotionEvent === "undefined") {
        setStatus("이 브라우저는 DeviceMotion을 지원하지 않습니다.");
        // setLog((prev) => [...prev, `❌ DeviceMotionEvent가 정의되지 않음`]); // 주석처리
        return;
      }

      // setLog((prev) => [...prev, `✅ DeviceMotionEvent 지원됨`]); // 주석처리

      // iOS 13+ 권한 요청
      if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
        // setLog((prev) => [...prev, `🔐 iOS 권한 요청 필요`]); // 주석처리
        setStatus("iOS 권한 요청 중...");

        const permission = await (DeviceMotionEvent as any).requestPermission();
        // setLog((prev) => [...prev, `🔐 권한 결과: ${permission}`]); // 주석처리

        if (permission !== "granted") {
          setStatus("센서 권한이 거부되었습니다.");
          alert(
            "센서 권한이 필요합니다. 설정에서 Safari > 모션 및 방향 접근을 허용해주세요."
          );
          return;
        }
        setStatus("권한 허용됨");
        // setLog((prev) => [...prev, `✅ 권한 허용됨`]); // 주석처리
      } else {
        // setLog((prev) => [...prev, `ℹ️ 권한 요청 불필요 (iOS 13 미만 또는 다른 OS)`]); // 주석처리
      }

      setIsMeasuring(true);
      setStatus("측정 중... 휴대폰을 움직여보세요!");

      // 초기 센서 데이터 영역 표시
      setSensorData({
        eventCount: 0,
        x: 0,
        y: 0,
        z: 0,
        magnitude: 0,
        delta: 0,
        hasAccelWithGravity: false,
        hasAccel: false,
        hasRotation: false,
      });

      // ref 변수들 초기화
      eventCountRef.current = 0;
      lastMagnitudeRef.current = 0;
      lastSentRef.current = 0;

      const MIN_INTERVAL = 1000;

      const handleDeviceMotion = (event: DeviceMotionEvent) => {
        eventCountRef.current++;

        // 디버깅: 이벤트 발생 확인
        // console.log(`센서 이벤트 ${eventCountRef.current} 발생, isMeasuring: ${isMeasuring}`);

        // isMeasuring 체크를 나중에 하도록 변경
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

        // 디버깅: 센서 상태 로그
        // console.log('센서 상태:', { hasAccelWithGravity, hasAccel, hasRotation });

        // 센서 데이터가 null인지 확인
        if (!acceleration) {
          console.log("센서 데이터 없음");
          setStatus(`센서 데이터 없음 (이벤트 ${eventCountRef.current}번째)`);
          setSensorData({
            eventCount: eventCountRef.current,
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

        // 디버깅: 실제 센서 값 로그
        // console.log(`센서 값: X=${x.toFixed(3)}, Y=${y.toFixed(3)}, Z=${z.toFixed(3)}`);

        // 모든 값이 0인지 확인
        if (x === 0 && y === 0 && z === 0) {
          console.log("모든 센서 값이 0");
          setStatus(`센서 값이 모두 0`);
          setSensorData({
            eventCount: eventCountRef.current,
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
        const delta = Math.abs(magnitude - lastMagnitudeRef.current);
        const now = Date.now();

        // 디버깅: 계산된 값들 로그
        // console.log(`계산값: magnitude=${magnitude.toFixed(3)}, delta=${delta.toFixed(3)}`);

        // 항상 센서 데이터 업데이트
        const newSensorData = {
          eventCount: eventCountRef.current,
          x,
          y,
          z,
          magnitude,
          delta,
          hasAccelWithGravity,
          hasAccel,
          hasRotation,
        };

        // console.log('setSensorData 호출:', newSensorData);
        setSensorData(newSensorData);

        // 상태 메시지도 항상 업데이트
        // setStatus(`측정 중... 이벤트:${eventCountRef.current} 움직임:${delta.toFixed(2)} XYZ:(${x.toFixed(1)},${y.toFixed(1)},${z.toFixed(1)})`);

        // 움직임 감지 로그는 isMeasuring일 때만
        if (isMeasuring) {
          const LOWER_THRESHOLD = 0.5;

          if (
            delta > LOWER_THRESHOLD &&
            now - lastSentRef.current > MIN_INTERVAL
          ) {
            // const time = new Date().toLocaleTimeString(); // 주석처리
            // setLog((prev) => [...prev, `📍 ${time} 움직임 감지! Δ=${delta.toFixed(2)}`]); // 주석처리
            lastSentRef.current = now;
          }
        }

        lastMagnitudeRef.current = magnitude;
      };

      // 이벤트 리스너 참조 저장
      eventListenerRef.current = handleDeviceMotion;

      window.addEventListener("devicemotion", handleDeviceMotion);
      // setLog((prev) => [...prev, `🎯 DeviceMotion 이벤트 리스너 등록됨`]); // 주석처리

      // 테스트용 로그 추가
      // setLog((prev) => [...prev, `🚀 ${new Date().toLocaleTimeString()} 측정 시작됨`]); // 주석처리

      // 5초 후 센서 작동 여부 확인
      setTimeout(() => {
        if (eventCountRef.current === 0) {
          setStatus("⚠️ 센서 이벤트가 발생하지 않음");
          // setLog((prev) => [...prev, `⚠️ 5초 동안 센서 이벤트 없음 - 다음을 확인해주세요:`, `1. Safari 설정 > 개인정보 보호 및 보안 > 모션 및 방향 접근`, `2. 설정 > Safari > 고급 > 웹사이트 데이터에서 권한 확인`, `3. 페이지 새로고침 후 다시 시도`]); // 주석처리
        } else {
          // setLog((prev) => [...prev, `✅ 5초간 ${eventCountRef.current}개 센서 이벤트 수신됨`]); // 주석처리
        }
      }, 5000);

      // 추가: iOS에서 화면을 깨우기 위한 더미 이벤트
      if (isIOS) {
        // 화면 깨우기
        window.addEventListener("touchstart", () => {}, { passive: true });

        // DeviceOrientationEvent도 시도
        if (typeof DeviceOrientationEvent !== "undefined") {
          const orientationHandler = (_event: DeviceOrientationEvent) => {
            if (eventCountRef.current <= 2) {
              // setLog((prev) => [...prev, `🧭 방향 센서: α=${event.alpha?.toFixed(1)}, β=${event.beta?.toFixed(1)}, γ=${event.gamma?.toFixed(1)}`]); // 주석처리
            }
          };
          orientationListenerRef.current = orientationHandler;
          window.addEventListener("deviceorientation", orientationHandler);
          // setLog((prev) => [...prev, `🧭 DeviceOrientation 이벤트도 등록됨`]); // 주석처리
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
    // setLog((prev) => [...prev, `⏹️ ${new Date().toLocaleTimeString()} 측정 중지됨`]); // 주석처리

    // 이벤트 리스너 제거
    if (eventListenerRef.current) {
      window.removeEventListener("devicemotion", eventListenerRef.current);
      eventListenerRef.current = null;
      console.log("DeviceMotion 이벤트 리스너 제거됨");
    }

    if (orientationListenerRef.current) {
      window.removeEventListener(
        "deviceorientation",
        orientationListenerRef.current
      );
      orientationListenerRef.current = null;
      console.log("DeviceOrientation 이벤트 리스너 제거됨");
    }

    console.log("측정 중지 - 센서 데이터 유지");
  };

  return (
    <div className="app">
      <h1>Toss and Turn</h1>
      <h2>수면 중 뒤척임 감지기</h2>
      <p className="version">v1.7 - 활동로그제거 및 코드분리</p>

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
        <div className="sensor-data-container">
          <h3 className="sensor-data-title">📊 실시간 센서 데이터</h3>

          <div className="sensor-explanation">
            <p>X축: 좌우움직임 | Y축: 위아래움직임 | Z축: 앞뒤움직임</p>
            <p>합성값: 전체 움직임 크기 | 움직임: 이전과의 차이</p>
          </div>

          <div className="sensor-grid-container">
            {/* 이벤트 수 주석처리 - 디버깅용
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
            */}
            <div className="sensor-item-data">
              <strong>X축:</strong> {sensorData.x.toFixed(3)}
            </div>
            <div className="sensor-item-data">
              <strong>Y축:</strong> {sensorData.y.toFixed(3)}
            </div>
            <div className="sensor-item-data">
              <strong>Z축:</strong> {sensorData.z.toFixed(3)}
            </div>
            <div className="sensor-item-data">
              <strong>합성값:</strong> {sensorData.magnitude.toFixed(3)}
            </div>
            <div className="sensor-item-data">
              <strong>움직임 차이:</strong> {sensorData.delta.toFixed(3)}
            </div>
          </div>
          <div className="sensor-status-container">
            <div
              className={
                sensorData.hasAccelWithGravity
                  ? "status-indicator-active"
                  : "status-indicator-inactive"
              }
            >
              중력포함가속도: {sensorData.hasAccelWithGravity ? "✅" : "❌"}
            </div>
            <div
              className={
                sensorData.hasAccel
                  ? "status-indicator-active"
                  : "status-indicator-inactive"
              }
            >
              가속도: {sensorData.hasAccel ? "✅" : "❌"}
            </div>
            <div
              className={
                sensorData.hasRotation
                  ? "status-indicator-active"
                  : "status-indicator-inactive"
              }
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

      {/* 활동 로그 주석처리 - 화면 정리용
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
      */}
    </div>
  );
}

export default App;
