// 별자리 기본 정보
const zodiacInfo = {
  aries: { name: "양자리", symbol: "♈", period: "3.21 ~ 4.19" },
  taurus: { name: "황소자리", symbol: "♉", period: "4.20 ~ 5.20" },
  gemini: { name: "쌍둥이자리", symbol: "♊", period: "5.21 ~ 6.21" },
  cancer: { name: "게자리", symbol: "♋", period: "6.22 ~ 7.22" },
  leo: { name: "사자자리", symbol: "♌", period: "7.23 ~ 8.22" },
  virgo: { name: "처녀자리", symbol: "♍", period: "8.23 ~ 9.22" },
  libra: { name: "천칭자리", symbol: "♎", period: "9.23 ~ 10.22" },
  scorpio: { name: "전갈자리", symbol: "♏", period: "10.23 ~ 11.22" },
  sagittarius: { name: "사수자리", symbol: "♐", period: "11.23 ~ 12.21" },
  capricorn: { name: "염소자리", symbol: "♑", period: "12.22 ~ 1.19" },
  aquarius: { name: "물병자리", symbol: "♒", period: "1.20 ~ 2.18" },
  pisces: { name: "물고기자리", symbol: "♓", period: "2.19 ~ 3.20" },
};

// 별자리 순서 (표시 순서)
const zodiacOrder = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];

// 날짜 기반 시드 생성 함수
function getDailySeed() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  // 년월일을 조합해서 시드 생성 (예: 20250706)
  return parseInt(
    `${year}${month.toString().padStart(2, "0")}${date
      .toString()
      .padStart(2, "0")}`
  );
}

// 시드 기반 랜덤 함수 (Linear Congruential Generator)
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// 배열에서 시드 기반으로 요소 선택
function getSeededArrayElement(array, seed, offset = 0) {
  const index = Math.floor(seededRandom(seed + offset) * array.length);
  return array[index];
}

// 시드 기반으로 1-5 사이의 점수 생성
function getSeededScore(seed, offset = 0) {
  return Math.floor(seededRandom(seed + offset) * 5) + 1;
}

// 총점에 따라 행운 지수 결정
function getLuckyLevelByScore(totalScore) {
  if (totalScore >= 90) return "매우 좋음";
  if (totalScore >= 80) return "좋음";
  if (totalScore >= 70) return "보통";
  if (totalScore >= 60) return "주의";
  return "매우 주의";
}

// 오늘의 운세 데이터 생성
function generateTodaysFortune(zodiacKey) {
  const seed = getDailySeed();
  const zodiacSeed = seed + zodiacKey.charCodeAt(0); // 별자리별로 다른 시드

  const info = zodiacInfo[zodiacKey];

  // 총점을 먼저 생성
  const totalScore = getSeededArrayElement(
    fortuneDatabase.totalScores,
    zodiacSeed,
    16
  );

  // 총점에 따라 행운 지수 결정
  const luckyLevel = getLuckyLevelByScore(totalScore);

  return {
    name: info.name,
    symbol: info.symbol,
    period: info.period,
    message: getSeededArrayElement(fortuneDatabase.messages, zodiacSeed, 0),
    summaryMessage: getSeededArrayElement(
      fortuneDatabase.summaryMessages,
      zodiacSeed,
      1
    ),
    lucky: {
      color: getSeededArrayElement(fortuneDatabase.luckyColors, zodiacSeed, 2),
      number: getSeededArrayElement(
        fortuneDatabase.luckyNumbers,
        zodiacSeed,
        3
      ),
      word: getSeededArrayElement(fortuneDatabase.luckyWords, zodiacSeed, 4),
      time: getSeededArrayElement(fortuneDatabase.luckyTimes, zodiacSeed, 5),
      direction: getSeededArrayElement(
        fortuneDatabase.luckyDirections,
        zodiacSeed,
        6
      ),
      item: getSeededArrayElement(fortuneDatabase.luckyItems, zodiacSeed, 7),
    },
    avoid: {
      color: getSeededArrayElement(fortuneDatabase.avoidColors, zodiacSeed, 8),
      number: getSeededArrayElement(
        fortuneDatabase.avoidNumbers,
        zodiacSeed,
        9
      ),
      word: getSeededArrayElement(fortuneDatabase.avoidWords, zodiacSeed, 10),
    },
    scores: {
      love: getSeededScore(zodiacSeed, 11),
      study: getSeededScore(zodiacSeed, 12),
      money: getSeededScore(zodiacSeed, 13),
      health: getSeededScore(zodiacSeed, 14),
      relationship: getSeededScore(zodiacSeed, 15),
    },
    totalScore: totalScore,
    luckyLevel: luckyLevel,
    recommendedActivity: getSeededArrayElement(
      fortuneDatabase.recommendedActivities,
      zodiacSeed,
      18
    ),
    thingToAvoid: getSeededArrayElement(
      fortuneDatabase.thingsToAvoid,
      zodiacSeed,
      19
    ),
    compatible: getSeededArrayElement(
      fortuneDatabase.compatibleSigns[zodiacKey],
      zodiacSeed,
      20
    ),
    incompatible: getSeededArrayElement(
      fortuneDatabase.incompatibleSigns[zodiacKey],
      zodiacSeed,
      21
    ),
  };
}

