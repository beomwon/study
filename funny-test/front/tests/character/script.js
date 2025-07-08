class CharacterTest {
  constructor() {
    this.currentQuestion = 0;
    this.answers = [];
    this.questions = [
      {
        question: "주말에 가장 하고 싶은 활동은?",
        options: [
          { text: "친구들과 신나게 놀기", emoji: "🎉", type: "social" },
          { text: "조용히 책 읽거나 영화 보기", emoji: "📚", type: "calm" },
          { text: "새로운 취미나 스킬 배우기", emoji: "🎯", type: "ambitious" },
          { text: "자연 속에서 산책하기", emoji: "🌿", type: "peaceful" },
        ],
      },
      {
        question: "갑작스러운 문제가 생겼을 때 당신은?",
        options: [
          { text: "즉시 해결책을 찾아 행동한다", emoji: "⚡", type: "action" },
          {
            text: "신중하게 계획을 세운 후 행동한다",
            emoji: "🤔",
            type: "thoughtful",
          },
          {
            text: "주변 사람들과 상의한다",
            emoji: "💭",
            type: "collaborative",
          },
          {
            text: "일단 마음을 가라앉힌 후 생각한다",
            emoji: "🧘",
            type: "calm",
          },
        ],
      },
      {
        question: "가장 중요하게 생각하는 가치는?",
        options: [
          { text: "자유와 모험", emoji: "🦅", type: "free" },
          { text: "성공과 성취", emoji: "🏆", type: "ambitious" },
          { text: "사랑과 우정", emoji: "💕", type: "loving" },
          { text: "평화와 안정", emoji: "☮️", type: "peaceful" },
        ],
      },
      {
        question: "파티에서 당신의 모습은?",
        options: [
          {
            text: "모든 사람과 대화하며 분위기를 이끈다",
            emoji: "🌟",
            type: "leader",
          },
          {
            text: "몇몇 친한 사람들과 깊은 대화를 나눈다",
            emoji: "💬",
            type: "intimate",
          },
          {
            text: "재미있는 게임이나 활동을 제안한다",
            emoji: "🎲",
            type: "entertainer",
          },
          {
            text: "조용한 곳에서 편안하게 지낸다",
            emoji: "😌",
            type: "observer",
          },
        ],
      },
      {
        question: "꿈에서 가장 자주 나타나는 장면은?",
        options: [
          {
            text: "하늘을 날거나 모험을 떠나는 꿈",
            emoji: "🚀",
            type: "adventurous",
          },
          {
            text: "시험을 보거나 발표하는 꿈",
            emoji: "📊",
            type: "responsible",
          },
          {
            text: "사랑하는 사람들과 함께하는 꿈",
            emoji: "👨‍👩‍👧‍👦",
            type: "family",
          },
          {
            text: "아름다운 자연이나 환상적인 장소",
            emoji: "🌈",
            type: "dreamy",
          },
        ],
      },
      {
        question: "좌우명으로 삼고 싶은 말은?",
        options: [
          {
            text: "포기하지 않으면 언젠가는 이룬다",
            emoji: "💪",
            type: "persistent",
          },
          { text: "지금 이 순간을 즐겨라", emoji: "🎊", type: "present" },
          { text: "다른 사람을 도우며 살자", emoji: "🤝", type: "helper" },
          { text: "나만의 길을 걸어가자", emoji: "🛤️", type: "independent" },
        ],
      },
      {
        question: "스트레스를 받을 때 가장 효과적인 해소법은?",
        options: [
          { text: "운동이나 춤추기", emoji: "💃", type: "active" },
          { text: "음악 듣기나 그림 그리기", emoji: "🎨", type: "artistic" },
          { text: "친구들과 수다 떨기", emoji: "🗣️", type: "social" },
          { text: "혼자만의 시간 갖기", emoji: "🏔️", type: "solitary" },
        ],
      },
      {
        question: "만약 마법의 힘을 가질 수 있다면?",
        options: [
          { text: "시간을 조절하는 능력", emoji: "⏰", type: "control" },
          {
            text: "다른 사람의 마음을 읽는 능력",
            emoji: "🔮",
            type: "empathic",
          },
          { text: "어디든 순간이동하는 능력", emoji: "✨", type: "freedom" },
          { text: "모든 동물과 대화하는 능력", emoji: "🐾", type: "nature" },
        ],
      },
    ];

    this.results = {
      pikachu: {
        character: "피카츄",
        emoji: "⚡",
        title: "에너지 넘치는 친구",
        description:
          "당신은 피카츄처럼 밝고 에너지가 넘치는 성격입니다. 사람들을 즐겁게 만들고, 언제나 긍정적인 에너지로 주변을 밝게 만들어요.",
        traits: ["활발함", "충성심", "순수함", "용기"],
        color: "#FFD700",
      },
      totoro: {
        character: "토토로",
        emoji: "🌳",
        title: "포근한 수호자",
        description:
          "당신은 토토로처럼 따뜻하고 포근한 성격입니다. 다른 사람들을 보살피고 편안함을 주는 존재이며, 자연을 사랑하는 마음이 깊어요.",
        traits: ["포용력", "따뜻함", "자연친화", "평화로움"],
        color: "#8FBC8F",
      },
      elsa: {
        character: "엘사",
        emoji: "❄️",
        title: "독립적인 여왕",
        description:
          "당신은 엘사처럼 강하고 독립적인 성격입니다. 책임감이 강하고 자신만의 길을 걸어가며, 때로는 혼자만의 시간이 필요해요.",
        traits: ["독립성", "책임감", "강인함", "우아함"],
        color: "#87CEEB",
      },
      baymax: {
        character: "베이맥스",
        emoji: "🤗",
        title: "다정한 치유자",
        description:
          "당신은 베이맥스처럼 다정하고 배려심이 깊은 성격입니다. 다른 사람들의 아픔을 함께 느끼고 도움을 주려고 노력하는 따뜻한 마음을 가졌어요.",
        traits: ["배려심", "치유력", "온화함", "헌신"],
        color: "#FFB6C1",
      },
      simba: {
        character: "심바",
        emoji: "🦁",
        title: "용감한 리더",
        description:
          "당신은 심바처럼 용감하고 리더십이 있는 성격입니다. 도전을 두려워하지 않고 자신의 목표를 향해 당당하게 나아가는 모습이 인상적이에요.",
        traits: ["리더십", "용기", "성장", "정의감"],
        color: "#DAA520",
      },
      olaf: {
        character: "올라프",
        emoji: "☃️",
        title: "순수한 낙천가",
        description:
          "당신은 올라프처럼 순수하고 낙천적인 성격입니다. 어떤 상황에서도 긍정적으로 생각하며, 다른 사람들에게 웃음과 희망을 선사해요.",
        traits: ["낙천적", "순수함", "유머", "희망"],
        color: "#87CEFA",
      },
    };
  }

  startTest() {
    document.getElementById("testIntro").style.display = "none";
    document.getElementById("testProgress").style.display = "block";
    this.showQuestion();
  }

  showQuestion() {
    const questionContainer = document.getElementById("questionContainer");
    const currentQ = this.questions[this.currentQuestion];

    // 진행률 업데이트
    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");
    const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;

    if (progressFill) {
      progressFill.style.width = `${progress}%`;
    }
    if (progressText) {
      progressText.textContent = `${this.currentQuestion + 1} / ${
        this.questions.length
      }`;
    }

    // 질문 제목 업데이트
    const questionTitle = document.getElementById("questionTitle");
    if (questionTitle) {
      questionTitle.textContent = currentQ.question;
    }

    // 옵션 컨테이너 업데이트
    const optionsContainer = document.getElementById("optionsContainer");
    if (optionsContainer) {
      optionsContainer.innerHTML = currentQ.options
        .map(
          (option, index) => `
          <button class="answer-btn character-option" onclick="characterTest.selectAnswer(${index})">
            <span class="option-emoji">${option.emoji}</span>
            <span class="option-text">${option.text}</span>
          </button>
        `
        )
        .join("");
    }
  }

  selectAnswer(optionIndex) {
    const selectedOption =
      this.questions[this.currentQuestion].options[optionIndex];
    this.answers.push(selectedOption.type);

    // 선택된 옵션 하이라이트
    const optionBtns = document.querySelectorAll(".answer-btn");
    optionBtns.forEach((btn) => btn.classList.remove("selected"));
    optionBtns[optionIndex].classList.add("selected");

    setTimeout(() => {
      this.currentQuestion++;
      if (this.currentQuestion < this.questions.length) {
        this.showQuestion();
      } else {
        this.showResult();
      }
    }, 300);
  }

  calculateResult() {
    const counts = {};
    this.answers.forEach((answer) => {
      counts[answer] = (counts[answer] || 0) + 1;
    });

    // 성격 유형별 점수 계산
    const scores = {
      pikachu: 0, // 활발하고 에너지 넘치는
      totoro: 0, // 평화롭고 자연친화적인
      elsa: 0, // 독립적이고 강한
      baymax: 0, // 다정하고 배려심 많은
      simba: 0, // 리더십 있고 용감한
      olaf: 0, // 낙천적이고 순수한
    };

    // 답변 유형에 따른 점수 분배
    Object.keys(counts).forEach((type) => {
      const count = counts[type];
      switch (type) {
        case "social":
        case "active":
        case "entertainer":
        case "present":
          scores.pikachu += count;
          scores.olaf += count * 0.7;
          break;
        case "calm":
        case "peaceful":
        case "nature":
        case "solitary":
          scores.totoro += count;
          scores.elsa += count * 0.5;
          break;
        case "independent":
        case "control":
        case "responsible":
          scores.elsa += count;
          scores.simba += count * 0.6;
          break;
        case "helper":
        case "empathic":
        case "collaborative":
        case "family":
          scores.baymax += count;
          scores.totoro += count * 0.7;
          break;
        case "leader":
        case "ambitious":
        case "action":
        case "persistent":
          scores.simba += count;
          scores.pikachu += count * 0.6;
          break;
        case "free":
        case "adventurous":
        case "dreamy":
        case "artistic":
          scores.olaf += count;
          scores.pikachu += count * 0.5;
          break;
      }
    });

    // 가장 높은 점수의 캐릭터 반환
    let maxScore = 0;
    let resultCharacter = "totoro";

    Object.keys(scores).forEach((character) => {
      if (scores[character] > maxScore) {
        maxScore = scores[character];
        resultCharacter = character;
      }
    });

    return resultCharacter;
  }

  showResult() {
    const resultType = this.calculateResult();
    const result = this.results[resultType];

    // 테스트 진행 화면 숨기고 결과 화면 표시
    document.getElementById("testProgress").style.display = "none";
    document.getElementById("testResult").style.display = "block";

    // 결과 업데이트
    const resultEmoji = document.getElementById("resultEmoji");
    const resultTitle = document.getElementById("resultTitle");
    const resultDescription = document.getElementById("resultDescription");

    if (resultEmoji) {
      resultEmoji.innerHTML = `
        <div class="character-display" style="background: linear-gradient(135deg, ${result.color}33, ${result.color}66);">
          <div class="character-emoji">${result.emoji}</div>
        </div>
      `;
    }

    if (resultTitle) {
      resultTitle.innerHTML = `${result.character}<br><small>${result.title}</small>`;
    }

    if (resultDescription) {
      resultDescription.innerHTML = `
        <p class="result-desc">${result.description}</p>
        <div class="result-traits">
          ${result.traits
            .map(
              (trait) =>
                `<span class="trait-tag" style="border-color: ${result.color}; color: ${result.color};">#${trait}</span>`
            )
            .join("")}
        </div>
      `;
    }
  }

  shareResult() {
    const resultType = this.calculateResult();
    const result = this.results[resultType];
    const shareText = `캐릭터 심리테스트 결과: ${result.character} (${result.title})\n${result.description}`;

    if (navigator.share) {
      navigator.share({
        title: "캐릭터 심리테스트 결과",
        text: shareText,
        url: window.location.href,
      });
    } else {
      navigator.clipboard
        .writeText(shareText + "\n" + window.location.href)
        .then(() => alert("결과가 클립보드에 복사되었습니다!"))
        .catch(() => alert("공유하기를 지원하지 않는 브라우저입니다."));
    }
  }

  restart() {
    this.currentQuestion = 0;
    this.answers = [];
    document.getElementById("testIntro").style.display = "block";
    document.getElementById("testProgress").style.display = "none";
    document.getElementById("testResult").style.display = "none";
  }

  goHome() {
    window.location.href = "../../index.html";
  }
}

// 추가 스타일
const additionalStyles = `
    .answer-btn.character-option {
        display: flex;
        align-items: center;
        text-align: left;
        padding: 20px !important;
    }
    
    .option-emoji {
        font-size: 2rem;
        margin-right: 15px;
        min-width: 40px;
    }
    
    .option-text {
        flex: 1;
        font-size: 1rem;
    }
    
    .character-display {
        padding: 1.5rem;
        border-radius: 20px;
        margin: 0 auto;
        max-width: 200px;
        border: 3px solid #fff;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    
    .character-emoji {
        font-size: 3rem;
        text-align: center;
    }
    
    .trait-tag {
        border: 2px solid;
        background: transparent !important;
        font-weight: bold;
        display: inline-block;
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.85rem;
        margin: 0.2rem;
    }
    
    .result-traits {
        margin: 1rem 0;
    }
    
    .result-title small {
        font-size: 0.7em;
        color: #666;
        font-weight: normal;
    }
`;

// 스타일 추가
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// 테스트 시작
let characterTest;
document.addEventListener("DOMContentLoaded", function () {
  characterTest = new CharacterTest();
});

// 전역 함수들
function startTest() {
  if (characterTest) {
    characterTest.startTest();
  }
}

function retryTest() {
  if (characterTest) {
    characterTest.restart();
  }
}

function shareResult() {
  if (characterTest) {
    characterTest.shareResult();
  }
}

function goHome() {
  window.location.href = "../../index.html";
}
