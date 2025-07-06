// MBTI 성격 테스트

const questions = [
  {
    question: "새로운 사람들과 만날 때 당신은?",
    answers: [
      { text: "먼저 다가가서 대화를 시작한다", type: "E", points: 2 },
      { text: "상대방이 먼저 말을 걸기를 기다린다", type: "I", points: 2 },
      { text: "상황에 따라 다르다", type: "neutral", points: 0 },
    ],
  },
  {
    question: "정보를 받아들일 때 당신은?",
    answers: [
      {
        text: "구체적인 사실과 세부사항을 중요하게 본다",
        type: "S",
        points: 2,
      },
      { text: "전체적인 그림과 가능성을 본다", type: "N", points: 2 },
      { text: "둘 다 중요하다", type: "neutral", points: 0 },
    ],
  },
  {
    question: "결정을 내릴 때 당신은?",
    answers: [
      { text: "논리적이고 객관적으로 판단한다", type: "T", points: 2 },
      { text: "감정과 가치관을 고려한다", type: "F", points: 2 },
      { text: "상황에 따라 다르게 한다", type: "neutral", points: 0 },
    ],
  },
  {
    question: "일상생활에서 당신은?",
    answers: [
      { text: "계획을 세우고 그대로 실행한다", type: "J", points: 2 },
      { text: "유연하게 상황에 맞춰 행동한다", type: "P", points: 2 },
      { text: "계획도 세우지만 유연성도 중요하다", type: "neutral", points: 0 },
    ],
  },
  {
    question: "에너지를 얻는 방법은?",
    answers: [
      { text: "사람들과 함께 있을 때", type: "E", points: 2 },
      { text: "혼자만의 시간을 가질 때", type: "I", points: 2 },
      { text: "둘 다 필요하다", type: "neutral", points: 0 },
    ],
  },
  {
    question: "문제를 해결할 때?",
    answers: [
      { text: "과거 경험을 바탕으로 해결한다", type: "S", points: 2 },
      { text: "새로운 방법을 시도해본다", type: "N", points: 2 },
      { text: "상황에 따라 다르다", type: "neutral", points: 0 },
    ],
  },
  {
    question: "갈등 상황에서 당신은?",
    answers: [
      { text: "객관적 사실을 바탕으로 해결한다", type: "T", points: 2 },
      { text: "상대방의 감정을 고려해서 해결한다", type: "F", points: 2 },
      { text: "둘 다 고려한다", type: "neutral", points: 0 },
    ],
  },
  {
    question: "여행을 갈 때?",
    answers: [
      { text: "상세한 계획을 세운다", type: "J", points: 2 },
      { text: "즉흥적으로 결정한다", type: "P", points: 2 },
      { text: "기본 계획만 세운다", type: "neutral", points: 0 },
    ],
  },
  {
    question: "파티에서 당신은?",
    answers: [
      { text: "많은 사람들과 대화를 나눈다", type: "E", points: 2 },
      { text: "친한 몇 명과만 깊게 대화한다", type: "I", points: 2 },
      { text: "기분에 따라 다르다", type: "neutral", points: 0 },
    ],
  },
  {
    question: "새로운 아이디어를 생각할 때?",
    answers: [
      { text: "실현 가능성을 먼저 고려한다", type: "S", points: 2 },
      { text: "창의적이고 혁신적인 것을 추구한다", type: "N", points: 2 },
      { text: "둘 다 중요하다", type: "neutral", points: 0 },
    ],
  },
  {
    question: "비판을 받았을 때?",
    answers: [
      { text: "냉정하게 분석해서 개선한다", type: "T", points: 2 },
      { text: "감정적으로 상처받는다", type: "F", points: 2 },
      { text: "상황에 따라 다르다", type: "neutral", points: 0 },
    ],
  },
  {
    question: "마감일이 있는 일을 할 때?",
    answers: [
      { text: "미리미리 계획적으로 진행한다", type: "J", points: 2 },
      { text: "마감일 직전에 집중해서 한다", type: "P", points: 2 },
      { text: "상황에 따라 다르다", type: "neutral", points: 0 },
    ],
  },
];

