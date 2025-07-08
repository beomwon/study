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

  // 이벤트 리스너 (버튼 우선순위를 높이기 위해)
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    nextSlide();
  });
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    prevSlide();
  });

  // 인디케이터 클릭
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => moveToSlide(index));
  });

  // 캐러셀 슬라이드 클릭으로 테스트 시작
  const slides = document.querySelectorAll(".carousel-slide");
  slides.forEach((slide) => {
    slide.addEventListener("click", (e) => {
      // 네비게이션 버튼이나 인디케이터 클릭 시에는 테스트를 시작하지 않음
      if (
        e.target.closest(".nav-btn") ||
        e.target.closest(".carousel-nav") ||
        e.target.closest(".indicator")
      ) {
        return;
      }

      const testType = slide.dataset.test;
      redirectToTestDirect(testType);
    });
  });

  // 자동 슬라이드 (페이지 로딩 후 충분한 시간 후에 시작)
  setTimeout(() => {
    setInterval(nextSlide, 5000);
  }, 3000); // 3초 후에 자동 슬라이드 시작
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
      redirectToTestDirect(testType);
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
      description: "색깔 선택을 통해 당신의 숨겨진 성격을 알아보세요!",
    },
    character: {
      title: "캐릭터 심리 테스트",
      description: "당신과 가장 닮은 캐릭터를 찾아보세요!",
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
      case "job":
        window.location.href = "tests/job/index.html";
        break;
      case "animal":
        window.location.href = "tests/animal/index.html";
        break;
      case "color":
        window.location.href = "tests/color/index.html";
        break;
      case "character":
        window.location.href = "tests/character/index.html";
        break;
      case "fortune":
        window.location.href = "tests/fortune/index.html";
        break;
      default:
        alert("준비 중인 테스트입니다! 😊");
        break;
    }
  }, 300);
}

// 테스트 페이지로 바로 리다이렉트 (모달 없이)
function redirectToTestDirect(testType) {
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
    case "job":
      window.location.href = "tests/job/index.html";
      break;
    case "animal":
      window.location.href = "tests/animal/index.html";
      break;
    case "color":
      window.location.href = "tests/color/index.html";
      break;
    case "character":
      window.location.href = "tests/character/index.html";
      break;
    case "fortune":
      window.location.href = "tests/fortune/index.html";
      break;
    default:
      alert("준비 중인 테스트입니다! 😊");
      break;
  }
}

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", function () {
  // 오래된 TMI 캐시 정리 (로컬 스토리지용)
  cleanupOldTMICache();

  // Supabase 클라이언트 초기화
  initSupabase();

  initCarousel();
  initHorizontalScroll();
  initAdBanner();
  initHoroscopeBanner();
  loadTodayTMIFromAPI(); // API 엔드포인트 사용으로 변경
});

// Supabase 클라이언트 초기화
function initSupabase() {
  try {
    // 먼저 Supabase 라이브러리가 로드되었는지 확인
    if (!window.supabase) {
      throw new Error("Supabase 라이브러리가 로드되지 않았습니다.");
    }

    // config.js에서 설정이 로드되었는지 확인
    if (!window.SUPABASE_CONFIG) {
      throw new Error("Supabase 설정이 없습니다. config.js를 확인해주세요.");
    }

    console.log("🔧 Supabase 설정 확인:", window.SUPABASE_CONFIG);

    // anonKey가 유효한지 확인
    if (
      !window.SUPABASE_CONFIG.anonKey ||
      window.SUPABASE_CONFIG.anonKey === "your-anon-key"
    ) {
      console.warn(
        "⚠️ Supabase ANON KEY가 설정되지 않았습니다. 환경변수를 확인해주세요."
      );
      // 하지만 계속 진행 (fallback 처리를 위해)
    }

    supabase = window.supabase.createClient(
      window.SUPABASE_CONFIG.url,
      window.SUPABASE_CONFIG.anonKey
    );

    console.log("✅ Supabase 클라이언트가 초기화되었습니다.");
  } catch (error) {
    console.error("❌ Supabase 초기화 오류:", error);
    // 오류가 있어도 계속 진행 (fallback TMI를 위해)
  }
}

