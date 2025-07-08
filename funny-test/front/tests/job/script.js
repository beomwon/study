// 직업 적성 테스트 JavaScript

let currentQuestion = 0;
let answers = [];
const totalQuestions = 10;

// 테스트 질문들
const questions = [
  {
    question: "새로운 프로젝트를 시작할 때 당신의 첫 번째 행동은?",
    answers: [
      { text: "세부 계획을 먼저 세운다", type: "planner" },
      { text: "팀원들과 브레인스토밍을 한다", type: "social" },
      { text: "바로 실행에 옮긴다", type: "action" },
      { text: "관련 정보를 철저히 조사한다", type: "analyst" },
    ],
  },
  {
    question: "업무 환경에서 가장 중요하게 생각하는 것은?",
    answers: [
      { text: "체계적이고 안정적인 환경", type: "planner" },
      { text: "동료들과의 원활한 소통", type: "social" },
      { text: "빠른 의사결정과 실행력", type: "action" },
      { text: "정확한 데이터와 분석", type: "analyst" },
    ],
  },
  {
    question: "문제 해결 방식은?",
    answers: [
      { text: "단계별로 체계적으로 접근", type: "planner" },
      { text: "다른 사람들의 의견을 듣고 종합", type: "social" },
      { text: "즉석에서 창의적 해결책 모색", type: "action" },
      { text: "데이터 분석을 통한 논리적 접근", type: "analyst" },
    ],
  },
  {
    question: "선호하는 업무 스타일은?",
    answers: [
      { text: "혼자서 집중해서 작업", type: "analyst" },
      { text: "팀과 함께 협업하며 작업", type: "social" },
      { text: "다양한 일을 동시에 처리", type: "action" },
      { text: "정해진 절차에 따라 체계적으로", type: "planner" },
    ],
  },
  {
    question: "스트레스를 받는 상황은?",
    answers: [
      { text: "계획이 자주 바뀔 때", type: "planner" },
      { text: "혼자서 일해야 할 때", type: "social" },
      { text: "반복적인 업무를 할 때", type: "action" },
      { text: "정확한 정보가 없을 때", type: "analyst" },
    ],
  },
  {
    question: "이상적인 직장 분위기는?",
    answers: [
      { text: "규칙과 절차가 명확한 곳", type: "planner" },
      { text: "사람들과 소통이 활발한 곳", type: "social" },
      { text: "변화와 도전이 많은 곳", type: "action" },
      { text: "전문성을 인정받는 곳", type: "analyst" },
    ],
  },
  {
    question: "회의에서 당신의 역할은?",
    answers: [
      { text: "안건을 정리하고 진행 순서를 관리", type: "planner" },
      { text: "모든 참석자의 의견을 듣고 조율", type: "social" },
      { text: "빠른 결정을 위해 행동 방안 제시", type: "action" },
      { text: "구체적인 데이터와 근거 제시", type: "analyst" },
    ],
  },
  {
    question: "성취감을 느끼는 순간은?",
    answers: [
      { text: "계획한 일정대로 프로젝트가 완료될 때", type: "planner" },
      { text: "팀이 화합하여 좋은 결과를 낼 때", type: "social" },
      { text: "빠른 실행으로 문제를 해결했을 때", type: "action" },
      { text: "정확한 분석으로 최적의 답을 찾았을 때", type: "analyst" },
    ],
  },
  {
    question: "커리어 발전에서 중요하게 생각하는 것은?",
    answers: [
      { text: "안정적인 승진과 체계적인 성장", type: "planner" },
      { text: "인맥 형성과 리더십 개발", type: "social" },
      { text: "다양한 경험과 새로운 도전", type: "action" },
      { text: "전문 지식과 기술력 향상", type: "analyst" },
    ],
  },
  {
    question: "10년 후 당신의 모습은?",
    answers: [
      { text: "체계적인 관리자로서 조직을 이끄는 모습", type: "planner" },
      { text: "많은 사람들과 소통하며 영향력을 발휘하는 모습", type: "social" },
      { text: "새로운 사업이나 분야에 도전하는 모습", type: "action" },
      { text: "해당 분야의 전문가로 인정받는 모습", type: "analyst" },
    ],
  },
];

