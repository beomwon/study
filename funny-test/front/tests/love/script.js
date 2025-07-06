// 연애 스타일 테스트

const questions = [
  {
    question: "첫 데이트 장소로 어디를 선택하시겠어요?",
    answers: [
      { text: "드라이브하며 야경 보기", type: "romantic", points: 2 },
      { text: "신나는 놀이공원이나 액티비티", type: "active", points: 2 },
      { text: "조용한 카페에서 대화하기", type: "calm", points: 2 },
    ],
  },
  {
    question: "연인에게 애정표현을 어떻게 하시나요?",
    answers: [
      { text: "달콤한 말과 편지, 선물로", type: "romantic", points: 2 },
      { text: "스킨십과 적극적인 표현으로", type: "passionate", points: 2 },
      { text: "세심한 배려와 행동으로", type: "caring", points: 2 },
    ],
  },
  {
    question: "연인과 갈등이 생겼을 때?",
    answers: [
      { text: "즉시 대화로 해결하려 한다", type: "active", points: 2 },
      { text: "시간을 두고 차분히 접근한다", type: "calm", points: 2 },
      { text: "감정적으로 솔직하게 표현한다", type: "passionate", points: 2 },
    ],
  },
  {
    question: "이상적인 연애 관계는?",
    answers: [
      { text: "서로에게 완전히 몰입하는 관계", type: "passionate", points: 2 },
      { text: "각자의 독립성을 존중하는 관계", type: "independent", points: 2 },
      { text: "따뜻하고 안정적인 관계", type: "caring", points: 2 },
    ],
  },
  {
    question: "연인과의 연락 주기는?",
    answers: [
      { text: "하루 종일 수시로 연락한다", type: "passionate", points: 2 },
      { text: "적당한 빈도로 의미 있게", type: "calm", points: 2 },
      {
        text: "만날 때는 진하게, 떨어져 있을 때는 여유롭게",
        type: "independent",
        points: 2,
      },
    ],
  },
  {
    question: "연인의 과거 연애 이야기를 들으면?",
    answers: [
      { text: "질투가 나고 신경이 쓰인다", type: "passionate", points: 2 },
      { text: "그냥 과거일 뿐이라고 생각한다", type: "calm", points: 2 },
      {
        text: "궁금하지만 크게 신경 쓰지 않는다",
        type: "independent",
        points: 2,
      },
    ],
  },
  {
    question: "연인과 함께 보내고 싶은 주말은?",
    answers: [
      { text: "둘만의 로맨틱한 시간", type: "romantic", points: 2 },
      { text: "재미있고 활동적인 데이트", type: "active", points: 2 },
      { text: "집에서 편안하게 쉬기", type: "caring", points: 2 },
    ],
  },
  {
    question: "연인에게 받고 싶은 선물은?",
    answers: [
      {
        text: "마음이 담긴 손편지나 직접 만든 것",
        type: "romantic",
        points: 2,
      },
      { text: "함께 할 수 있는 체험이나 여행", type: "active", points: 2 },
      { text: "실용적이면서 센스 있는 것", type: "practical", points: 2 },
    ],
  },
  {
    question: "연인의 친구들과 만날 때?",
    answers: [
      { text: "적극적으로 어울리려고 노력한다", type: "active", points: 2 },
      { text: "자연스럽게 대화에 참여한다", type: "calm", points: 2 },
      {
        text: "연인과의 시간을 더 중요하게 생각한다",
        type: "passionate",
        points: 2,
      },
    ],
  },
  {
    question: "연애할 때 가장 중요하게 생각하는 것은?",
    answers: [
      { text: "서로에 대한 뜨거운 사랑", type: "passionate", points: 2 },
      { text: "편안하고 자연스러운 관계", type: "calm", points: 2 },
      { text: "서로를 배려하고 아끼는 마음", type: "caring", points: 2 },
    ],
  },
  {
    question: "연인과 헤어진 후에는?",
    answers: [
      { text: "오랫동안 그리워하며 힘들어한다", type: "romantic", points: 2 },
      { text: "시간이 지나면 자연스럽게 받아들인다", type: "calm", points: 2 },
      {
        text: "새로운 시작을 위해 앞으로 나아간다",
        type: "independent",
        points: 2,
      },
    ],
  },
  {
    question: "연인에게 바라는 것은?",
    answers: [
      { text: "나에게만 집중해주기", type: "passionate", points: 2 },
      { text: "서로의 개성을 인정해주기", type: "independent", points: 2 },
      { text: "항상 따뜻하게 대해주기", type: "caring", points: 2 },
    ],
  },
];

