// 캐러셀 관련 변수
let currentSlide = 0;
const totalSlides = 4;

// Supabase 클라이언트 (전역에서 사용하기 위해)
let supabase;

// 캐러셀 기능
function initCarousel() {
  const carousel = document.getElementById("mainCarousel");
  const indicators = document.querySelectorAll(".indicator");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  // 슬라이드 이동 함수
  function moveToSlide(slideIndex) {
    currentSlide = slideIndex;
    const translateX = -slideIndex * (100 / totalSlides);
    carousel.style.transform = `translateX(${translateX}%)`;

    // 인디케이터 업데이트
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === slideIndex);
    });
  }

  // 다음 슬라이드
  function nextSlide() {
    const next = (currentSlide + 1) % totalSlides;
    moveToSlide(next);
  }

  // 이전 슬라이드
  function prevSlide() {
    const prev = (currentSlide - 1 + totalSlides) % totalSlides;
    moveToSlide(prev);
  }

  // 이벤트 리스너
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // 인디케이터 클릭
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => moveToSlide(index));
  });

  // 캐러셀 슬라이드 클릭으로 테스트 시작
  const slides = document.querySelectorAll(".carousel-slide");
  slides.forEach((slide) => {
    slide.addEventListener("click", () => {
      const testType = slide.dataset.test;
      startTest(testType);
    });
  });

  // 자동 슬라이드 (선택사항)
  setInterval(nextSlide, 5000);
}

// 수평 스크롤 기능
function initHorizontalScroll() {
  const testList = document.getElementById("testList");
  const scrollLeftBtn = document.getElementById("scrollLeft");
  const scrollRightBtn = document.getElementById("scrollRight");

  const scrollAmount = 170; // 아이템 너비 + gap

  scrollLeftBtn.addEventListener("click", () => {
    testList.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  scrollRightBtn.addEventListener("click", () => {
    testList.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  // 드래그 스크롤 기능
  let isDown = false;
  let startX;
  let scrollLeft;

  testList.addEventListener("mousedown", (e) => {
    isDown = true;
    testList.style.cursor = "grabbing";
    startX = e.pageX - testList.offsetLeft;
    scrollLeft = testList.scrollLeft;
  });

  testList.addEventListener("mouseleave", () => {
    isDown = false;
    testList.style.cursor = "grab";
  });

  testList.addEventListener("mouseup", () => {
    isDown = false;
    testList.style.cursor = "grab";
  });

  testList.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - testList.offsetLeft;
    const walk = (x - startX) * 2;
    testList.scrollLeft = scrollLeft - walk;
  });

  // 테스트 아이템 클릭
  const testItems = document.querySelectorAll(".test-item");
  testItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      // 드래그 중이면 클릭 이벤트 무시
      if (isDown) return;

      const testType = item.dataset.test;
      startTest(testType);
    });
  });
}

// 테스트 시작 함수
function startTest(testType) {
  const testInfo = {
    mbti: {
      title: "MBTI 성격 테스트",
      description: "16가지 성격 유형 중 당신의 타입을 찾아보세요!",
    },
    psychology: {
      title: "심리 테스트",
      description: "숨겨진 심리 상태를 알아보는 재미있는 테스트입니다!",
    },
    love: {
      title: "연애 스타일 테스트",
      description: "당신의 연애 스타일과 이상형을 알아보세요!",
    },
    job: {
      title: "직업 적성 테스트",
      description: "당신에게 맞는 직업과 진로를 찾아보세요!",
    },
    animal: {
      title: "동물상 테스트",
      description: "당신과 닮은 동물을 찾아보세요!",
    },
    color: {
      title: "컬러 심리 테스트",
      description: "좋아하는 색깔로 알아보는 성격 분석!",
    },
    character: {
      title: "캐릭터 테스트",
      description: "나는 어떤 캐릭터와 닮았을까요?",
    },
    fortune: {
      title: "운세 테스트",
      description: "오늘의 운세를 확인해보세요!",
    },
  };

  const test = testInfo[testType];
  if (test) {
    showModal(test.title, test.description, testType);
  } else {
    alert("준비 중인 테스트입니다!");
  }
}