let currentQuestionIndex = 0;
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
let selectedAnswer = null;

// 테스트 시작
function startTest() {
  document.getElementById("testIntro").style.display = "none";
  document.getElementById("testProgress").style.display = "block";
  showQuestion();
}

// 질문 표시
function showQuestion() {
  const question = questions[currentQuestionIndex];
  const questionContainer = document.getElementById("questionContainer");

  // 진행률 업데이트
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  document.getElementById("progressFill").style.width = `${progress}%`;
  document.getElementById("currentQuestion").textContent =
    currentQuestionIndex + 1;
  document.getElementById("totalQuestions").textContent = questions.length;

  // 질문 HTML 생성
  questionContainer.innerHTML = `
    <div class="question-text">${question.question}</div>
    <div class="answer-options">
      ${question.answers
        .map(
          (answer, index) => `
        <button class="answer-btn" onclick="selectAnswer(${index})">
          ${answer.text}
        </button>
      `
        )
        .join("")}
    </div>
    <div style="text-align: center; margin-top: 2rem;">
      <button class="next-btn" onclick="nextQuestion()" style="display: none; background: linear-gradient(45deg, #4facfe, #00f2fe); color: white; border: none; padding: 12px 24px; border-radius: 25px; font-size: 1rem; font-weight: bold; cursor: pointer;">
        ${
          currentQuestionIndex === questions.length - 1
            ? "결과 보기"
            : "다음 질문"
        }
      </button>
    </div>
  `;
}

// 답변 선택
function selectAnswer(answerIndex) {
  selectedAnswer = answerIndex;

  // 모든 버튼에서 선택 상태 제거
  const answerBtns = document.querySelectorAll(".answer-btn");
  answerBtns.forEach((btn) => btn.classList.remove("selected"));

  // 선택된 버튼에 선택 상태 추가
  answerBtns[answerIndex].classList.add("selected");

  // 다음 버튼 표시
  document.querySelector(".next-btn").style.display = "inline-block";
}