let currentQuestionIndex = 0;
let scores = {
  passionate: 0,
  romantic: 0,
  active: 0,
  calm: 0,
  caring: 0,
  independent: 0,
  practical: 0,
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
      <button class="next-btn" onclick="nextQuestion()" style="display: none; background: linear-gradient(45deg, #ffecd2, #fcb69f); color: white; border: none; padding: 12px 24px; border-radius: 25px; font-size: 1rem; font-weight: bold; cursor: pointer;">
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

  const loveTypes = {
    passionate: {
      emoji: "🔥💕",
      title: "열정적인 연애 스타일",
      description: `
        <strong>뜨겁고 진한 사랑을 추구하는 당신!</strong><br><br>
        연애할 때 전부를 걸고 상대방에게 온 마음을 다 바치는 스타일이에요. 
        질투도 많고 독점욕도 강하지만, 그만큼 진심으로 사랑하는 사람입니다. 
        감정 표현이 솔직하고 직접적이어서 상대방이 당신의 마음을 의심할 여지가 없어요!
      `,
    },
    romantic: {
      emoji: "🌹✨",
      title: "로맨틱한 연애 스타일",
      description: `
        <strong>달콤하고 감성적인 로맨스를 꿈꾸는 당신!</strong><br><br>
        영화나 드라마 같은 로맨틱한 순간들을 소중히 여기는 스타일이에요. 
        특별한 날을 기억하고 깜짝 이벤트나 선물로 사랑을 표현하는 것을 좋아합니다. 
        상대방과의 추억 만들기를 중요하게 생각하는 감성적인 연인이에요!
      `,
    },
    active: {
      emoji: "🎢🌟",
      title: "활동적인 연애 스타일",
      description: `
        <strong>함께 무언가를 하며 사랑을 키워가는 당신!</strong><br><br>
        데이트할 때 다양한 활동을 함께 하는 것을 좋아하는 스타일이에요. 
        새로운 곳을 탐험하거나 재미있는 경험을 함께 나누는 것으로 애정을 표현합니다. 
        에너지 넘치는 관계를 만들어가는 활발한 연인이에요!
      `,
    },
    calm: {
      emoji: "🕊️💙",
      title: "차분한 연애 스타일",
      description: `
        <strong>안정적이고 평온한 사랑을 추구하는 당신!</strong><br><br>
        급하지 않게 천천히 깊어지는 관계를 선호하는 스타일이에요. 
        서로를 이해하고 존중하며 편안한 관계를 만들어갑니다. 
        감정의 기복이 적고 일관된 사랑으로 상대방에게 안정감을 주는 연인이에요!
      `,
    },
    caring: {
      emoji: "🤗💖",
      title: "돌봄형 연애 스타일",
      description: `
        <strong>상대방을 아끼고 보살피는 것이 사랑인 당신!</strong><br><br>
        연인의 건강, 기분, 일상을 세심하게 챙기는 스타일이에요. 
        작은 것 하나까지 신경 쓰며 상대방이 편안하고 행복하길 바랍니다. 
        헌신적이고 따뜻한 마음으로 사랑을 실천하는 연인이에요!
      `,
    },
    independent: {
      emoji: "🦋🌙",
      title: "독립적인 연애 스타일",
      description: `
        <strong>서로의 자유와 개성을 존중하는 당신!</strong><br><br>
        연애와 개인의 삶 사이의 균형을 중요하게 생각하는 스타일이에요. 
        과도한 집착이나 의존보다는 건강한 거리감을 유지합니다. 
        성숙하고 이성적인 관계를 추구하는 현명한 연인이에요!
      `,
    },
    practical: {
      emoji: "🎯💼",
      title: "현실적인 연애 스타일",
      description: `
        <strong>실용적이고 합리적인 사랑을 추구하는 당신!</strong><br><br>
        감정도 중요하지만 현실적인 부분도 함께 고려하는 스타일이에요. 
        미래를 함께 계획하고 서로에게 도움이 되는 관계를 만들어갑니다. 
        든든하고 믿을 수 있는 파트너가 되어주는 연인이에요!
      `,
    },
  };

  const result = loveTypes[resultType] || loveTypes.calm;

  // 결과 화면 업데이트
  document.getElementById("resultEmoji").textContent = result.emoji;
  document.getElementById("resultTitle").textContent = result.title;
  document.getElementById("resultDescription").innerHTML = result.description;
}

// 테스트 다시하기
function retryTest() {
  currentQuestionIndex = 0;
  scores = {
    passionate: 0,
    romantic: 0,
    active: 0,
    calm: 0,
    caring: 0,
    independent: 0,
    practical: 0,
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
    passionate: "열정적인",
    romantic: "로맨틱한",
    active: "활동적인",
    calm: "차분한",
    caring: "돌봄형",
    independent: "독립적인",
    practical: "현실적인",
  };

  const shareText = `나의 연애 스타일은 ${typeNames[resultType]} 타입! 💘\n\n연애 스타일 테스트 하러가기 ➡️`;

  if (navigator.share) {
    navigator.share({
      title: "연애 스타일 테스트 결과",
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
