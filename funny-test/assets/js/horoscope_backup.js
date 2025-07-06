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
const backToSelectionBtn = document.getElementById("backToSelectionBtn");

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

  // 행운/주의 요소 2줄 요약 생성
  const luckySummary = `행운의 색: ${data.lucky.color}, 숫자: ${data.lucky.number}, 아이템: ${data.lucky.item}`;
  const avoidSummary = `피해야 할 색: ${data.avoid.color}, 숫자: ${data.avoid.number}, 단어: ${data.avoid.word}`;

  document.getElementById("luckySummary").textContent = luckySummary;
  document.getElementById("avoidSummary").textContent = avoidSummary;

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
  const ranking = generateTodaysRanking();
  const rankingItems = document.querySelectorAll(".ranking-item");

  ranking.forEach((zodiacKey, index) => {
    const data = todaysFortuneData[zodiacKey];
    const rankItem = document.querySelector(`[data-rank="${index + 1}"]`);

    if (rankItem) {
      // 별자리 정보 업데이트
      rankItem.dataset.sign = zodiacKey;

      const rankIcon = rankItem.querySelector(".rank-icon");
      const rankName = rankItem.querySelector(".rank-name");
      const rankScore = rankItem.querySelector(".rank-score");

      if (rankIcon) rankIcon.textContent = data.symbol;
      if (rankName) rankName.textContent = data.name;
      if (rankScore) {
        const stars =
          "★".repeat(Math.floor(data.totalScore / 20)) +
          "☆".repeat(5 - Math.floor(data.totalScore / 20));
        rankScore.textContent = stars;
      }

      // 상세 정보 업데이트
      const detailSymbol = rankItem.querySelector(".detail-symbol");
      const detailTitle = rankItem.querySelector(".detail-info h4");
      const detailSubtitle = rankItem.querySelector(".detail-info p");
      const fortuneText = rankItem.querySelector(".fortune-text");

      if (detailSymbol) detailSymbol.textContent = data.symbol;
      if (detailTitle)
        detailTitle.textContent = `${data.name} (${data.period})`;
      if (detailSubtitle)
        detailSubtitle.textContent = `총운 ${data.totalScore}점 | ${data.luckyLevel}`;
      if (fortuneText)
        fortuneText.textContent = data.summaryMessage || data.message;

      // 행운의 요소 업데이트 (기존 3개 유지)
      const colorValue = rankItem.querySelector(".detail-value:nth-of-type(1)");
      const numberValue = rankItem.querySelector(
        ".detail-value:nth-of-type(2)"
      );
      const wordValue = rankItem.querySelector(".detail-value:nth-of-type(3)");

      if (colorValue) colorValue.textContent = data.lucky.color;
      if (numberValue) numberValue.textContent = data.lucky.number;
      if (wordValue) wordValue.textContent = data.lucky.word;
    }
  });
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

// 랭킹 아이템 토글 - 별자리를 클릭하면 상세 내용 표시
function setupRankingToggle() {
  const rankingItems = document.querySelectorAll(".ranking-item");

  rankingItems.forEach((item) => {
    item.addEventListener("click", () => {
      const sign = item.dataset.sign;

      // 랭킹에서 바로 운세 결과 페이지로 이동
      if (sign && todaysFortuneData[sign]) {
        showHoroscopeResult(sign);
      }
    });
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

// 별자리 선택으로 돌아가기 버튼 - 랭킹 페이지로 이동
function setupBackToSelectionButton() {
  if (backToSelectionBtn) {
    backToSelectionBtn.addEventListener("click", () => {
      showRanking();
    });
  }
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
  setupBackToSelectionButton();
  setupRankingToggle();

  // 랭킹 페이지 데이터 업데이트
  updateRankingDisplay();

  // 페이지 로드 시 바로 랭킹 페이지 표시
  showRanking();
});

// 페이지 로드 시 점수 바 초기화
window.addEventListener("load", () => {
  const scoreFills = document.querySelectorAll(".score-fill");
  scoreFills.forEach((fill) => {
    fill.style.width = "0%";
  });
});
