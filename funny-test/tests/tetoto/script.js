// 테토녀 vs 에겐녀 테스트

const questions = [
  {
    question: "친구들과 함께 있을 때 당신은?",
    answers: [
      { text: "모든 사람과 활발하게 대화한다", type: "tetoto", points: 2 },
      { text: "친한 몇 명과만 깊은 대화를 나눈다", type: "egen", points: 2 },
      { text: "상황에 따라 다르다", type: "neutral", points: 0 },
    ],
  },
  {
    question: "연인과 데이트할 때 선호하는 스타일은?",
    answers: [
      { text: "놀이공원, 카페 등 활기찬 곳", type: "tetoto", points: 2 },
      { text: "조용한 미술관, 도서관, 산책로", type: "egen", points: 2 },
      { text: "집에서 영화보기", type: "neutral", points: 0 },
    ],
  },
  {
    question: "SNS 사용 패턴은?",
    answers: [
      {
        text: "일상을 자주 올리고 댓글도 많이 단다",
        type: "tetoto",
        points: 2,
      },
      { text: "가끔 의미있는 게시물만 올린다", type: "egen", points: 2 },
      { text: "주로 보기만 한다", type: "neutral", points: 0 },
    ],
  },
  {
    question: "스트레스를 받았을 때?",
    answers: [
      { text: "친구들과 만나서 수다를 떤다", type: "tetoto", points: 2 },
      { text: "혼자만의 시간을 갖는다", type: "egen", points: 2 },
      { text: "잠을 잔다", type: "neutral", points: 0 },
    ],
  },
  {
    question: "좋아하는 패션 스타일은?",
    answers: [
      { text: "귀엽고 발랄한 스타일", type: "tetoto", points: 2 },
      { text: "시크하고 세련된 스타일", type: "egen", points: 2 },
      { text: "편안하고 캐주얼한 스타일", type: "neutral", points: 0 },
    ],
  },
  {
    question: "연인에게 애정표현을 할 때?",
    answers: [
      { text: "스킨십과 애교로 표현한다", type: "tetoto", points: 2 },
      { text: "진심어린 대화와 행동으로 보여준다", type: "egen", points: 2 },
      { text: "특별한 날에만 표현한다", type: "neutral", points: 0 },
    ],
  },
  {
    question: "새로운 사람들과의 만남에서?",
    answers: [
      { text: "먼저 다가가서 친해지려고 노력한다", type: "tetoto", points: 2 },
      { text: "상대방이 다가올 때까지 기다린다", type: "egen", points: 2 },
      { text: "상황에 따라 다르다", type: "neutral", points: 0 },
    ],
  },
  {
    question: "갈등이 생겼을 때 해결 방식은?",
    answers: [
      { text: "즉시 대화를 통해 해결하려 한다", type: "tetoto", points: 2 },
      { text: "시간을 두고 천천히 해결한다", type: "egen", points: 2 },
      { text: "웬만하면 피하려고 한다", type: "neutral", points: 0 },
    ],
  },
  {
    question: "이상적인 주말 보내기는?",
    answers: [
      { text: "친구들과 시끌벅적하게 놀기", type: "tetoto", points: 2 },
      { text: "혼자서 취미생활 즐기기", type: "egen", points: 2 },
      { text: "집에서 휴식하기", type: "neutral", points: 0 },
    ],
  },
  {
    question: "연인과의 연락 주기는?",
    answers: [
      { text: "수시로 안부와 일상을 공유한다", type: "tetoto", points: 2 },
      { text: "의미있는 내용 위주로 연락한다", type: "egen", points: 2 },
      { text: "필요할 때만 연락한다", type: "neutral", points: 0 },
    ],
  },
  {
    question: "파티나 모임에서 당신의 모습은?",
    answers: [
      { text: "분위기 메이커 역할을 한다", type: "tetoto", points: 2 },
      { text: "조용히 관찰하며 즐긴다", type: "egen", points: 2 },
      { text: "적당히 참여한다", type: "neutral", points: 0 },
    ],
  },
  {
    question: "선물을 받을 때 반응은?",
    answers: [
      {
        text: "크게 기뻐하며 바로 고마움을 표현한다",
        type: "tetoto",
        points: 2,
      },
      {
        text: "진심으로 감사하지만 차분하게 표현한다",
        type: "egen",
        points: 2,
      },
      { text: "고맙다고 말한다", type: "neutral", points: 0 },
    ],
  },
];

