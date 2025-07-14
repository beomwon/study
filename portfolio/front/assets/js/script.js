// API 기본 URL 설정
const API_BASE_URL = "http://localhost:8000/api";

// 테마 관리
class ThemeManager {
  constructor() {
    this.init();
  }

  init() {
    // 저장된 테마 불러오기 또는 기본값 설정
    const savedTheme = localStorage.getItem("theme") || "dark";
    this.setTheme(savedTheme);

    // 토글 버튼 이벤트 리스너
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => this.toggleTheme());
    }
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // 토글 버튼 아이콘 업데이트
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
    }
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    this.setTheme(newTheme);
  }
}

// 테마 매니저 초기화
const themeManager = new ThemeManager();

// 스크롤 인디케이터 관리
function handleScrollIndicator() {
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    if (window.scrollY > 50) {
      scrollIndicator.classList.add("hidden");
    } else {
      scrollIndicator.classList.remove("hidden");
    }
  }
}

// 스크롤 인디케이터 클릭 이벤트
document.addEventListener("DOMContentLoaded", () => {
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const summarySection = document.querySelector("#summary");
      if (summarySection) {
        summarySection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // 페이지 로드 시 초기 스크롤 인디케이터 상태 설정
  handleScrollIndicator();
});

// 별도의 스크롤 이벤트 리스너 추가 (인디케이터용)
let scrollTimeout;
window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(handleScrollIndicator, 10);
});

// 동그란 바 네비게이션 관리
class CircleNavigation {
  constructor() {
    this.navCircles = document.querySelectorAll(".nav-circle");
    this.navTexts = document.querySelectorAll(".nav-item-text");
    this.sections = document.querySelectorAll("section");
    this.circleNav = document.querySelector(".circle-nav");

    // 네비바의 초기 위치를 한 번만 계산해서 저장
    this.navOriginalTop = null;

    this.init();
  }

  init() {
    // 네비게이션 서클 클릭 이벤트
    this.navCircles.forEach((circle) => {
      circle.addEventListener("click", () => {
        const sectionId = circle.getAttribute("data-section");
        const targetSection = document.getElementById(sectionId);

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });

    // 페이지 로드 후 네비바의 초기 위치 계산
    setTimeout(() => {
      this.calculateNavPosition();
    }, 100);

    // 스크롤 이벤트로 활성 섹션 감지
    window.addEventListener("scroll", () => this.updateActiveSection());

    // 리사이즈 이벤트로 위치 재계산
    window.addEventListener("resize", () => this.calculateNavPosition());

    // 초기 활성 섹션 설정
    this.updateActiveSection();
  }

  calculateNavPosition() {
    if (!this.circleNav.classList.contains("sticky")) {
      // 네비바가 sticky 상태가 아닐 때만 원래 위치를 계산
      const navRect = this.circleNav.getBoundingClientRect();
      this.navOriginalTop = window.scrollY + navRect.top;
      console.log("네비바 원래 위치 계산:", this.navOriginalTop); // 디버깅용
    }
  }

  updateActiveSection() {
    const scrollPosition = window.scrollY + 150;

    // 스티키 네비게이션 처리
    if (this.navOriginalTop !== null) {
      const stickyTriggerPoint = this.navOriginalTop - 20; // 상단 20px 여백 고려

      if (
        window.scrollY >= stickyTriggerPoint &&
        !this.circleNav.classList.contains("sticky")
      ) {
        this.circleNav.classList.add("sticky");
      } else if (
        window.scrollY < stickyTriggerPoint &&
        this.circleNav.classList.contains("sticky")
      ) {
        this.circleNav.classList.remove("sticky");
      }
    }

    // 현재 섹션 찾기 - 더 정확한 감지
    let currentSection = "home";

    this.sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionBottom = sectionTop + sectionHeight;

      // 섹션의 절반 이상이 화면에 보이거나, 섹션이 화면을 가득 채울 때
      if (
        scrollPosition >= sectionTop - 100 &&
        scrollPosition < sectionBottom - 100
      ) {
        currentSection = section.id;
      }
    });

    // 활성 서클 업데이트
    this.navCircles.forEach((circle) => {
      const sectionId = circle.getAttribute("data-section");
      const text = circle.querySelector(".nav-item-text");

      if (sectionId === currentSection) {
        circle.classList.add("active");
        if (text) text.classList.add("active");
      } else {
        circle.classList.remove("active");
        if (text) text.classList.remove("active");
      }
    });
  }
}

// 동그란 바 네비게이션 초기화
document.addEventListener("DOMContentLoaded", () => {
  new CircleNavigation();
});