// 모달 표시 함수
function showModal(title, description, testType) {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn" onclick="closeModal()">&times;</span>
      <h2>${title}</h2>
      <p>${description}</p>
      <div class="modal-buttons">
        <button class="btn-secondary" onclick="closeModal()">취소</button>
        <button class="btn-primary" onclick="redirectToTest('${testType}')">시작하기</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // 모달 스타일 추가
  if (!document.getElementById("modal-styles")) {
    const style = document.createElement("style");
    style.id = "modal-styles";
    style.textContent = `
      .modal {
        display: flex;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.3s ease;
      }
      
      .modal-content {
        background: white;
        padding: 2rem;
        border-radius: 20px;
        text-align: center;
        max-width: 350px;
        width: 90%;
        position: relative;
        animation: slideIn 0.3s ease;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      }
      
      .close-btn {
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 1.5rem;
        cursor: pointer;
        color: #999;
        transition: color 0.3s ease;
      }
      
      .close-btn:hover {
        color: #333;
      }
      
      .modal-content h2 {
        margin-bottom: 1rem;
        color: #333;
        font-size: 1.5rem;
      }
      
      .modal-content p {
        margin-bottom: 2rem;
        color: #666;
        line-height: 1.6;
        font-size: 0.9rem;
      }
      
      .modal-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
      }
      
      .btn-primary, .btn-secondary {
        padding: 12px 20px;
        border: none;
        border-radius: 25px;
        font-size: 0.9rem;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        flex: 1;
      }
      
      .btn-primary {
        background: linear-gradient(45deg, #ff6b9d, #c44569);
        color: white;
        box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3);
      }
      
      .btn-primary:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 20px rgba(255, 107, 157, 0.4);
      }
      
      .btn-secondary {
        background: #f5f5f5;
        color: #333;
        border: 2px solid #ddd;
      }
      
      .btn-secondary:hover {
        background: #e9e9e9;
        transform: scale(1.05);
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(-50px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

// 모달 닫기 함수
function closeModal() {
  const modal = document.querySelector(".modal");
  if (modal) {
    modal.style.animation = "fadeOut 0.3s ease";
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}

// 테스트 페이지로 리다이렉트
function redirectToTest(testType) {
  closeModal();

  setTimeout(() => {
    // 실제 테스트 페이지로 이동
    switch (testType) {
      case "psychology":
        window.location.href = "tests/tetoto/index.html";
        break;
      case "mbti":
        window.location.href = "tests/mbti/index.html";
        break;
      case "love":
        window.location.href = "tests/love/index.html";
        break;
      case "mindtest":
        window.location.href = "tests/mind/index.html";
        break;
      default:
        const testNames = {
          job: "직업 적성 테스트",
          animal: "동물상 테스트",
          color: "컬러 심리 테스트",
          character: "캐릭터 테스트",
          fortune: "운세 테스트",
        };

        alert(
          `${testNames[testType]} 페이지를 준비하고 있습니다!\n곧 다양한 테스트를 만나보실 수 있어요! 😊`
        );
        break;
    }
  }, 300);
}

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", function () {
  // Supabase 클라이언트 초기화
  initSupabase();

  initCarousel();
  initHorizontalScroll();
  initAdBanner();
  initHoroscopeBanner();
  loadTodayTMI();
});

// Supabase 클라이언트 초기화
function initSupabase() {
  try {
    if (!window.SUPABASE_CONFIG) {
      throw new Error("Supabase 설정이 없습니다. config.js를 확인해주세요.");
    }

    supabase = window.supabase.createClient(
      window.SUPABASE_CONFIG.url,
      window.SUPABASE_CONFIG.anonKey
    );
    console.log("Supabase 클라이언트가 초기화되었습니다.");
  } catch (error) {
    console.error("Supabase 초기화 오류:", error);
  }
}

// 오늘의 TMI 로드 (Supabase 직접 접근)
async function loadTodayTMI() {
  try {
    if (!supabase) {
      throw new Error("Supabase 클라이언트가 초기화되지 않았습니다.");
    }

    // 오늘 날짜 구하기 (YYYY-MM-DD 형식)
    const today = new Date().toISOString().split("T")[0];

    // Supabase에서 오늘 날짜의 TMI 데이터 조회
    const { data, error } = await supabase
      .from(window.TMI_TABLE_NAME || "tmi")
      .select("*")
      .eq("date", today)
      .single();

    if (error) {
      throw error;
    }

    if (data) {
      const tmiContent = document.getElementById("tmiContent");
      const tmiDate = document.getElementById("tmiDate");

      // 날짜 포맷팅 (예: 7월 7일)
      const date = new Date(data.date);
      const formattedDate = `${date.getMonth() + 1}월 ${date.getDate()}일`;

      tmiContent.textContent = data.content;
      tmiDate.textContent = formattedDate;
    } else {
      throw new Error("오늘의 TMI 데이터를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("TMI 로딩 오류:", error);
    const tmiContent = document.getElementById("tmiContent");

    // 에러 타입에 따른 메시지 표시
    if (error.message.includes("Supabase") || error.message.includes("설정")) {
      tmiContent.innerHTML =
        '<span class="error">🔧 Supabase 설정을 확인해주세요.</span>';
    } else if (error.message.includes("찾을 수 없습니다")) {
      tmiContent.innerHTML =
        '<span class="error">📅 오늘의 TMI가 준비되지 않았습니다.</span>';
    } else if (error.code === "PGRST116") {
      // 테이블이나 컬럼을 찾을 수 없는 경우
      tmiContent.innerHTML =
        '<span class="error">🗃️ TMI 테이블을 확인해주세요.</span>';
    } else {
      tmiContent.innerHTML =
        '<span class="error">🤔 TMI를 불러오는데 실패했습니다.</span>';
    }
  }
}

// 별자리 운세 배너 초기화
function initHoroscopeBanner() {
  const horoscopeBtn = document.getElementById("horoscopeBtn");
  if (horoscopeBtn) {
    horoscopeBtn.addEventListener("click", () => {
      window.location.href = "horoscope.html";
    });
  }
}

// 광고 배너 초기화
function initAdBanner() {
  const adButton = document.querySelector(".ad-button");
  if (adButton) {
    adButton.addEventListener("click", () => {
      // 광고 클릭 시 동작 (실제 광고 링크나 액션으로 대체)
      alert(
        "광고 페이지로 이동합니다! 🎁\n(실제로는 광고주 페이지로 연결됩니다)"
      );

      // 실제 사용 시에는 아래와 같이 사용:
      // window.open('https://광고주사이트.com', '_blank');
    });
  }
}

// ESC 키로 모달 닫기
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

// 클릭 외부 영역으로 모달 닫기
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("modal")) {
    closeModal();
  }
});