// 다음 질문
function nextQuestion() {
  if (selectedAnswer === null) return;

  // 점수 계산
  const answer = questions[currentQuestionIndex].answers[selectedAnswer];
  if (answer.type !== "neutral") {
    scores[answer.type] += answer.points;
  }

  // 다음 질문으로 이동
  currentQuestionIndex++;
  selectedAnswer = null;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// 결과 표시
function showResult() {
  document.getElementById("testProgress").style.display = "none";
  document.getElementById("testResult").style.display = "block";

  // MBTI 유형 결정
  const mbtiType =
    (scores.E > scores.I ? "E" : "I") +
    (scores.S > scores.N ? "S" : "N") +
    (scores.T > scores.F ? "T" : "F") +
    (scores.J > scores.P ? "J" : "P");

  const mbtiInfo = {
    ESTJ: {
      emoji: "👔",
      title: "ESTJ - 엄격한 관리자",
      desc: "체계적이고 실용적인 리더십을 발휘하는 당신!",
    },
    ESTP: {
      emoji: "🎪",
      title: "ESTP - 모험을 즐기는 사업가",
      desc: "활동적이고 융통성 있는 현실주의자!",
    },
    ESFJ: {
      emoji: "🤗",
      title: "ESFJ - 사교적인 외교관",
      desc: "따뜻하고 배려심 많은 협력자!",
    },
    ESFP: {
      emoji: "🎨",
      title: "ESFP - 자유로운 영혼의 연예인",
      desc: "spontaneous하고 열정적인 엔터테이너!",
    },
    ENTJ: {
      emoji: "👑",
      title: "ENTJ - 대담한 통솔자",
      desc: "강력한 리더십과 전략적 사고를 가진 지휘관!",
    },
    ENTP: {
      emoji: "💡",
      title: "ENTP - 뜨거운 논쟁을 즐기는 변론가",
      desc: "창의적이고 혁신적인 발명가!",
    },
    ENFJ: {
      emoji: "🌟",
      title: "ENFJ - 정의로운 사회운동가",
      desc: "카리스마 있고 영감을 주는 지도자!",
    },
    ENFP: {
      emoji: "🌈",
      title: "ENFP - 재기발랄한 활동가",
      desc: "열정적이고 창의적인 자유로운 영혼!",
    },
    ISTJ: {
      emoji: "📋",
      title: "ISTJ - 청렴결백한 논리주의자",
      desc: "신뢰할 수 있고 책임감 강한 현실주의자!",
    },
    ISTP: {
      emoji: "🔧",
      title: "ISTP - 만능 재주꾼",
      desc: "실용적이고 사실적인 문제 해결사!",
    },
    ISFJ: {
      emoji: "🛡️",
      title: "ISFJ - 용감한 수호자",
      desc: "헌신적이고 따뜻한 보호자!",
    },
    ISFP: {
      emoji: "🎭",
      title: "ISFP - 호기심 많은 예술가",
      desc: "유연하고 매력적인 예술가!",
    },
    INTJ: {
      emoji: "🧙",
      title: "INTJ - 용의주도한 전략가",
      desc: "독립적이고 전략적인 혁신가!",
    },
    INTP: {
      emoji: "🔬",
      title: "INTP - 논리적인 사색가",
      desc: "혁신적이고 객관적인 사색가!",
    },
    INFJ: {
      emoji: "🔮",
      title: "INFJ - 선의의 옹호자",
      desc: "창의적이고 통찰력 있는 영감을 주는 이상주의자!",
    },
    INFP: {
      emoji: "🦋",
      title: "INFP - 열정적인 중재자",
      desc: "이상주의적이고 충성스러운 꿈꾸는 자!",
    },
  };

  const result = mbtiInfo[mbtiType] || {
    emoji: "🤔",
    title: "균형잡힌 성격",
    desc: "다양한 성향을 고루 가진 특별한 당신!",
  };

  // 결과 화면 업데이트
  document.getElementById("resultEmoji").textContent = result.emoji;
  document.getElementById("resultTitle").textContent = result.title;
  document.getElementById("resultDescription").innerHTML = `
    <strong>${result.desc}</strong><br><br>
    당신의 MBTI 유형은 <strong>${mbtiType}</strong>입니다!<br>
    이 유형은 전 세계 인구의 일정 비율을 차지하는 특별한 성격 유형이에요.
  `;
}

// 테스트 다시하기
function retryTest() {
  currentQuestionIndex = 0;
  scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  selectedAnswer = null;

  document.getElementById("testResult").style.display = "none";
  document.getElementById("testIntro").style.display = "block";
}

// 결과 공유하기
function shareResult() {
  const mbtiType =
    (scores.E > scores.I ? "E" : "I") +
    (scores.S > scores.N ? "S" : "N") +
    (scores.T > scores.F ? "T" : "F") +
    (scores.J > scores.P ? "J" : "P");

  const shareText = `나의 MBTI 성격 유형은 ${mbtiType}! 🧠✨\n\nMBTI 테스트 하러가기 ➡️`;

  if (navigator.share) {
    navigator.share({
      title: "MBTI 성격 테스트 결과",
      text: shareText,
      url: window.location.href,
    });
  } else {
    navigator.clipboard
      .writeText(shareText + " " + window.location.href)
      .then(() => {
        alert("결과가 클립보드에 복사되었습니다! 친구들에게 공유해보세요 😊");
      })
      .catch(() => {
        alert("공유 기능을 지원하지 않는 브라우저입니다.");
      });
  }
}