// API 데이터 로드 함수들
async function loadProfileData() {
  try {
    const response = await fetch(`${API_BASE_URL}/info/profile`);
    if (!response.ok) {
      throw new Error("프로필 데이터를 불러올 수 없습니다.");
    }
    const data = await response.json();

    // 자기소개 업데이트
    const bioText = document.getElementById("bio-text");
    if (bioText) {
      bioText.textContent = data.bio;
    }

    return data;
  } catch (error) {
    console.error("프로필 로드 에러:", error);
    // 기본값 설정
    const bioText = document.getElementById("bio-text");
    if (bioText) {
      bioText.textContent =
        "안녕하세요! 저는 협업을 중요시 하는 백엔드 개발자 이범원입니다.";
    }
  }
}

// 스크롤 애니메이션
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// 섹션들에 애니메이션 적용
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section:not(.hero)");
  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });
});

const tl = gsap
  .timeline({
    defaults: {
      duration: 2,
      yoyo: true,
      ease: "power2.inOut",
    },
  })
  .fromTo(
    ".left, .right",
    {
      svgOrigin: "640 500",
      skewY: (i) => [-30, 15][i],
      scaleX: (i) => [0.6, 0.85][i],
      x: 200,
    },
    {
      skewY: (i) => [-15, 30][i],
      scaleX: (i) => [0.85, 0.6][i],
      x: -200,
    }
  )
  .play(0.5);

const tl2 = gsap.timeline();

document.querySelectorAll("text").forEach((t, i) => {
  tl2.add(
    gsap.fromTo(
      t,
      {
        xPercent: -100,
        x: 700,
      },
      {
        duration: 1,
        xPercent: 0,
        x: 575,
        ease: "sine.inOut",
      }
    ),
    (i % 3) * 0.2
  );
});

window.onpointermove = (e) => {
  tl.pause();
  tl2.pause();
  gsap.to([tl, tl2], {
    duration: 2,
    ease: "power4",
    progress: e.x / innerWidth,
  });
};

// 모달 관리
class ModalManager {
  constructor() {
    this.modal = document.getElementById("keyword-modal");
    this.modalTitle = document.getElementById("modal-title");
    this.modalBody = document.getElementById("modal-body");
    this.closeBtn = document.querySelector(".keyword-modal-close");

    this.init();
  }