// API 엔드포인트를 통한 TMI 로드 (글로벌 캐싱)
async function loadTodayTMIFromAPI() {
  const tmiContent = document.getElementById("tmiContent");
  const tmiDateDisplay = document.getElementById("tmiDateDisplay");

  if (!tmiContent) {
    console.warn("TMI 콘텐츠 엘리먼트를 찾을 수 없습니다.");
    return;
  }

  try {
    console.log("🌐 API에서 글로벌 캐시된 TMI 데이터 요청...");

    // API 엔드포인트로 요청 (서버에서 24시간 글로벌 캐싱)
    const response = await fetch("/api/tmi", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // API 엔드포인트가 없으면 fallback으로 직접 Supabase 사용
      console.warn(
        "⚠️ API 엔드포인트 사용 불가, Supabase 직접 사용으로 fallback"
      );
      await loadTodayTMIFallback();
      return;
    }

    const result = await response.json();

    if (result.success && result.data) {
      console.log("✅ 글로벌 캐시 TMI 데이터 로드 성공:", result);

      // TMI 표시
      displayTMI(result.data, tmiContent, tmiDateDisplay);

      // 캐싱 정보 로그
      if (result.cached) {
        console.log("📦 서버 글로벌 캐시 데이터 사용됨 (모든 사용자 공유)");
      } else {
        console.log("🆕 새로운 데이터 로드 후 글로벌 캐시 생성됨");
      }
    } else {
      throw new Error("API에서 유효한 TMI 데이터를 받지 못했습니다.");
    }
  } catch (error) {
    console.error("❌ API TMI 로딩 오류:", error);

    // API 실패 시 기존 방식으로 fallback
    await loadTodayTMIFallback();
  }
}

// Fallback: 직접 Supabase 사용 (기존 방식)
async function loadTodayTMIFallback() {
  const tmiContent = document.getElementById("tmiContent");
  const tmiDateDisplay = document.getElementById("tmiDateDisplay");

  console.log("🔄 Fallback: 직접 Supabase 연결 시도...");

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
      console.log("✅ Fallback Supabase TMI 데이터 로드 성공:", data);
      displayTMI(data, tmiContent, tmiDateDisplay);
    } else {
      throw new Error("오늘의 TMI 데이터를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("❌ Fallback TMI 로딩도 실패:", error);
    // 마지막 resort: 하드코딩된 fallback TMI
    showFallbackTMI();
  }
}

