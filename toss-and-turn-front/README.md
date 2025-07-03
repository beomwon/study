# React + Vite + TypeScript 자이로스코프 센서 측정기

모바일 디바이스의 자이로스코프 센서를 활용한 실시간 움직임 측정 웹 애플리케이션입니다.

## 프로젝트 개요

### 주요 기능

- 모바일 자이로스코프 센서 실시간 측정
- iOS Safari 센서 권한 요청 처리
- X/Y/Z축 가속도 데이터 시각화
- 움직임 패턴 분석 (합성값, 변화량)
- 모바일 반응형 UI/UX

### 기술 스택

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: CSS3 (모듈화된 클래스 구조)
- **Sensor API**: DeviceMotionEvent, DeviceOrientationEvent
- **배포**: GitHub Pages
- **도구**: ESLint, npm, gh-pages

---

## 설치 및 실행

### 개발 환경 요구사항

- Node.js 16+
- npm 또는 yarn
- 모바일 디바이스 (센서 테스트용)

### 설치

```bash
# 프로젝트 클론
git clone [repository-url]
cd toss-and-turn-front

# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 프로덕션 빌드

```bash
npm run build
```

### GitHub Pages 배포

```bash
npm run deploy
```

---

## 📁 프로젝트 구조

```
toss-and-turn-front/
├── src/
│   ├── App.tsx           # 메인 애플리케이션 컴포넌트
│   ├── App.css           # 스타일시트
│   ├── main.tsx          # 애플리케이션 진입점
│   └── vite-env.d.ts     # Vite 타입 정의
├── public/
├── dist/                 # 빌드 출력 디렉토리
├── package.json
├── vite.config.ts        # Vite 설정
├── tsconfig.json         # TypeScript 설정
└── README.md
```

---

## 🔧 주요 구현 사항

### 1. 센서 데이터 수집

```typescript
interface SensorData {
  eventCount: number;
  x: number; // X축 가속도
  y: number; // Y축 가속도
  z: number; // Z축 가속도
  magnitude: number; // 합성 움직임 크기
  delta: number; // 이전 측정값과의 차이
  hasAccelWithGravity: boolean;
  hasAccel: boolean;
  hasRotation: boolean;
}
```

### 2. iOS 권한 처리

```typescript
// iOS 13+ 센서 권한 요청
if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
  const permission = await(DeviceMotionEvent as any).requestPermission();
  if (permission !== "granted") {
    // 권한 거부 처리
  }
}
```

### 3. 실시간 센서 이벤트 처리

```typescript
const handleDeviceMotion = (event: DeviceMotionEvent) => {
  const acceleration = event.accelerationIncludingGravity;
  const x = acceleration?.x ?? 0;
  const y = acceleration?.y ?? 0;
  const z = acceleration?.z ?? 0;

  const magnitude = Math.sqrt(x * x + y * y + z * z);
  const delta = Math.abs(magnitude - lastMagnitude);

  setSensorData({ x, y, z, magnitude, delta, ... });
};
```

---

## 📱 모바일 호환성

### 지원 브라우저

- ✅ iOS Safari 13+
- ✅ Android Chrome 67+
- ✅ Samsung Internet 8.0+
- ❌ Desktop 브라우저 (센서 미지원)

### iOS Safari 설정

1. **설정 > Safari > 개인정보 보호 및 보안**
2. **"모션 및 방향 접근"** 허용
3. 웹사이트에서 권한 요청 시 "허용" 선택

---

## 🎨 UI/UX 특징

### 반응형 디자인

- 모바일 우선 설계
- 터치 친화적인 버튼 크기
- 가독성 최적화된 폰트 크기

### 센서 데이터 시각화

- 실시간 X/Y/Z축 데이터 표시
- 센서 상태 인디케이터
- 움직임 패턴 분석 결과

### 사용자 안내

- 센서 데이터 의미 설명
- 권한 요청 가이드
- 오류 상황 안내

---

## 🔍 개발 과정 및 이슈 해결

### TypeScript 설정 최적화

- `tsconfig.app.json`, `tsconfig.node.json` 분리
- 컴파일 오류 해결 및 타입 안정성 확보

### iOS Safari 센서 이슈

- 권한 요청 타이밍 최적화
- null 체크 강화 및 예외 처리
- 이벤트 리스너 생명주기 관리

### 성능 최적화

- `useRef`를 활용한 메모리 효율적 이벤트 관리
- 불필요한 리렌더링 방지
- 센서 데이터 쓰로틀링

### 스타일 구조 개선

- 인라인 스타일에서 CSS 클래스로 분리
- 유지보수성 및 재사용성 향상

---

## 📊 센서 데이터 분석

### 움직임 구분 기준

- **깊은잠**: `delta < 0.3` (거의 움직임 없음)
- **얕은잠**: `0.3 < delta < 1.0` (작은 움직임)
- **뒤척임**: `delta > 1.0` (큰 움직임)

### 데이터 활용 방안

- 수면 패턴 분석
- 움직임 빈도 측정
- 수면 품질 평가

---

## 🚀 향후 개발 계획

### Phase 1: 수면 분석 기능

- [ ] 깊은잠/얕은잠 자동 구분
- [ ] 수면 단계별 시간 측정
- [ ] 움직임 패턴 시각화

### Phase 2: 데이터 관리

- [ ] 로컬 스토리지 활용 데이터 저장
- [ ] 수면 통계 및 트렌드 분석
- [ ] CSV/JSON 데이터 내보내기

---

## 🙏 참고 자료

- [MDN DeviceMotionEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent)
- [iOS Safari 센서 권한 가이드](https://developer.apple.com/documentation/webkit/requesting_permission_for_media_capture_on_a_web_page)
- [Vite 공식 문서](https://vitejs.dev/)
- [React TypeScript 가이드](https://react-typescript-cheatsheet.netlify.app/)
- [GitHub Pages 배포 가이드](https://docs.github.com/en/pages)
