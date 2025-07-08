// 동물상 테스트 JavaScript

let currentQuestion = 0;
let answers = [];
const totalQuestions = 12;

// 테스트 질문들
const questions = [
  {
    question: "친구들과 처음 만나는 자리에서 당신의 모습은?",
    answers: [
      { text: "조용히 관찰하며 상황을 파악한다", type: "cat" },
      { text: "먼저 다가가서 인사하고 분위기를 띄운다", type: "dog" },
      { text: "자연스럽게 대화에 참여한다", type: "rabbit" },
      { text: "리더십을 발휘해서 자리를 이끈다", type: "lion" },
    ],
  },
  {
    question: "스트레스를 받을 때 당신의 대처법은?",
    answers: [
      { text: "혼자만의 시간을 가지며 차분히 정리한다", type: "cat" },
      { text: "친구들과 만나서 이야기하며 푼다", type: "dog" },
      { text: "좋아하는 취미나 운동으로 전환한다", type: "rabbit" },
      { text: "문제를 직접 해결하기 위해 행동한다", type: "lion" },
    ],
  },
  {
    question: "당신의 이상적인 주말 보내기는?",
    answers: [
      { text: "집에서 책을 읽거나 영화를 보며 휴식", type: "cat" },
      { text: "친구들과 함께 놀러가거나 파티", type: "dog" },
      { text: "가벼운 산책이나 카페에서 여유로운 시간", type: "rabbit" },
      { text: "새로운 활동이나 모험을 계획하고 실행", type: "lion" },
    ],
  },
  {
    question: "갈등 상황에서 당신의 태도는?",
    answers: [
      { text: "직접적인 충돌을 피하고 거리를 둔다", type: "cat" },
      { text: "중재하려고 노력하며 화해를 시도한다", type: "dog" },
      { text: "상황을 차분히 지켜보며 신중하게 대응", type: "rabbit" },
      { text: "문제의 핵심을 파악해서 해결책을 제시", type: "lion" },
    ],
  },
  {
    question: "새로운 환경에 적응하는 방식은?",
    answers: [
      { text: "천천히 시간을 들여 적응한다", type: "cat" },
      { text: "적극적으로 새로운 사람들과 친해진다", type: "dog" },
      { text: "자연스럽게 흘러가는 대로 적응한다", type: "rabbit" },
      { text: "빠르게 상황을 파악하고 주도권을 잡는다", type: "lion" },
    ],
  },
  {
    question: "친구가 고민 상담을 요청했을 때?",
    answers: [
      { text: "조용히 들어주고 필요할 때만 조언한다", type: "cat" },
      { text: "공감해주고 함께 해결방법을 찾는다", type: "dog" },
      { text: "따뜻하게 위로하고 격려해준다", type: "rabbit" },
      { text: "명확한 해결책과 조언을 제시한다", type: "lion" },
    ],
  },
  {
    question: "당신의 의사결정 스타일은?",
    answers: [
      { text: "충분히 고민한 후 신중하게 결정", type: "cat" },
      { text: "주변 사람들과 상의한 후 결정", type: "dog" },
      { text: "직감에 따라 자연스럽게 결정", type: "rabbit" },
      { text: "빠르고 확실하게 결정", type: "lion" },
    ],
  },
  {
    question: "팀 프로젝트에서 선호하는 역할은?",
    answers: [
      { text: "혼자서 집중해서 완성도를 높이는 역할", type: "cat" },
      { text: "팀원들과 소통하며 분위기를 조율하는 역할", type: "dog" },
      { text: "창의적인 아이디어를 제공하는 역할", type: "rabbit" },
      { text: "프로젝트를 이끌고 방향을 제시하는 역할", type: "lion" },
    ],
  },
  {
    question: "사람들이 당신을 어떻게 볼 것 같나요?",
    answers: [
      { text: "신비롭고 독립적인 사람", type: "cat" },
      { text: "따뜻하고 믿음직한 사람", type: "dog" },
      { text: "순수하고 친근한 사람", type: "rabbit" },
      { text: "카리스마 있고 당당한 사람", type: "lion" },
    ],
  },
  {
    question: "당신이 가장 중요하게 생각하는 가치는?",
    answers: [
      { text: "자유와 독립성", type: "cat" },
      { text: "사랑과 우정", type: "dog" },
      { text: "평화와 조화", type: "rabbit" },
      { text: "성취와 성공", type: "lion" },
    ],
  },
  {
    question: "어려운 일에 직면했을 때?",
    answers: [
      { text: "혼자서 조용히 해결책을 모색한다", type: "cat" },
      { text: "주변 사람들에게 도움을 요청한다", type: "dog" },
      { text: "긍정적으로 생각하며 차근차근 해결한다", type: "rabbit" },
      { text: "정면돌파로 적극적으로 해결한다", type: "lion" },
    ],
  },
  {
    question: "당신의 매력 포인트는?",
    answers: [
      { text: "신비로운 분위기와 독특한 개성", type: "cat" },
      { text: "따뜻한 마음과 충실함", type: "dog" },
      { text: "순수함과 귀여운 매력", type: "rabbit" },
      { text: "강한 존재감과 리더십", type: "lion" },
    ],
  },
];