  init() {
    // 키워드 클릭 이벤트
    const keywords = document.querySelectorAll(".highlight-keyword");
    keywords.forEach((keyword) => {
      keyword.addEventListener("click", (e) => {
        const modalType = e.target.getAttribute("data-modal");
        this.openModal(modalType);
      });
    });

    // 모달 닫기 이벤트
    this.closeBtn.addEventListener("click", () => this.closeModal());

    // 모달 외부 클릭시 닫기
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    // ESC 키로 닫기
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeModal();
      }
    });
  }

  openModal(type) {
    const content = this.getModalContent(type);
    // 타이틀 제거
    if (this.modalTitle) this.modalTitle.textContent = "";
    this.modalBody.innerHTML = content.body;
    this.modal.style.display = "block";
    document.body.style.overflow = "hidden";

    // 캐러셀 이미지/래퍼 스타일 JS로 적용 및 모달 디자인 개선
    setTimeout(() => {
      // 모달창 디자인 개선: 더 세련된 모서리, 그림자 등
      this.modal.style.borderRadius = "0px";
      this.modal.style.boxShadow = "0 8px 32px rgba(0,0,0,0.25)";
      this.modal.style.overflow = "visible";
      this.modal.style.border = "none";

      // X 버튼 위치 조정
      if (this.closeBtn) {
        this.closeBtn.style.position = "absolute";
        this.closeBtn.style.top = "10px";
        this.closeBtn.style.right = "10px";
        this.closeBtn.style.zIndex = "1001";
        this.closeBtn.style.background = "none";
        this.closeBtn.style.border = "none";
        this.closeBtn.style.width = "36px";
        this.closeBtn.style.height = "36px";
        this.closeBtn.style.display = "flex";
        this.closeBtn.style.alignItems = "center";
        this.closeBtn.style.justifyContent = "center";
        this.closeBtn.style.fontSize = "1.5rem";
        this.closeBtn.style.cursor = "pointer";
      }

      const modalCarousel = this.modalBody.querySelector(".modal-carousel");
      if (modalCarousel) {
        modalCarousel.style.width = "100%";
        modalCarousel.style.maxWidth = "none";
        modalCarousel.style.height = "400px";
        modalCarousel.style.aspectRatio = "";
        modalCarousel.style.margin = "0 auto 1rem auto";
        modalCarousel.style.position = "relative";
      }
      const wrapper = this.modalBody.querySelector(".carousel-image-wrapper");
      if (wrapper) {
        wrapper.style.position = "relative";
        wrapper.style.width = "100%";
        wrapper.style.height = "auto";
        wrapper.style.overflow = "hidden";
        const images = wrapper.querySelectorAll(".carousel-image");
        images.forEach((img) => {
          img.style.position = "relative";
          img.style.width = "100%";
          img.style.height = "auto";
          img.style.objectFit = "contain";
        });
      }
    }, 0);
  }

  closeModal() {
    this.modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  getModalContent(type) {
    const contents = {
      communication: {
        title: "💬 소통",
        body: `
        <div class="modal-carousel" style="position:relative; width:100%; height: 400px; margin:0 auto 1rem auto; display:flex; justify-content:center; align-items:center;">
        <button class="carousel-btn prev" style="position:absolute; left:20px; top:50%; transform:translateY(-50%); background: none; border:none; color:#fff; font-size:2rem; width:36px; height:36px; z-index:10; cursor:pointer;">
          <i class="fa-solid fa-angle-left"></i>
        </button>
        <div class="carousel-image-wrapper" style="width:100%; height:400px; position:relative;">
          <img class="carousel-image" src="assets/images/communication/1.png" alt="소통 이미지1" style="width:100%; height:400px; object-fit:cover; display:block; position:absolute; top:0; left:0;">
          <img class="carousel-image" src="assets/images/communication/2.png" alt="소통 이미지2" style="width:100%; height:400px; object-fit:cover; display:none; position:absolute; top:0; left:0;">
          <img class="carousel-image" src="assets/images/communication/3.png" alt="소통 이미지3" style="width:100%; height:400px; object-fit:cover; display:none; position:absolute; top:0; left:0;">
          <img class="carousel-image" src="assets/images/communication/4.png" alt="소통 이미지4" style="width:100%; height:400px; object-fit:cover; display:none; position:absolute; top:0; left:0;">
          <img class="carousel-image" src="assets/images/communication/5.png" alt="소통 이미지5" style="width:100%; height:400px; object-fit:cover; display:none; position:absolute; top:0; left:0;">
        </div>
        <button class="carousel-btn next" style="position:absolute; right:20px; top:50%; transform:translateY(-50%); background: none; border:none; color:#fff; font-size:2rem; width:36px; height:36px; z-index:10; cursor:pointer;">
          <i class="fa-solid fa-angle-right"></i>
        </button>
        <div class="carousel-indicator" style="position:absolute; bottom:15px; width:100%; text-align:center; z-index:10;">
          <span class="carousel-dot" style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#f97316;margin:0 3px;"></span>
          <span class="carousel-dot" style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#e0e0e0;margin:0 3px;"></span>
          <span class="carousel-dot" style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#e0e0e0;margin:0 3px;"></span>
          <span class="carousel-dot" style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#e0e0e0;margin:0 3px;"></span>
          <span class="carousel-dot" style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#e0e0e0;margin:0 3px;"></span>
        </div>
      </div>

      <p style="margin-bottom:0.7em;">저는 소통을 할 때 <b>글로 정리</b>하는 습관이 있습니다. 말로만 이야기할 때는 몰랐던 애매한 부분을 글로 적으면서 찾아내고, 이를 확실하게 노션에 정리하여 이해하기 쉽게 공유합니다.</p>
      <p style="margin-bottom:0.7em;">지속적인 소통을 통해 머릿속에만 있던 부분이나 서로 다르게 이해할 수 있었던 점을 명확히 하여, <b>서로 말하고 생각하는 바가 일치</b>할 수 있도록 만듭니다.</p>
      <p style="margin-bottom:0.7em;">또한, <b>깃허브에서 기능 단위로 커밋</b>하고, 커밋 메시지도 명확하게 작성하여 협업자들이 변경 내역을 쉽게 파악할 수 있도록 합니다. 여러 사람과 협업할 때도 <b>깃허브 규칙</b>을 잘 지키며, 팀원들과 원활하게 소통하고 협력한 경험이 많습니다.</p>
      `,
      },
      learning: {
        title: "📚 배움",
        body: `
        <div class="modal-carousel" style="position:relative; width:100%; height: 400px; margin:0 auto 1rem auto; display:flex; justify-content:center; align-items:center;">
        <button class="carousel-btn prev" style="position:absolute; left:20px; top:50%; transform:translateY(-50%); background: none; border:none; color:#fff; font-size:2rem; width:36px; height:36px; z-index:10; cursor:pointer;">
          <i class="fa-solid fa-angle-left"></i>
        </button>
        <div class="carousel-image-wrapper" style="width:100%; height:400px; position:relative;">
          <img class="carousel-image" src="assets/images/learn/1.png" alt="소통 이미지1" style="width:100%; height:400px; object-fit:cover; display:block; position:absolute; top:0; left:0;">
          <img class="carousel-image" src="assets/images/learn/2.png" alt="소통 이미지2" style="width:100%; height:400px; object-fit:cover; display:none; position:absolute; top:0; left:0;">
        </div>
        <button class="carousel-btn next" style="position:absolute; right:20px; top:50%; transform:translateY(-50%); background: none; border:none; color:#fff; font-size:2rem; width:36px; height:36px; z-index:10; cursor:pointer;">
          <i class="fa-solid fa-angle-right"></i>
        </button>
        <div class="carousel-indicator" style="position:absolute; bottom:15px; width:100%; text-align:center; z-index:10;">
          <span class="carousel-dot" style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#f97316;margin:0 3px;"></span>
          <span class="carousel-dot" style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#e0e0e0;margin:0 3px;"></span>
        </div>
      </div>

      <p style="margin-bottom:0.7em;">AI를 활용한 프로젝트를 진행할 때, YOLO v5로 작업하던 중 YOLO v7이 출시된 지 한 달밖에 안 되었을 때 성능이 더 좋다는 사실을 알게 되었습니다. 당시에는 국내외 블로그나 커뮤니티에 관련 적용 사례가 거의 없었지만, 논문과 GitHub, Stack Overflow를 직접 찾아가며 공부하고, 실제 프로젝트에 YOLO v7을 <b>성공적으로 적용</b>한 경험이 있습니다.</p>
      <p style="margin-bottom:0.7em;">또한 프론트엔드 개발자와의 소통을 중요하게 생각하며, 새로운 언어와 기술을 배우는 데 주저하지 않습니다. Node.js 등 백엔드뿐 아니라 프론트엔드 영역도 이해하기 위해 프론트엔드 부트캠프 수업을 듣고 있으며, 다양한 시각에서 <b>협업할 수 있도록 노력</b>하고 있습니다.</p>
      `,
      },
    };

    return contents[type] || { title: "", body: "" };
  }
}

