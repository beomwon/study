class ColorTest {
  constructor() {
    this.currentQuestion = 0;
    this.answers = [];
    this.questions = [
      {
        question: "아침에 일어나서 가장 먼저 보고 싶은 색깔은?",
        options: [
          { text: "따뜻한 주황색 햇살", color: "#FF8C42", type: "warm" },
          { text: "시원한 파란색 하늘", color: "#4A90E2", type: "cool" },
          { text: "싱그러운 초록색 나뭇잎", color: "#7ED321", type: "nature" },
          { text: "부드러운 분홍색 구름", color: "#F5A9B8", type: "soft" },
        ],
      },
      {
        question: "스트레스를 받을 때 마음이 편해지는 색깔은?",
        options: [
          { text: "고요한 남색", color: "#2C3E50", type: "calm" },
          { text: "온화한 베이지", color: "#D4C4A8", type: "neutral" },
          { text: "생기 넘치는 연두색", color: "#9CCC65", type: "nature" },
          { text: "따뜻한 갈색", color: "#8D6E63", type: "warm" },
        ],
      },
      {
        question: "친구들과의 모임에서 입고 싶은 색깔은?",
        options: [
          { text: "화려한 빨간색", color: "#E53E3E", type: "bold" },
          { text: "세련된 검은색", color: "#2D3748", type: "elegant" },
          { text: "밝은 노란색", color: "#FFD700", type: "bright" },
          { text: "은은한 흰색", color: "#F7FAFC", type: "pure" },
        ],
      },
      {
        question: "집에서 가장 좋아하는 공간의 색깔은?",
        options: [
          { text: "아늑한 갈색 톤", color: "#A0522D", type: "cozy" },
          { text: "깔끔한 화이트 톤", color: "#FFFFFF", type: "clean" },
          { text: "모던한 그레이 톤", color: "#718096", type: "modern" },
          { text: "자연스러운 그린 톤", color: "#68D391", type: "natural" },
        ],
      },
      {
        question: "데이트할 때 선택하고 싶은 색깔 조합은?",
        options: [
          { text: "로맨틱한 핑크&화이트", color: "#FBB6CE", type: "romantic" },
          { text: "클래식한 블랙&골드", color: "#2A2A2A", type: "classic" },
          { text: "상큼한 민트&크림", color: "#9AE6B4", type: "fresh" },
          { text: "따뜻한 코랄&베이지", color: "#FF7A59", type: "warm" },
        ],
      },
      {
        question: "가장 집중이 잘 되는 색깔 환경은?",
        options: [
          { text: "차분한 블루 계열", color: "#4299E1", type: "focus" },
          { text: "안정적인 그린 계열", color: "#48BB78", type: "stable" },
          { text: "깔끔한 화이트 계열", color: "#F0F0F0", type: "clear" },
          { text: "따뜻한 우드 계열", color: "#C05621", type: "natural" },
        ],
      },
      {
        question: "힘들 때 위로가 되는 색깔은?",
        options: [
          { text: "포근한 라벤더", color: "#B794F6", type: "comfort" },
          { text: "안정적인 네이비", color: "#2B6CB0", type: "stable" },
          { text: "따뜻한 피치", color: "#FBB6CE", type: "gentle" },
          { text: "자연스러운 올리브", color: "#9CAF88", type: "earth" },
        ],
      },
      {
        question: "새로운 도전을 할 때 떠오르는 색깔은?",
        options: [
          { text: "역동적인 레드", color: "#E53E3E", type: "dynamic" },
          { text: "희망적인 옐로우", color: "#ECC94B", type: "optimistic" },
          {
            text: "신뢰할 수 있는 블루",
            color: "#3182CE",
            type: "trustworthy",
          },
          { text: "균형 잡힌 그린", color: "#38A169", type: "balanced" },
        ],
      },
    ];

    this.results = {
      passionate: {
        title: "열정적인 레드형",
        mainColor: "#E53E3E",
        description:
          "당신은 에너지가 넘치고 열정적인 성격입니다. 리더십이 강하고 도전을 두려워하지 않아요.",
        traits: ["리더십", "열정적", "도전적", "추진력"],
        advice: "때로는 여유를 가지고 주변을 돌아보는 시간도 필요해요.",
      },
      calm: {
        title: "차분한 블루형",
        mainColor: "#4299E1",
        description:
          "당신은 침착하고 신중한 성격입니다. 분석적이며 신뢰할 수 있는 사람이에요.",
        traits: ["침착함", "신중함", "분석적", "신뢰성"],
        advice: "가끔은 직감을 믿고 과감한 결정을 해보세요.",
      },
      nature: {
        title: "자연친화적 그린형",
        mainColor: "#48BB78",
        description:
          "당신은 균형감각이 뛰어나고 평화로운 성격입니다. 조화를 중시하고 안정감을 추구해요.",
        traits: ["균형감각", "평화로움", "안정적", "조화로움"],
        advice: "새로운 변화도 두려워하지 말고 도전해보세요.",
      },
      warm: {
        title: "따뜻한 오렌지형",
        mainColor: "#FF8C42",
        description:
          "당신은 따뜻하고 사교적인 성격입니다. 사람들과의 관계를 중시하고 긍정적이에요.",
        traits: ["사교적", "따뜻함", "긍정적", "친화력"],
        advice: "때로는 혼자만의 시간도 소중히 여기세요.",
      },
      creative: {
        title: "창의적인 퍼플형",
        mainColor: "#B794F6",
        description:
          "당신은 상상력이 풍부하고 독창적인 성격입니다. 예술적 감각이 뛰어나고 감성적이에요.",
        traits: ["창의적", "감성적", "독창적", "예술적"],
        advice: "현실적인 부분도 함께 고려하면 더 좋을 거예요.",
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
          <button class="answer-btn" onclick="colorTest.selectAnswer(${index})">
            <span class="color-preview" style="background-color: ${option.color};"></span>
            ${option.text}
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

    // 가장 많이 선택된 타입 찾기
    let maxCount = 0;
    let resultType = "nature";

    Object.keys(counts).forEach((type) => {
      if (counts[type] > maxCount) {
        maxCount = counts[type];
        resultType = type;
      }
    });

    // 결과 매핑
    const typeMapping = {
      bold: "passionate",
      dynamic: "passionate",
      warm: "warm",
      gentle: "warm",
      cool: "calm",
      calm: "calm",
      focus: "calm",
      stable: "calm",
      trustworthy: "calm",
      nature: "nature",
      natural: "nature",
      balanced: "nature",
      earth: "nature",
      comfort: "creative",
      romantic: "creative",
      soft: "creative",
    };

    return typeMapping[resultType] || "nature";
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
        <div class="color-circle" style="background: linear-gradient(135deg, ${result.mainColor}, ${result.mainColor}88);"></div>
      `;
    }

    if (resultTitle) {
      resultTitle.textContent = result.title;
    }

    if (resultDescription) {
      resultDescription.innerHTML = `
        <p class="result-desc">${result.description}</p>
        <div class="result-traits">
          ${result.traits
            .map((trait) => `<span class="trait-tag">#${trait}</span>`)
            .join("")}
        </div>
        <div class="result-advice">
          <h4>💡 조언</h4>
          <p>${result.advice}</p>
        </div>
      `;
    }
  }

  shareResult() {
    const resultType = this.calculateResult();
    const result = this.results[resultType];
    const shareText = `컬러 심리테스트 결과: ${result.title}\n${result.description}`;

    if (navigator.share) {
      navigator.share({
        title: "컬러 심리테스트 결과",
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

// 추가 스타일 (test-styles.css에 추가적으로 적용)
const additionalStyles = `
    .answer-btn {
        position: relative;
        padding-left: 60px !important;
    }
    
    .color-preview {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 2px solid #fff;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }
    
    .color-circle {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin: 0 auto;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        border: 4px solid #fff;
    }
    
    .result-advice {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 15px;
        margin: 1.5rem 0;
        border-left: 4px solid #ff6b9d;
    }
    
    .result-advice h4 {
        margin: 0 0 0.5rem 0;
        color: #ff6b9d;
        font-size: 1.1rem;
    }
    
    .result-advice p {
        margin: 0;
        color: #666;
        line-height: 1.5;
    }
    
    .trait-tag {
        display: inline-block;
        background: #ff6b9d;
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.85rem;
        margin: 0.2rem;
    }
    
    .result-traits {
        margin: 1rem 0;
    }
`;

// 스타일 추가
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// 테스트 시작
let colorTest;
document.addEventListener("DOMContentLoaded", function () {
  colorTest = new ColorTest();
});

// 전역 함수들
function startTest() {
  if (colorTest) {
    colorTest.startTest();
  }
}

function retryTest() {
  if (colorTest) {
    colorTest.restart();
  }
}

function shareResult() {
  if (colorTest) {
    colorTest.shareResult();
  }
}

function goHome() {
  window.location.href = "../../index.html";
}
