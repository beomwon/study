// 별자리 운세 데이터
const horoscopeData = {
  aries: {
    name: "양자리",
    symbol: "♈",
    message:
      "오늘은 새로운 시작을 알리는 날입니다. 평소보다 적극적인 자세로 임하면 좋은 결과를 얻을 수 있을 것 같습니다. 주변 사람들과의 소통을 늘려보세요.",
    lucky: { color: "빨간색", number: "7", word: "도전" },
    avoid: { color: "검은색", number: "4", word: "포기" },
    scores: { love: 4, study: 3, money: 5, health: 2 },
  },
  taurus: {
    name: "황소자리",
    symbol: "♉",
    message:
      "안정감을 추구하는 당신에게 오늘은 차분하고 평온한 하루가 될 것입니다. 금전적인 면에서 좋은 소식이 있을 수 있으니 기대해보세요.",
    lucky: { color: "초록색", number: "3", word: "안정" },
    avoid: { color: "보라색", number: "9", word: "변화" },
    scores: { love: 3, study: 4, money: 5, health: 4 },
  },
  gemini: {
    name: "쌍둥이자리",
    symbol: "♊",
    message:
      "호기심이 왕성한 오늘, 새로운 정보나 지식을 습득하기에 좋은 날입니다. 다양한 사람들과의 만남에서 영감을 얻을 수 있을 거예요.",
    lucky: { color: "노란색", number: "5", word: "소통" },
    avoid: { color: "회색", number: "8", word: "고집" },
    scores: { love: 4, study: 5, money: 3, health: 3 },
  },
  cancer: {
    name: "게자리",
    symbol: "♋",
    message:
      "감정이 풍부한 당신에게 오늘은 가족이나 가까운 사람들과의 시간이 특별히 소중할 날입니다. 집에서 편안한 시간을 보내는 것을 추천합니다.",
    lucky: { color: "은색", number: "2", word: "공감" },
    avoid: { color: "빨간색", number: "7", word: "다툼" },
    scores: { love: 5, study: 2, money: 3, health: 4 },
  },
  leo: {
    name: "사자자리",
    symbol: "♌",
    message:
      "자신감 넘치는 당신의 매력이 빛을 발하는 날입니다. 리더십을 발휘할 기회가 찾아올 것이니 주저하지 말고 앞장서세요.",
    lucky: { color: "금색", number: "1", word: "자신감" },
    avoid: { color: "파란색", number: "6", word: "겸손" },
    scores: { love: 5, study: 4, money: 4, health: 3 },
  },
  virgo: {
    name: "처녀자리",
    symbol: "♍",
    message:
      "세심하고 완벽주의적인 성향이 오늘 큰 도움이 될 것입니다. 계획했던 일들을 차근차근 실행에 옮기기 좋은 날이에요.",
    lucky: { color: "베이지색", number: "6", word: "완벽" },
    avoid: { color: "오렌지색", number: "3", word: "서두름" },
    scores: { love: 3, study: 5, money: 4, health: 5 },
  },
  libra: {
    name: "천칭자리",
    symbol: "♎",
    message:
      "균형과 조화를 중시하는 당신에게 오늘은 인간관계에서 중재자 역할을 할 기회가 있을 것입니다. 미적 감각도 빛날 날이에요.",
    lucky: { color: "분홍색", number: "6", word: "조화" },
    avoid: { color: "검은색", number: "1", word: "편견" },
    scores: { love: 4, study: 3, money: 3, health: 4 },
  },
  scorpio: {
    name: "전갈자리",
    symbol: "♏",
    message:
      "강렬하고 집중력이 뛰어난 당신의 능력이 주목받는 날입니다. 깊이 있는 탐구나 연구에 몰두하면 좋은 성과를 얻을 수 있어요.",
    lucky: { color: "깊은 빨간색", number: "8", word: "집중" },
    avoid: { color: "연한 색", number: "2", word: "산만" },
    scores: { love: 5, study: 4, money: 3, health: 2 },
  },
  sagittarius: {
    name: "사수자리",
    symbol: "♐",
    message:
      "자유롭고 모험을 좋아하는 당신에게 오늘은 새로운 경험이나 여행 계획을 세우기 좋은 날입니다. 넓은 시야로 세상을 바라보세요.",
    lucky: { color: "보라색", number: "9", word: "모험" },
    avoid: { color: "갈색", number: "4", word: "제한" },
    scores: { love: 3, study: 3, money: 4, health: 5 },
  },
  capricorn: {
    name: "염소자리",
    symbol: "♑",
    message:
      "목표 지향적이고 성실한 당신의 노력이 결실을 맺는 날입니다. 장기적인 계획을 세우고 한 걸음씩 나아가는 것이 좋겠어요.",
    lucky: { color: "검은색", number: "10", word: "성취" },
    avoid: { color: "화려한 색", number: "5", word: "서두름" },
    scores: { love: 2, study: 5, money: 5, health: 3 },
  },
  aquarius: {
    name: "물병자리",
    symbol: "♒",
    message:
      "독창적이고 혁신적인 아이디어가 떠오르는 날입니다. 기존의 틀에서 벗어나 새로운 방식을 시도해보면 놀라운 결과를 얻을 수 있어요.",
    lucky: { color: "하늘색", number: "11", word: "혁신" },
    avoid: { color: "갈색", number: "2", word: "전통" },
    scores: { love: 4, study: 4, money: 2, health: 4 },
  },
  pisces: {
    name: "물고기자리",
    symbol: "♓",
    message:
      "감성이 풍부하고 직감이 뛰어난 당신에게 오늘은 예술적 영감이 샘솟는 날입니다. 창작 활동이나 명상을 통해 내면의 평화를 찾아보세요.",
    lucky: { color: "바다색", number: "12", word: "직감" },
    avoid: { color: "빨간색", number: "1", word: "논리" },
    scores: { love: 5, study: 2, money: 3, health: 4 },
  },
};