// 모든 별자리의 오늘 운세 생성
function generateAllTodaysFortuneData() {
  const fortuneData = {};
  const zodiacKeys = Object.keys(zodiacInfo);

  zodiacKeys.forEach((key) => {
    fortuneData[key] = generateTodaysFortune(key);
  });

  return fortuneData;
}

// 오늘의 운세 데이터 (페이지 로드 시 생성)
let todaysFortuneData = {};

// 운세 랭킹 생성 (총운 점수 기준으로 정렬)
function generateTodaysRanking() {
  const zodiacKeys = Object.keys(todaysFortuneData);

  // 총운 점수로 정렬
  return zodiacKeys.sort((a, b) => {
    return todaysFortuneData[b].totalScore - todaysFortuneData[a].totalScore;
  });
}

// DOM 요소들
const zodiacSelection = document.getElementById("zodiacSelection");
const horoscopeResult = document.getElementById("horoscopeResult");
const zodiacRanking = document.getElementById("zodiacRanking");
const backBtn = document.getElementById("backBtn");
const changeSignBtn = document.getElementById("changeSignBtn");
const rankingBtn = document.getElementById("rankingBtn");

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

// 별자리 그리드 생성
function generateZodiacGrid() {
  const zodiacGrid = document.getElementById("zodiacGrid");
  if (!zodiacGrid) return;

  zodiacGrid.innerHTML = "";

  zodiacOrder.forEach((sign) => {
    const info = zodiacInfo[sign];
    const zodiacItem = document.createElement("div");
    zodiacItem.className = "zodiac-item";
    zodiacItem.dataset.sign = sign;

    zodiacItem.innerHTML = `
      <div class="zodiac-icon">${info.symbol}</div>
      <div class="zodiac-name">${info.name}</div>
      <div class="zodiac-date">${info.period}</div>
    `;

    // 클릭 이벤트 추가
    zodiacItem.addEventListener("click", () => {
      showHoroscopeResult(sign);
    });

    zodiacGrid.appendChild(zodiacItem);
  });
}

