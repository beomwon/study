// 심리 테스트

const questions = [
  {
    question: "길을 걷다가 동전을 발견했습니다. 당신의 첫 생각은?",
    answers: [
      { text: "오늘 좋은 일이 생길 것 같다!", type: "optimistic", points: 2 },
      { text: "누군가 떨어뜨린 건 아닐까?", type: "empathetic", points: 2 },
      { text: "별로 신경 쓰지 않는다", type: "realistic", points: 2 },
    ],
  },
  {
    question: "친구가 갑자기 연락이 뜸해졌습니다. 어떻게 생각하나요?",
    answers: [
      { text: "바쁜 일이 있을 것이다", type: "optimistic", points: 2 },
      { text: "내가 뭔가 잘못했나 걱정된다", type: "anxious", points: 2 },
      {
        text: "시간이 지나면 자연스럽게 연락할 것이다",
        type: "realistic",
        points: 2,
      },
    ],
  },
  {
    question: "새로운 환경에 적응해야 할 때?",
    answers: [
      { text: "설레고 기대된다", type: "adventurous", points: 2 },
      { text: "걱정되지만 차근차근 준비한다", type: "cautious", points: 2 },
      { text: "스트레스를 많이 받는다", type: "anxious", points: 2 },
    ],
  },
  {
    question: "힘든 일이 생겼을 때 주로 어떻게 하나요?",
    answers: [
      { text: "친구나 가족에게 털어놓는다", type: "social", points: 2 },
      { text: "혼자서 해결책을 찾으려 한다", type: "independent", points: 2 },
      { text: "일단 시간이 지나기를 기다린다", type: "passive", points: 2 },
    ],
  },
  {
    question: "꿈에서 날고 있다면 어떤 기분일까요?",
    answers: [
      { text: "자유롭고 행복하다", type: "optimistic", points: 2 },
      { text: "현실 도피를 하고 싶어한다", type: "escapist", points: 2 },
      { text: "높은 곳에서 떨어질까 봐 무섭다", type: "anxious", points: 2 },
    ],
  },
  {
    question: "갑자기 많은 돈이 생긴다면?",
    answers: [
      { text: "여행이나 취미에 쓴다", type: "adventurous", points: 2 },
      { text: "미래를 위해 저축한다", type: "cautious", points: 2 },
      { text: "가족이나 친구들과 나눈다", type: "empathetic", points: 2 },
    ],
  },
  {
    question: "혼자 있는 시간을 어떻게 보내나요?",
    answers: [
      { text: "책을 읽거나 영화를 본다", type: "introspective", points: 2 },
      { text: "새로운 것을 배우거나 만든다", type: "creative", points: 2 },
      { text: "그냥 쉬거나 잠을 잔다", type: "passive", points: 2 },
    ],
  },
  {
    question: "다른 사람의 비밀을 알게 되었을 때?",
    answers: [
      {
        text: "절대 다른 사람에게 말하지 않는다",
        type: "trustworthy",
        points: 2,
      },
      {
        text: "그 사람이 걱정되어 조언하고 싶다",
        type: "empathetic",
        points: 2,
      },
      { text: "모르는 척 하며 거리를 둔다", type: "cautious", points: 2 },
    ],
  },
  {
    question: "실패했을 때 당신의 반응은?",
    answers: [
      { text: "다음에는 더 잘할 수 있을 것이다", type: "resilient", points: 2 },
      { text: "왜 실패했는지 분석해본다", type: "analytical", points: 2 },
      { text: "한동안 의기소침해진다", type: "sensitive", points: 2 },
    ],
  },
  {
    question: "인생에서 가장 중요한 것은?",
    answers: [
      { text: "행복과 만족감", type: "optimistic", points: 2 },
      { text: "의미 있는 관계들", type: "social", points: 2 },
      { text: "개인적 성장과 발전", type: "growth_oriented", points: 2 },
    ],
  },
];