// 동물상 결과
const animalResults = {
  cat: {
    emoji: "🐱",
    title: "고양이상",
    personality: "신비로운 독립형",
    description:
      "자유롭고 독립적인 성격의 소유자입니다. 자신만의 공간과 시간을 소중히 여기며, 깊이 있는 사고력을 가지고 있어요. 겉으로는 차가워 보일 수 있지만, 내면은 따뜻하고 섬세한 감정의 소유자입니다.",
    traits: ["독립적", "신비로움", "섬세함", "자유로움", "직관적"],
    compatibility:
      "강아지상과는 서로 다른 매력으로 좋은 케미를, 사자상과는 서로 존중하는 관계를 만들 수 있어요.",
  },
  dog: {
    emoji: "🐶",
    title: "강아지상",
    personality: "충실한 사교형",
    description:
      "따뜻하고 사교적인 성격으로 많은 사람들에게 사랑받는 타입입니다. 충성심이 강하고 감정표현이 솔직해서 함께 있으면 편안함을 느끼게 해주는 매력을 가지고 있어요.",
    traits: ["충실함", "사교적", "따뜻함", "감정표현", "협력적"],
    compatibility:
      "토끼상과는 서로 보완하며, 고양이상과는 다른 매력으로 끌리는 관계를 만들 수 있어요.",
  },
  rabbit: {
    emoji: "🐰",
    title: "토끼상",
    personality: "순수한 평화형",
    description:
      "순수하고 평화로운 성격의 소유자입니다. 갈등을 싫어하고 조화로운 분위기를 만드는 데 탁월한 능력을 가지고 있어요. 귀엽고 사랑스러운 매력으로 사람들의 마음을 사로잡습니다.",
    traits: ["순수함", "평화로움", "귀여움", "온화함", "친근함"],
    compatibility:
      "강아지상과는 서로를 이해하며, 고양이상과는 조용한 매력으로 좋은 관계를 만들 수 있어요.",
  },
  lion: {
    emoji: "🦁",
    title: "사자상",
    personality: "당당한 리더형",
    description:
      "강한 카리스마와 리더십을 가진 타입입니다. 자신감이 넘치고 목표 의식이 뚜렷하며, 어려운 상황에서도 굴복하지 않는 강인함을 가지고 있어요. 자연스럽게 사람들의 관심을 끌고 존경받는 매력을 가지고 있습니다.",
    traits: ["카리스마", "리더십", "자신감", "강인함", "당당함"],
    compatibility:
      "고양이상과는 서로 존중하며, 토끼상과는 보호본능으로 좋은 관계를 만들 수 있어요.",
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
  const result = animalResults[resultType];

  // 결과 표시
  document.getElementById("resultEmoji").textContent = result.emoji;
  document.getElementById("resultTitle").textContent = result.title;

  const description = `
    <h3>${result.personality}</h3>
    <p>${result.description}</p>
    <h3>성격 특징</h3>
    <p><strong>${result.traits.join(" • ")}</strong></p>
    <h3>궁합</h3>
    <p>${result.compatibility}</p>
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
  const shareText = `나의 동물상 테스트 결과는 "${resultTitle}"! 🐾\n\n나도 테스트해보기 👉`;

  if (navigator.share) {
    navigator.share({
      title: "동물상 테스트 결과",
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