// 랭킹 리스트 생성
function generateRankingList() {
  const rankingList = document.getElementById("rankingList");
  if (!rankingList) return;

  const ranking = generateTodaysRanking();
  rankingList.innerHTML = "";

  ranking.forEach((zodiacKey, index) => {
    const data = todaysFortuneData[zodiacKey];
    const info = zodiacInfo[zodiacKey];

    const rankingItem = document.createElement("div");
    rankingItem.className = "ranking-item";
    rankingItem.dataset.sign = zodiacKey;
    rankingItem.dataset.rank = index + 1;

    const stars =
      "★".repeat(Math.floor(data.totalScore / 20)) +
      "☆".repeat(5 - Math.floor(data.totalScore / 20));

    rankingItem.innerHTML = `
      <div class="rank-number">${index + 1}</div>
      <div class="zodiac-info">
        <div class="zodiac-name">${data.name}</div>
        <div class="zodiac-period">${info.period}</div>
      </div>
      <div class="score-info">
        <div class="score-stars">${stars}</div>
        <div class="score-point">${data.totalScore}점</div>
      </div>
      <div class="detail-link" data-sign="${zodiacKey}">자세히보기 ></div>
    `;

    // 자세히보기 링크 클릭 이벤트
    const detailLink = rankingItem.querySelector(".detail-link");
    detailLink.addEventListener("click", (e) => {
      e.stopPropagation();
      showHoroscopeResult(zodiacKey);
    });

    // 랭킹 아이템 클릭 이벤트 (전체 영역)
    rankingItem.addEventListener("click", () => {
      showHoroscopeResult(zodiacKey);
    });

    rankingList.appendChild(rankingItem);
  });
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
  const data = todaysFortuneData[sign];

  if (!data) return;

  // 선택된 별자리 정보 업데이트
  document.getElementById("selectedSymbol").textContent = data.symbol;
  document.getElementById("selectedTitle").textContent = data.name; // 이모지 제거, 이름만 표시

  // 한 줄 요약 메시지 업데이트 (있는 경우)
  const summaryElement = document.getElementById("summaryMessage");
  if (summaryElement) summaryElement.textContent = data.summaryMessage;

  // 운세 메시지 업데이트
  document.getElementById("fortuneMessage").textContent = data.message;

  // 행운 지수 업데이트 (있는 경우)
  const luckyLevelElement = document.getElementById("luckyLevel");
  if (luckyLevelElement) luckyLevelElement.textContent = data.luckyLevel;

  // 행운/주의 요소 개별 업데이트
  document.getElementById("luckyColor").textContent = data.lucky.color;
  document.getElementById("luckyNumber").textContent = data.lucky.number;
  document.getElementById("luckyItem").textContent = data.lucky.item;
  document.getElementById("luckyTime").textContent = data.lucky.time;
  document.getElementById("luckyDirection").textContent = data.lucky.direction;
  document.getElementById("luckyWord").textContent = data.lucky.word;

  document.getElementById("avoidColor").textContent = data.avoid.color;
  document.getElementById("avoidNumber").textContent = data.avoid.number;
  document.getElementById("avoidWord").textContent = data.avoid.word;

  // 총운 점수 업데이트 (있는 경우)
  const totalScoreElement = document.getElementById("totalScore");
  if (totalScoreElement) totalScoreElement.textContent = `${data.totalScore}점`;

  // 추천 활동 업데이트 (있는 경우)
  const recommendedActivityElement = document.getElementById(
    "recommendedActivity"
  );
  if (recommendedActivityElement)
    recommendedActivityElement.textContent = data.recommendedActivity;

  // 피해야 할 것 업데이트 (있는 경우)
  const thingToAvoidElement = document.getElementById("thingToAvoid");
  if (thingToAvoidElement) thingToAvoidElement.textContent = data.thingToAvoid;

  // 궁합 정보 업데이트 (있는 경우)
  const compatibleElement = document.getElementById("compatibleSign");
  if (compatibleElement) compatibleElement.textContent = data.compatible;

  const incompatibleElement = document.getElementById("incompatibleSign");
  if (incompatibleElement) incompatibleElement.textContent = data.incompatible;

  // 운세 점수 업데이트
  updateScores(data.scores);

  // 화면 전환
  zodiacSelection.style.display = "none";
  if (zodiacRanking) zodiacRanking.style.display = "none";
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
    relationship: document.getElementById("relationshipScore"),
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

// 랭킹 페이지의 데이터 업데이트
function updateRankingDisplay() {
  // 동적 생성으로 대체되어 더 이상 필요하지 않음
  // generateRankingList()에서 모든 업데이트를 처리
}

// 랭킹 페이지 표시
function showRanking() {
  zodiacSelection.style.display = "none";
  horoscopeResult.style.display = "none";
  if (zodiacRanking) zodiacRanking.style.display = "block";
  window.scrollTo(0, 0);
}

// 별자리 선택 페이지로 돌아가기
function showZodiacSelection() {
  if (zodiacRanking) zodiacRanking.style.display = "none";
  horoscopeResult.style.display = "none";
  zodiacSelection.style.display = "block";
  window.scrollTo(0, 0);
}

// 초기화
document.addEventListener("DOMContentLoaded", () => {
  // 오늘의 운세 데이터 생성
  todaysFortuneData = generateAllTodaysFortuneData();

  // DOM 설정
  setTodayDate();
  setupZodiacSelection();
  setupBackButton();
  setupChangeSignButton();
  setupRankingButton();
  setupRankingToggle();

  // 별자리 그리드 생성
  generateZodiacGrid();

  // 랭킹 리스트 생성
  generateRankingList();

  // 랭킹 페이지 데이터 업데이트
  updateRankingDisplay();

  // 페이지 로드 시 랭킹 페이지 표시
  showRanking();
});

// 페이지 로드 시 점수 바 초기화
window.addEventListener("load", () => {
  const scoreFills = document.querySelectorAll(".score-fill");
  scoreFills.forEach((fill) => {
    fill.style.width = "0%";
  });
});

// 랭킹 아이템 토글 - 별자리를 클릭하면 상세 내용 표시
function setupRankingToggle() {
  // 동적 생성으로 대체되어 더 이상 필요하지 않음
  // generateRankingList()에서 이벤트 리스너를 직접 추가
}

// 뒤로가기 버튼
function setupBackButton() {
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      // 현재 표시된 페이지에 따라 다른 동작 수행
      if (horoscopeResult.style.display === "block") {
        // 운세 상세 페이지에서는 랭킹 페이지로
        showRanking();
      } else {
        // 랭킹 페이지나 별자리 선택 페이지에서는 index.html로
        window.location.href = "index.html";
      }
    });
  }
}

// 다른 별자리 보기 버튼 - 랭킹 페이지로 이동
function setupChangeSignButton() {
  if (changeSignBtn) {
    changeSignBtn.addEventListener("click", () => {
      showRanking();
    });
  }
}

// 랭킹 버튼
function setupRankingButton() {
  if (rankingBtn) {
    rankingBtn.addEventListener("click", () => {
      showRanking();
    });
  }
}