// DOM 요소들
const zodiacSelection = document.getElementById("zodiacSelection");
const horoscopeResult = document.getElementById("horoscopeResult");
const backBtn = document.getElementById("backBtn");
const changeSignBtn = document.getElementById("changeSignBtn");

// 오늘 날짜 설정
function setTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const todayDateElement = document.getElementById("todayDate");
  if (todayDateElement) {
    todayDateElement.textContent = `${year}년 ${month}월 ${date}일`;
  }
}

// 별자리 클릭 이벤트
function setupZodiacSelection() {
  const zodiacItems = document.querySelectorAll(".zodiac-item");

  zodiacItems.forEach((item) => {
    item.addEventListener("click", () => {
      const sign = item.dataset.sign;
      showHoroscopeResult(sign);
    });
  });
}

// 운세 결과 표시
function showHoroscopeResult(sign) {
  const data = horoscopeData[sign];

  if (!data) return;

  // 선택된 별자리 정보 업데이트
  document.getElementById("selectedSymbol").textContent = data.symbol;
  document.getElementById("selectedTitle").textContent = data.name;

  // 운세 메시지 업데이트
  document.getElementById("fortuneMessage").textContent = data.message;

  // 행운의 요소 업데이트
  document.getElementById("luckyColor").textContent = data.lucky.color;
  document.getElementById("luckyNumber").textContent = data.lucky.number;
  document.getElementById("luckyWord").textContent = data.lucky.word;

  // 피해야 할 요소 업데이트
  document.getElementById("avoidColor").textContent = data.avoid.color;
  document.getElementById("avoidNumber").textContent = data.avoid.number;
  document.getElementById("avoidWord").textContent = data.avoid.word;

  // 운세 점수 업데이트
  updateScores(data.scores);

  // 화면 전환
  zodiacSelection.style.display = "none";
  horoscopeResult.style.display = "block";

  // 스크롤을 맨 위로
  window.scrollTo(0, 0);
}

// 점수 바 애니메이션
function updateScores(scores) {
  const scoreElements = {
    love: document.getElementById("loveScore"),
    study: document.getElementById("studyScore"),
    money: document.getElementById("moneyScore"),
    health: document.getElementById("healthScore"),
  };

  Object.keys(scores).forEach((key) => {
    const element = scoreElements[key];
    const score = scores[key];

    if (element) {
      element.dataset.score = score;
      element.parentElement.nextElementSibling.textContent = `${score}/5`;

      // 애니메이션을 위해 일시적으로 width를 0으로 설정
      setTimeout(() => {
        element.style.width = `${score * 20}%`;
      }, 100);
    }
  });
}

// 뒤로가기 버튼
function setupBackButton() {
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
}

// 다른 별자리 보기 버튼
function setupChangeSignButton() {
  if (changeSignBtn) {
    changeSignBtn.addEventListener("click", () => {
      horoscopeResult.style.display = "none";
      zodiacSelection.style.display = "block";
      window.scrollTo(0, 0);
    });
  }
}

// 초기화
document.addEventListener("DOMContentLoaded", () => {
  setTodayDate();
  setupZodiacSelection();
  setupBackButton();
  setupChangeSignButton();
});

// 페이지 로드 시 점수 바 초기화
window.addEventListener("load", () => {
  const scoreFills = document.querySelectorAll(".score-fill");
  scoreFills.forEach((fill) => {
    fill.style.width = "0%";
  });
});