let currentQuestionIndex = 0;
let scores = {
  optimistic: 0,
  anxious: 0,
  empathetic: 0,
  realistic: 0,
  adventurous: 0,
  cautious: 0,
  social: 0,
  independent: 0,
  passive: 0,
  escapist: 0,
  introspective: 0,
  creative: 0,
  trustworthy: 0,
  resilient: 0,
  analytical: 0,
  sensitive: 0,
  growth_oriented: 0,
};
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
      <button class="next-btn" onclick="nextQuestion()" style="display: none; background: linear-gradient(45deg, #43e97b, #38f9d7); color: white; border: none; padding: 12px 24px; border-radius: 25px; font-size: 1rem; font-weight: bold; cursor: pointer;">
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
  scores[answer.type] += answer.points;

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

  // 가장 높은 점수의 타입 찾기
  let maxScore = 0;
  let resultType = "";

  for (let type in scores) {
    if (scores[type] > maxScore) {
      maxScore = scores[type];
      resultType = type;
    }
  }

  const psychologyTypes = {
    optimistic: {
      emoji: "🌟😊",
      title: "긍정적인 마인드",
      description: `
        <strong>밝고 희망적인 에너지를 가진 당신!</strong><br><br>
        어떤 상황에서도 좋은 면을 찾으려 노력하는 긍정적인 성격이에요. 
        주변 사람들에게 활력을 주고, 어려운 상황도 기회로 바꾸는 능력이 있습니다. 
        낙관적인 사고로 인생을 즐겁게 살아가는 당신은 많은 사람들의 롤모델이 될 수 있어요!
      `,
    },
    empathetic: {
      emoji: "💝🤗",
      title: "공감능력이 뛰어난 타입",
      description: `
        <strong>다른 사람의 마음을 잘 이해하는 당신!</strong><br><br>
        타인의 감정을 민감하게 받아들이고 배려심이 깊은 성격이에요. 
        친구들의 고민을 잘 들어주고 적절한 조언을 해주는 능력이 있습니다. 
        따뜻한 마음으로 세상을 더 아름답게 만드는 소중한 사람이에요!
      `,
    },
    adventurous: {
      emoji: "🚀🌍",
      title: "모험을 즐기는 타입",
      description: `
        <strong>새로운 도전을 두려워하지 않는 당신!</strong><br><br>
        변화와 모험을 즐기며 새로운 경험을 추구하는 성격이에요. 
        안전한 것보다는 자극적이고 흥미로운 것을 선호합니다. 
        용기 있는 선택으로 인생을 더욱 풍부하게 만드는 열정적인 사람이에요!
      `,
    },
    analytical: {
      emoji: "🧠🔍",
      title: "분석적인 사고형",
      description: `
        <strong>논리적이고 체계적으로 생각하는 당신!</strong><br><br>
        문제를 깊이 있게 분석하고 합리적인 해결책을 찾는 능력이 뛰어나요. 
        감정보다는 이성적 판단을 중시하며 객관적인 시각을 유지합니다. 
        신중하고 현명한 결정으로 주변 사람들로부터 신뢰받는 사람이에요!
      `,
    },
    creative: {
      emoji: "🎨✨",
      title: "창의적인 예술가 타입",
      description: `
        <strong>독창적이고 상상력이 풍부한 당신!</strong><br><br>
        남들과 다른 독특한 시각으로 세상을 바라보는 성격이에요. 
        예술적 감각이 뛰어나고 새로운 아이디어를 잘 만들어내는 능력이 있습니다. 
        창의적인 에너지로 세상에 특별함을 더하는 매력적인 사람이에요!
      `,
    },
    social: {
      emoji: "👥💕",
      title: "사교적인 리더 타입",
      description: `
        <strong>사람들과 함께할 때 빛나는 당신!</strong><br><br>
        인간관계를 소중히 여기고 팀워크를 중시하는 성격이에요. 
        자연스럽게 사람들을 이끌고 화합을 이루는 능력이 있습니다. 
        따뜻한 리더십으로 많은 사람들에게 사랑받는 인기쟁이예요!
      `,
    },
    introspective: {
      emoji: "🌙📚",
      title: "내면을 탐구하는 사색가",
      description: `
        <strong>깊이 있는 생각을 즐기는 당신!</strong><br><br>
        혼자만의 시간을 소중히 여기고 자신을 성찰하는 시간을 가지는 성격이에요. 
        철학적 사고를 좋아하고 인생의 의미에 대해 깊이 생각합니다. 
        지혜로운 통찰력으로 인생의 본질을 이해하는 현명한 사람이에요!
      `,
    },
    resilient: {
      emoji: "💪🌱",
      title: "회복력이 강한 타입",
      description: `
        <strong>어떤 어려움도 극복해내는 당신!</strong><br><br>
        실패나 좌절을 겪어도 금방 일어나는 강한 정신력을 가진 성격이에요. 
        어려운 상황을 성장의 기회로 바꾸는 놀라운 능력이 있습니다. 
        불굴의 의지로 목표를 향해 나아가는 강인한 사람이에요!
      `,
    },
  };

  // 결과가 없으면 기본값 설정
  const result = psychologyTypes[resultType] || psychologyTypes.optimistic;

  // 결과 화면 업데이트
  document.getElementById("resultEmoji").textContent = result.emoji;
  document.getElementById("resultTitle").textContent = result.title;
  document.getElementById("resultDescription").innerHTML = result.description;
}

// 테스트 다시하기
function retryTest() {
  currentQuestionIndex = 0;
  scores = {
    optimistic: 0,
    anxious: 0,
    empathetic: 0,
    realistic: 0,
    adventurous: 0,
    cautious: 0,
    social: 0,
    independent: 0,
    passive: 0,
    escapist: 0,
    introspective: 0,
    creative: 0,
    trustworthy: 0,
    resilient: 0,
    analytical: 0,
    sensitive: 0,
    growth_oriented: 0,
  };
  selectedAnswer = null;

  document.getElementById("testResult").style.display = "none";
  document.getElementById("testIntro").style.display = "block";
}

// 결과 공유하기
function shareResult() {
  // 가장 높은 점수의 타입 찾기
  let maxScore = 0;
  let resultType = "";

  for (let type in scores) {
    if (scores[type] > maxScore) {
      maxScore = scores[type];
      resultType = type;
    }
  }

  const typeNames = {
    optimistic: "긍정적인 마인드",
    empathetic: "공감능력이 뛰어난",
    adventurous: "모험을 즐기는",
    analytical: "분석적인 사고형",
    creative: "창의적인 예술가",
    social: "사교적인 리더",
    introspective: "내면을 탐구하는 사색가",
    resilient: "회복력이 강한",
  };

  const typeName = typeNames[resultType] || "특별한";
  const shareText = `나의 심리 유형은 ${typeName} 타입! 🔮✨\n\n심리 테스트 하러가기 ➡️`;

  if (navigator.share) {
    navigator.share({
      title: "심리 테스트 결과",
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