// 직업 결과
const jobResults = {
  planner: {
    emoji: "📋",
    title: "기획자/관리자형",
    jobs: ["프로젝트 매니저", "기획자", "컨설턴트", "관리자"],
    description:
      "체계적이고 계획적인 성향을 가진 당신은 기획과 관리 업무에 특화되어 있습니다. 복잡한 프로젝트를 단계별로 관리하고, 체계적인 계획을 통해 목표를 달성하는 능력이 뛰어납니다.",
    traits: ["체계적", "계획적", "책임감", "조직력"],
  },
  social: {
    emoji: "🤝",
    title: "소통/협력형",
    jobs: ["HR 전문가", "영업", "마케터", "교육자"],
    description:
      "뛰어난 소통 능력과 공감 능력을 가진 당신은 사람과 관련된 업무에서 빛을 발합니다. 팀워크를 중시하고, 다양한 사람들과 원활한 관계를 구축하는 능력이 탁월합니다.",
    traits: ["소통력", "공감능력", "협력", "리더십"],
  },
  action: {
    emoji: "⚡",
    title: "실행/도전형",
    jobs: ["창업가", "영업", "마케터", "이벤트 기획자"],
    description:
      "빠른 실행력과 추진력을 가진 당신은 역동적이고 변화가 많은 환경에서 최고의 성과를 냅니다. 새로운 도전을 두려워하지 않고, 빠른 의사결정으로 기회를 잡는 능력이 뛰어납니다.",
    traits: ["실행력", "추진력", "도전정신", "적응력"],
  },
  analyst: {
    emoji: "📊",
    title: "분석/전문가형",
    jobs: ["데이터 분석가", "연구원", "개발자", "회계사"],
    description:
      "논리적 사고와 분석 능력이 뛰어난 당신은 전문적인 지식을 요구하는 분야에서 성공할 수 있습니다. 정확한 데이터 분석을 통해 최적의 해답을 찾는 능력이 탁월합니다.",
    traits: ["분석력", "논리성", "전문성", "집중력"],
  },
};

function startTest() {
  document.getElementById("testIntro").style.display = "none";
  document.getElementById("testProgress").style.display = "block";
  showQuestion();
}

function showQuestion() {
  const question = questions[currentQuestion];
  document.getElementById("questionTitle").textContent = question.question;
  document.getElementById("progressText").textContent = `${
    currentQuestion + 1
  } / ${totalQuestions}`;
  document.getElementById("progressFill").style.width = `${
    ((currentQuestion + 1) / totalQuestions) * 100
  }%`;

  const optionsContainer = document.getElementById("optionsContainer");
  optionsContainer.innerHTML = "";

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = answer.text;
    button.onclick = () => selectAnswer(answer.type);
    optionsContainer.appendChild(button);
  });
}

function selectAnswer(type) {
  answers.push(type);

  if (currentQuestion < totalQuestions - 1) {
    currentQuestion++;
    setTimeout(showQuestion, 300);
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("testProgress").style.display = "none";
  document.getElementById("testResult").style.display = "block";

  // 답변 분석
  const counts = {};
  answers.forEach((answer) => {
    counts[answer] = (counts[answer] || 0) + 1;
  });

  // 가장 많이 선택된 타입 찾기
  const resultType = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );
  const result = jobResults[resultType];

  // 결과 표시
  document.getElementById("resultEmoji").textContent = result.emoji;
  document.getElementById("resultTitle").textContent = result.title;

  const description = `
    <h3>추천 직업</h3>
    <p><strong>${result.jobs.join(", ")}</strong></p>
    <h3>특징</h3>
    <p>${result.traits.join(" • ")}</p>
    <h3>설명</h3>
    <p>${result.description}</p>
  `;

  document.getElementById("resultDescription").innerHTML = description;
}

function retryTest() {
  currentQuestion = 0;
  answers = [];
  document.getElementById("testResult").style.display = "none";
  document.getElementById("testIntro").style.display = "block";
  document.getElementById("progressFill").style.width = "0%";
}

function shareResult() {
  const resultTitle = document.getElementById("resultTitle").textContent;
  const shareText = `나의 직업 적성 테스트 결과는 "${resultTitle}"! 🎯\n\n나도 테스트해보기 👉`;

  if (navigator.share) {
    navigator.share({
      title: "직업 적성 테스트 결과",
      text: shareText,
      url: window.location.href,
    });
  } else {
    navigator.clipboard
      .writeText(shareText + " " + window.location.href)
      .then(() => alert("결과가 클립보드에 복사되었습니다!"))
      .catch(() => alert("공유 기능을 사용할 수 없습니다."));
  }
}

function goHome() {
  window.location.href = "../../index.html";
}