// 오늘의 TMI 로드 (Supabase 직접 접근 + 로컬 캐싱) - 기존 함수 유지 (fallback용)
async function loadTodayTMI() {
  const tmiContent = document.getElementById("tmiContent");
  const tmiDateDisplay = document.getElementById("tmiDateDisplay");

  if (!tmiContent) {
    console.warn("TMI 콘텐츠 엘리먼트를 찾을 수 없습니다.");
    return;
  }

  // 오늘 날짜 구하기 (YYYY-MM-DD 형식)
  const today = new Date().toISOString().split("T")[0];
  const cacheKey = `tmi_${today}`;

  // 로컬 스토리지에서 오늘의 TMI 캐시 확인
  const cachedTMI = getCachedTMI(cacheKey);
  if (cachedTMI) {
    console.log("📦 캐시된 TMI 데이터 사용:", cachedTMI);
    displayTMI(cachedTMI, tmiContent, tmiDateDisplay);
    return;
  }

  try {
    if (!supabase) {
      throw new Error("Supabase 클라이언트가 초기화되지 않았습니다.");
    }

    console.log("🌐 Supabase에서 새로운 TMI 데이터 요청...");

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
      console.log("✅ TMI 데이터 로드 성공:", data);

      // 로컬 스토리지에 캐시 저장
      cacheTMI(cacheKey, data);

      // TMI 표시
      displayTMI(data, tmiContent, tmiDateDisplay);
    } else {
      throw new Error("오늘의 TMI 데이터를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("❌ TMI 로딩 오류:", error);

    // Fallback TMI 표시
    showFallbackTMI();
  }
}

// TMI 캐시 저장 함수
function cacheTMI(cacheKey, data) {
  try {
    const cacheData = {
      data: data,
      timestamp: Date.now(),
      date: new Date().toISOString().split("T")[0],
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    console.log("💾 TMI 데이터 캐시 저장됨:", cacheKey);
  } catch (error) {
    console.warn("⚠️ 로컬 스토리지 저장 실패:", error);
  }
}

// TMI 캐시 조회 함수
function getCachedTMI(cacheKey) {
  try {
    const cached = localStorage.getItem(cacheKey);
    if (!cached) return null;

    const cacheData = JSON.parse(cached);
    const today = new Date().toISOString().split("T")[0];

    // 캐시된 데이터가 오늘 것인지 확인
    if (cacheData.date === today) {
      return cacheData.data;
    } else {
      // 오래된 캐시 삭제
      localStorage.removeItem(cacheKey);
      console.log("🧹 오래된 TMI 캐시 삭제됨:", cacheKey);
      return null;
    }
  } catch (error) {
    console.warn("⚠️ 캐시 조회 실패:", error);
    return null;
  }
}

// TMI 표시 함수
function displayTMI(data, tmiContent, tmiDateDisplay) {
  // 날짜 포맷팅 (예: 7월 7일)
  const date = new Date(data.date);
  const formattedDate = `${date.getMonth() + 1}월 ${date.getDate()}일`;

  // 날짜를 헤더에 표시
  if (tmiDateDisplay) {
    tmiDateDisplay.textContent = formattedDate;
  }

  // TMI 내용만 표시
  tmiContent.textContent = data.content;
}

// 오래된 TMI 캐시 정리 함수
function cleanupOldTMICache() {
  try {
    const today = new Date().toISOString().split("T")[0];
    const keysToDelete = [];

    // 로컬 스토리지에서 TMI 캐시 키들 찾기
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("tmi_")) {
        const cached = localStorage.getItem(key);
        if (cached) {
          try {
            const cacheData = JSON.parse(cached);
            // 오늘이 아닌 캐시는 삭제 대상
            if (cacheData.date !== today) {
              keysToDelete.push(key);
            }
          } catch (e) {
            // 파싱 오류가 있는 캐시도 삭제 대상
            keysToDelete.push(key);
          }
        }
      }
    }

    // 오래된 캐시 삭제
    keysToDelete.forEach((key) => {
      localStorage.removeItem(key);
      console.log("🧹 오래된 캐시 삭제:", key);
    });

    if (keysToDelete.length > 0) {
      console.log(
        `✨ ${keysToDelete.length}개의 오래된 TMI 캐시가 정리되었습니다.`
      );
    }
  } catch (error) {
    console.warn("⚠️ 캐시 정리 중 오류:", error);
  }
}

// Fallback TMI 표시 함수
function showFallbackTMI() {
  const tmiContent = document.getElementById("tmiContent");
  const tmiDateDisplay = document.getElementById("tmiDateDisplay");

  if (!tmiContent) return;

  // 오늘 날짜 기반 fallback TMI 목록
  const fallbackTMIs = [
    "오늘은 새로운 시작을 위한 완벽한 날입니다! ✨",
    "작은 변화가 큰 기쁨을 가져다 줄 것입니다 🌟",
    "당신의 미소가 누군가에게 희망이 될 수 있어요 😊",
    "오늘 하루도 당신답게 빛나세요! 🌈",
    "긍정적인 에너지로 가득한 하루 되세요 💫",
    "작은 친절이 세상을 바꿀 수 있어요 🤗",
    "오늘의 도전이 내일의 성장이 됩니다 🚀",
  ];

  // 오늘 날짜 기반으로 TMI 선택
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
  );
  const selectedTMI = fallbackTMIs[dayOfYear % fallbackTMIs.length];

  // Fallback TMI 데이터 객체 생성
  const fallbackData = {
    date: today.toISOString().split("T")[0],
    content: selectedTMI,
    is_fallback: true,
  };

  // TMI 표시
  displayTMI(fallbackData, tmiContent, tmiDateDisplay);

  // Fallback TMI도 캐시에 저장 (단, Supabase 데이터보다 우선순위 낮음)
  const cacheKey = `tmi_fallback_${fallbackData.date}`;
  const existingCache = getCachedTMI(`tmi_${fallbackData.date}`);
  if (!existingCache) {
    cacheTMI(cacheKey, fallbackData);
  }

  console.log("📝 Fallback TMI 표시:", selectedTMI);
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
