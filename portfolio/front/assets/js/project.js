document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("project-modal");
  const modalBody = document.getElementById("project-modal-body");

  const projectData = {
    gwangbu: `
    <hr style="margin: 1rem 0;">

    <h3>프로젝트 개요</h3>
    <p><strong>‘광부’</strong>는 사용자가 광고를 시청하고 포인트를 적립하여 기프티콘으로 교환하는 앱테크 리워드 플랫폼입니다. 기획부터 출시, 운영까지 전 과정을 직접 주도하였으며, 약 9개월간 총 <strong>1,400만 원의 매출</strong>, <strong>누적 다운로드 1.8만 건</strong>, <strong>DAU 1,800명</strong>을 기록했습니다.</p>

    <h3>프로젝트 목표</h3>
    <ul>
      <li>광고 수익을 유저에게 리워드로 분배하는 수익 구조 실현</li>
      <li>앱 내 광고 시청 → 포인트 적립 → 실물 리워드(기프티콘) 교환까지 원스톱 제공</li>
      <li>최소한의 비용으로 MVP를 빠르게 제작해 출시 및 피드백 수렴</li>
    </ul>

    <h3>담당 역할 및 주요 기능</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="text-align: left; padding: 0.5rem;">역할</th>
          <th style="text-align: left; padding: 0.5rem;">상세 내용</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 0.5rem;">기획 총괄</td>
          <td style="padding: 0.5rem;">기능 정의, 흐름도 작성, API 명세, 백엔드 일정 관리 및 릴리즈 계획 수립</td>
        </tr>
        <tr>
          <td style="padding: 0.5rem;">백엔드 개발</td>
          <td style="padding: 0.5rem;">FastAPI 기반 REST API 구현, 포인트 적립 로직, Firebase 알림 발송, 관리자 도구</td>
        </tr>
        <tr>
          <td style="padding: 0.5rem;">운영 및 유지보수</td>
          <td style="padding: 0.5rem;">사용자 피드백 반영한 기능 개선, 서버 로그 모니터링 및 예외 처리</td>
        </tr>
      </tbody>
    </table>

    <h3>주요 화면 및 시스템 흐름</h3>
    <ul>
      <li><strong>(사진1 – 앱 홈 화면)</strong>: 사용자 포인트, 광고 버튼, 교환 가능한 기프티콘 목록 UI<br>
        <img src="assets/images/communication/home.png" alt="앱 홈 화면" style="width: 100%; margin: 0.5rem 0;" />
      </li>
      <li><strong>(사진2 – 광고 시청 후 포인트 적립 과정)</strong>: 광고 시청 → 서버 정산 요청 → 포인트 적립<br>
        <img src="assets/images/communication/ad_watch.png" alt="광고 시청 후 포인트 적립" style="width: 100%; margin: 0.5rem 0;" />
      </li>
      <li><strong>(사진3 – 기프티콘 교환 화면)</strong>: 교환 화면 및 Firebase 발송 알림<br>
        <img src="assets/images/communication/reward.png" alt="기프티콘 교환 화면" style="width: 100%; margin: 0.5rem 0;" />
      </li>
      <li><strong>(사진4 – 관리자 페이지 or ERD)</strong>: ERD 또는 관리자 페이지 화면 (유저 관리, 통계 등)<br>
        <img src="assets/images/communication/admin.png" alt="관리자 화면 또는 ERD" style="width: 100%; margin: 0.5rem 0;" />
      </li>
    </ul>

    <h3>기술 스택</h3>
    <ul>
      <li><strong>백엔드:</strong> FastAPI, MySQL, SQLAlchemy, Redis</li>
      <li><strong>배포:</strong> Docker, AWS, GitHub Actions</li>
      <li><strong>기타:</strong> cron(스케줄링), JWT 인증, RESTful API 설계</li>
    </ul>

    <h3>성과 및 지표</h3>
    <ul>
      <li><strong>개발 기간:</strong> 2024.09 ~ 2024.10 (출시), 유지보수 및 운영: ~2025.06</li>
      <li><strong>매출:</strong> 약 1,400만 원 (광고 수익 및 제휴)</li>
      <li><strong>누적 다운로드:</strong> 약 18,000건</li>
      <li><strong>DAU:</strong> 약 1,800명</li>
      <li><strong>서버 장애 및 중단:</strong> 0건 (자동화된 예외 로깅과 캐시 전략 활용)</li>
    </ul>

    <h3>협업 구조</h3>
    <ul>
      <li>마케터 1명 (광고/리워드 운영 및 제휴)</li>
      <li>프론트엔드 개발자 1명 (React Native 기반 앱 제작)</li>
      <li><strong>백엔드 및 기획 전담 (본인)</strong></li>
    </ul>

    <h3>기술적 어려움 및 해결 경험</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
      <thead>
        <tr>
          <th style="text-align: left; padding: 0.5rem; border: 1px solid #ddd;">문제</th>
          <th style="text-align: left; padding: 0.5rem; border: 1px solid #ddd;">해결</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 0.5rem; border: 1px solid #ddd;">
            프론트의 key값 대소문자 실수로 인한 인증 오류
          </td>
          <td style="padding: 0.5rem; border: 1px solid #ddd;">
            기존에 백엔드만 기록하던 API 문서를 Notion에 프론트/백엔드 공용 API 문서로 작성하여 크로스체크
          </td>
        </tr>
        <tr>
          <td style="padding: 0.5rem; border: 1px solid #ddd;">
            프론트의 중복 요청으로 포인트가 중복 지급되는 이슈
          </td>
          <td style="padding: 0.5rem; border: 1px solid #ddd;">
            데이터베이스 제약조건 처리 + Redis 중복 제어 적용
          </td>
        </tr>
        <tr>
          <td style="padding: 0.5rem; border: 1px solid #ddd;">
            기프티콘 사이트의 잔액 부족으로 쿠폰이 발송되지 않았지만 완료 처리된 이슈
          </td>
          <td style="padding: 0.5rem; border: 1px solid #ddd;">
            일정 금액 미만일 때 관리자에게 알림 메시지 전송 + 잔액 부족 시 자동 대기열 이동 후 재처리
          </td>
        </tr>
      </tbody>
    </table>

    <h3>회고</h3>
    <p>
      ‘광부’는 단순한 백엔드 프로젝트가 아닌, 실제 유저가 사용하고 매출을 내는 서비스를 <strong>기획부터 운영까지</strong> 경험한 첫 사이드프로젝트였습니다.
      빠르게 MVP를 설계하고 데이터를 분석하며 기능을 확장해 나가는 과정에서 <strong>기획-개발-운영의 전체 흐름</strong>을 체계적으로 이해하고, 
      실서비스 운영에 필요한 기술적 책임감을 키울 수 있었습니다.
    </p>
  `,
    tips: `
    <hr style="margin: 1rem 0;">

    <h3>프로젝트 개요</h3>
    <p>
      <strong>TIPS</strong>는 중소벤처기업부가 주관하는 민간투자주도형 기술창업지원 프로그램으로, 본 프로젝트는 <strong>울산창조경제혁신센터</strong>와 <strong>비바라비다</strong>의 공동 추진으로 약 <strong>7억 원의 투자</strong>를 유치하였습니다. 저는 <strong>입사 3개월 차</strong>에 본 프로젝트의 AI 기술개발자로 투입되어, 
      <strong>유일한 AI 담당자</strong>로서 추천 시스템의 설계 및 구현을 주도했습니다.
    </p>

    <h3>프로젝트 목표</h3>
    <ul>
      <li>사용자 행동 기반 맞춤형 콘텐츠 추천 시스템 구축</li>
      <li>AI 모델을 활용하여 광고 소비율을 높이고 피드의 개인화 수준을 향상</li>
    </ul>

    <h3>담당 역할 및 주요 기능</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="text-align: left; padding: 0.5rem;">역할</th>
          <th style="text-align: left; padding: 0.5rem;">상세 내용</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 0.5rem;">AI 추천 시스템 설계</td>
          <td style="padding: 0.5rem;">유저 클릭, 체류 시간 등 행동 로그 기반 추천 알고리즘 구현</td>
        </tr>
        <tr>
          <td style="padding: 0.5rem;">데이터 수집 및 정제</td>
          <td style="padding: 0.5rem;">유해 이미지, 이상 행동 패턴 등 민감한 데이터 수집 및 라벨링 자동화</td>
        </tr>
        <tr>
          <td style="padding: 0.5rem;">AI 모델 학습 및 테스트</td>
          <td style="padding: 0.5rem;">모델 전처리 및 학습 파이프라인 구축, 실사용 가능성 검증</td>
        </tr>
      </tbody>
    </table>

    <h3>협업 구조</h3>
    <ul>
      <li>대표 및 마케터: 주제의 방향성 제시</li>
      <li>외부 투자사 및 울산창조경제혁신센터: 기술성 평가 및 피드백 제공</li>
      <li><strong>AI 기술개발자 (본인)</strong></li>
    </ul>

    <h3>기술적 어려움 및 해결 경험</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
      <thead>
        <tr>
          <th style="text-align: left; padding: 0.5rem; border: 1px solid #ddd;">문제</th>
          <th style="text-align: left; padding: 0.5rem; border: 1px solid #ddd;">해결</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 0.5rem; border: 1px solid #ddd;">
            유해 이미지 및 민감 데이터 수집의 어려움
          </td>
          <td style="padding: 0.5rem; border: 1px solid #ddd;">
            오픈소스 이미지셋 활용, 키워드 기반 수집 자동화, 수작업 검수 병행하여 필터링 데이터 확보
          </td>
        </tr>
        <tr>
          <td style="padding: 0.5rem; border: 1px solid #ddd;">
            모델 전처리와 학습 반복의 시간 소요
          </td>
          <td style="padding: 0.5rem; border: 1px solid #ddd;">
            huggingface의 학습된 초기 모델 사용 및 학습 로그 시각화를 통해 반복 실험 효율화
          </td>
        </tr>
      </tbody>
    </table>

    <h3>회고</h3>
    <p>
      이 프로젝트는 제가 입사 초기임에도 불구하고 <strong>AI 기술을 단독으로 책임지는 자리</strong>에서의 첫 경험이었습니다.
      추천 시스템이라는 실서비스 중심의 과제를 맡아 유저 행동 데이터를 분석하고, 기술 기획까지 주도적으로 참여했습니다.
      <strong>IR 피칭 자료 준비, 성능 설명, 기술 문서 정리</strong>까지 포함된 과정은 단순한 개발을 넘어 사업과 기술의 연결고리를 체감한 기회였습니다.
    </p>`,
  };

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      const extra = projectData[id] || "<p>추가 설명이 없습니다.</p>";

      // 카드 복제 (기존 스타일 무력화 방지)
      const cloned = card.cloneNode(true);
      cloned.classList.add("modal-card");

      modalBody.innerHTML = "";
      modalBody.appendChild(cloned);

      const extraContainer = document.createElement("div");
      extraContainer.classList.add("extra-content");
      extraContainer.innerHTML = extra;
      modalBody.appendChild(extraContainer);

      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  });

  // 닫기 버튼 처리
  document.querySelectorAll(".modal-close").forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  });

  // 바깥 클릭 시 닫기
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  const filterButtons = document.querySelectorAll(".skill-filter");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedSkill = button.getAttribute("data-skill");

      // 모든 버튼에서 active 클래스 제거
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      projectCards.forEach((card) => {
        const techItems = card.querySelectorAll(".tech-item");
        let hasSkill = false;

        techItems.forEach((tech) => {
          const techName = tech.getAttribute("data-name");
          if (techName === selectedSkill) {
            hasSkill = true;
          }
        });

        if (selectedSkill === "all" || hasSkill) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});