let currentQuestionIndex = 0;
let tetotoScore = 0;
let egenScore = 0;
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
      <button class="next-btn" onclick="nextQuestion()" style="display: none; background: linear-gradient(45deg, #ff6b9d, #667eea); color: white; border: none; padding: 12px 24px; border-radius: 25px; font-size: 1rem; font-weight: bold; cursor: pointer;">
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
  if (answer.type === "tetoto") {
    tetotoScore += answer.points;
  } else if (answer.type === "egen") {
    egenScore += answer.points;
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

  // 총점 계산
  const totalScore = tetotoScore + egenScore;
  const tetotoPercent =
    totalScore > 0 ? Math.round((tetotoScore / totalScore) * 100) : 50;
  const egenPercent = 100 - tetotoPercent;

  // 결과 판정
  let resultType, resultEmoji, resultTitle, resultDescription;

  if (tetotoPercent > 60) {
    resultType = "tetoto";
    resultEmoji = "🐱💕";
    resultTitle = "당신은 테토녀입니다!";
    resultDescription = `
      <strong>귀엽고 애교 많은 테토녀!</strong><br><br>
      당신은 활발하고 사교적인 성격으로, 사람들과 함께 있을 때 더욱 빛이 나는 타입이에요. 
      솔직하고 직설적인 표현을 좋아하며, 연인에게도 애정을 아낌없이 표현하는 스타일입니다. 
      밝고 긍정적인 에너지로 주변 사람들에게 활력을 주는 매력적인 사람이에요!
    `;
  } else if (egenPercent > 60) {
    resultType = "egen";
    resultEmoji = "🦋✨";
    resultTitle = "당신은 에겐녀입니다!";
    resultDescription = `
      <strong>신비롭고 독립적인 에겐녀!</strong><br><br>
      당신은 차분하고 사려깊은 성격으로, 깊이 있는 관계를 중시하는 타입이에요. 
      내면의 세계가 풍부하며, 독립적이면서도 진정성 있는 관계를 추구합니다. 
      신비로운 매력과 우아함으로 사람들의 마음을 사로잡는 특별한 사람이에요!
    `;
  } else {
    resultType = "balanced";
    resultEmoji = "🌸🌙";
    resultTitle = "당신은 밸런스형입니다!";
    resultDescription = `
      <strong>테토녀와 에겐녀의 조화로운 밸런스!</strong><br><br>
      당신은 상황에 따라 유연하게 대처할 수 있는 균형잡힌 성격이에요. 
      때로는 활발하고 사교적이며, 때로는 조용하고 사려깊은 모습을 보입니다. 
      다양한 매력을 가진 당신은 어떤 상황에서도 자신만의 색깔을 발휘할 수 있는 특별한 사람이에요!
    `;
  }

  // 결과 화면 업데이트
  document.getElementById("resultEmoji").textContent = resultEmoji;
  document.getElementById("resultTitle").textContent = resultTitle;
  document.getElementById("resultDescription").innerHTML = resultDescription;

  // 퍼센트 바 애니메이션
  setTimeout(() => {
    document.getElementById("tetotoBar").style.width = `${tetotoPercent}%`;
    document.getElementById("egenBar").style.width = `${egenPercent}%`;
    document.getElementById("tetotoPercent").textContent = `${tetotoPercent}%`;
    document.getElementById("egenPercent").textContent = `${egenPercent}%`;
  }, 500);
}

// 테스트 다시하기
function retryTest() {
  currentQuestionIndex = 0;
  tetotoScore = 0;
  egenScore = 0;
  selectedAnswer = null;

  document.getElementById("testResult").style.display = "none";
  document.getElementById("testIntro").style.display = "block";
}

// 결과 공유하기
function shareResult() {
  const totalScore = tetotoScore + egenScore;
  const tetotoPercent =
    totalScore > 0 ? Math.round((tetotoScore / totalScore) * 100) : 50;
  const egenPercent = 100 - tetotoPercent;

  let shareText;
  if (tetotoPercent > 60) {
    shareText = `나는 테토녀 ${tetotoPercent}%! 귀엽고 애교 많은 스타일 🐱💕`;
  } else if (egenPercent > 60) {
    shareText = `나는 에겐녀 ${egenPercent}%! 신비롭고 독립적인 스타일 🦋✨`;
  } else {
    shareText = `나는 테토녀 ${tetotoPercent}%, 에겐녀 ${egenPercent}%의 밸런스형! 🌸🌙`;
  }

  shareText += "\n\n테토녀 vs 에겐녀 테스트 하러가기 ➡️";

  if (navigator.share) {
    navigator.share({
      title: "테토녀 vs 에겐녀 테스트 결과",
      text: shareText,
      url: window.location.href,
    });
  } else {
    // 클립보드에 복사
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