// 모달 매니저 초기화
document.addEventListener("DOMContentLoaded", () => {
  new ModalManager();

  // 캐러셀 동작 (모달이 열릴 때마다 이벤트 바인딩)
  document.body.addEventListener("click", function (e) {
    // 버튼 내부의 <i> 태그 클릭 시도 정상 동작하도록 수정
    let btn = null;
    if (e.target.classList.contains("carousel-btn")) {
      btn = e.target;
    } else if (e.target.closest && e.target.closest(".carousel-btn")) {
      btn = e.target.closest(".carousel-btn");
    }
    if (btn) {
      const modal = document.getElementById("keyword-modal");
      const wrapper = modal.querySelector(".carousel-image-wrapper");
      if (!wrapper) return;
      const images = wrapper.querySelectorAll(".carousel-image");
      const dots = modal.querySelectorAll(".carousel-dot");
      let current = 0;
      images.forEach((img, idx) => {
        if (img.style.display !== "none") current = idx;
      });
      if (btn.classList.contains("prev")) {
        const next = (current - 1 + images.length) % images.length;
        images.forEach(
          (img, idx) => (img.style.display = idx === next ? "block" : "none")
        );
        dots.forEach(
          (dot, idx) =>
            (dot.style.background = idx === next ? "#f97316" : "#e0e0e0")
        );
      }
      if (btn.classList.contains("next")) {
        const next = (current + 1) % images.length;
        images.forEach(
          (img, idx) => (img.style.display = idx === next ? "block" : "none")
        );
        dots.forEach(
          (dot, idx) =>
            (dot.style.background = idx === next ? "#f97316" : "#e0e0e0")
        );
      }
    }
  });

  // 모달이 열릴 때마다 캐러셀 초기화
  const modal = document.getElementById("keyword-modal");
  modal.addEventListener("transitionend", function () {
    if (modal.style.display === "block") {
      const wrapper = modal.querySelector(".carousel-image-wrapper");
      if (!wrapper) return;
      const images = wrapper.querySelectorAll(".carousel-image");
      const dots = modal.querySelectorAll(".carousel-dot");
      images.forEach(
        (img, idx) => (img.style.display = idx === 0 ? "block" : "none")
      );
      dots.forEach(
        (dot, idx) => (dot.style.background = idx === 0 ? "#f97316" : "#e0e0e0")
      );
    }
  });
});

// 캐러셀 기능 추가
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".modal-carousel");

  carousels.forEach((carousel) => {
    const images = carousel.querySelectorAll(".carousel-image");
    const dots = carousel.querySelectorAll(".carousel-dot");
    let currentIndex = 0;

    // 이미지 전환 함수
    function changeImage(index) {
      images.forEach((img, i) => {
        img.style.display = i === index ? "block" : "none";
      });

      // 도트 업데이트
      dots.forEach((dot, i) => {
        dot.style.backgroundColor = i === index ? "#f97316" : "#e0e0e0";
      });
    }

    // 이전/다음 버튼 클릭 이벤트
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        changeImage(currentIndex);
      });

      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        changeImage(currentIndex);
      });
    }

    // 초기 이미지 설정
    changeImage(currentIndex);
  });
});
