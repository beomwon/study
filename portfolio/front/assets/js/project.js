document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("project-modal");
  const modalBody = document.getElementById("project-modal-body");

  const projectData = {
    gwangbu: `
    <hr style="margin: 1rem 0;">

    <h3>프로젝트 개요</h3>
    <p><strong>‘광부’</strong>는 사용자가 광고를 시청하고 포인트를 적립하여 기프티콘으로 교환하는 앱테크 리워드 플랫폼입니다. 기획부터 출시, 운영까지 전 과정을 직접 주도하였으며, 약 9개월간 총 <strong>1,400만 원의 매출</strong>, <strong>누적 다운로드 1.8만 건</strong>, <strong>DAU 1,800명</strong>을 기록했습니다.</p>
    <img src="assets/images/project/gwangbu/income.png" alt="광부 지속적인 수입 이미지" style="width: 100%; margin: 0.5rem 0;" />
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
    <img src="assets/images/project/gwangbu/mau_dau.png" alt="광부 MAU와 DAU" style="width: 100%; margin: 0.5rem 0;" />
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
      <strong>자료 준비, 성능 설명, 기술 문서 정리</strong>까지 포함된 과정은 단순한 개발을 넘어 사업과 기술의 연결고리를 체감한 기회였습니다.
    </p>`,
    yolo: `
    <hr style="margin: 1rem 0;">
    <h3>프로젝트 개요</h3>
    <p><strong>AI 기반 CCTV 이상행동 탐지 시스템</strong>은 공공장소나 산업 현장에서 위험한 상황을 실시간으로 감지하고 경고하는 목적의 컴퓨터 비전 프로젝트입니다. 본 프로젝트는 <strong>광주 인공지능사관학교</strong>에서 수행되었으며, 저는 PM 및 핵심 개발자로서 전체 설계 및 구현을 주도하였습니다. 해당 프로젝트는 <strong>최우수상</strong>을 수상했습니다.</p>
    <iframe 
      width="100%"
      height="400" 
      src="https://www.youtube.com/embed/CGDPX-WUmPM" 
      title="CCTV 이상행동 탐지 시스템 프로젝트 발표 시연 영상" 
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen>
    </iframe>

    <h3>프로젝트 목표</h3>
    <ul>
      <li>CCTV 영상에서 위험한 행동(폭행, 쓰러짐 등)을 실시간으로 탐지</li>
      <li>탐지된 위험 상황을 캡처하여 얼굴을 모자이크 처리한 후 관리자에게 경고 전송</li>
      <li>다단계 담당자 알림 시스템을 구축하여 빠른 대응 가능</li>
    </ul>

    <h3>담당 역할 및 구현 기능</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="text-align: left; padding: 0.5rem;">역할</th>
          <th style="text-align: left; padding: 0.5rem;">상세 내용</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 0.5rem;">PM 및 전체 설계</td>
          <td style="padding: 0.5rem;">모델 구조 선정, 데이터셋 수집 및 가공, 프로젝트 일정 기획 및 발표 진행</td>
        </tr>
        <tr>
          <td style="padding: 0.5rem;">데이터 구축</td>
          <td style="padding: 0.5rem;">CCTV 영상 수집, 이상행동 라벨링, 데이터 증강 및 수정</td>
        </tr>
        <tr>
          <td style="padding: 0.5rem;">AI 모델 개발</td>
          <td style="padding: 0.5rem;">YOLOv5 기반 탐지 모델 학습 → YOLOv7으로 경량화 및 정확도 향상</td>
        </tr>
        <tr>
          <td style="padding: 0.5rem;">인터페이스 및 시스템 구현</td>
          <td style="padding: 0.5rem;">Tkinter GUI로 사용자 설정 인터페이스 제작, Telegram API 연동 및 경고 자동 발송 시스템 구축</td>
        </tr>
      </tbody>
    </table>
    <img src="assets/images/project/yolo/self_data.png" alt="데이터셋을 직접 수집" style="width: 100%; margin: 0.5rem 0;" />

    <h3>작동 방식</h3>
    <ul>
      <li>사용자는 <strong>CCTV 화면 중 탐지할 영역을 선택</strong></li>
      <li>해당 영역에서 이상행동(폭력, 쓰러짐 등)이 탐지되면 <strong>해당 장면을 캡처</strong></li>
      <li>캡처된 화면에서 얼굴을 탐지하고 <strong>마스킹(모자이크)</strong> 처리</li>
      <li>이상행동 확률, 발생 위치, 이미지와 함께 <strong>Telegram으로 관리자에게 전송</strong></li>
      <li>관리자가 “처리 완료” 응답을 하지 않으면 <strong>다음 순번 관리자에게 자동 전달</strong></li>
    </ul>
    <img src="assets/images/project/yolo/yolo_process.png" alt="이상행동 감지모델 프로세스" style="width: 100%; margin: 0.5rem 0;" />

    <h3>성과 및 특징</h3>
    <ul>
      <li><strong>최우수상 수상</strong> (광주 인공지능사관학교 프로젝트 경진대회)</li>
      <li>실제 CCTV 영상 기반 실시간 동작 감지와 GUI/알림 시스템 통합</li>
      <li>단일 애플리케이션에 국한되지 않고, <strong>기존 CCTV 위에 쉽게 적용 가능한 아키텍처 설계</strong></li>
    </ul>

    <h3>기술 스택</h3>
    <ul>
      <li><strong>AI 모델:</strong> YOLOv5 → YOLOv7</li>
      <li><strong>데이터 처리:</strong> OpenCV, albumentations</li>
      <li><strong>GUI:</strong> Python Tkinter</li>
      <li><strong>알림 시스템:</strong> Telegram Bot API</li>
      <li><strong>얼굴 모자이크:</strong> Haar cascade + 이미지 후처리</li>
    </ul>

    <h3>회고</h3>
    <p>
      본 프로젝트는 제가 <strong>전체 기획에서 모델 학습, 인터페이스 구성까지 전 과정을 주도</strong>한 경험이었고, 특히 기존 CCTV 시스템에 AI 기능을 비침습적으로 탑재한다는 점에서 실용적인 구조를 고안한 것을 칭찬받아 기분이 좋았습니다. 
      데이터 수집 및 라벨링, 위험 행동 정의, 전처리 과정에서의 어려움과 모델 교체 의사결정 등의 실무적인 고민을 통해 현장형 AI 기술의 중요성과 팀을 리드하는 책임감을 배울 수 있었습니다. 물론 데이터의 양도 부족하고, 상황도 부족했지만 짧은 시간 내에
      <strong>모든 과정을 직접 경험</strong>했다는 점에서 큰 성취감을 느꼈습니다.
    </p>
  `,
    nocode: `
    <hr style="margin: 1rem 0;" />

    <h3>프로젝트 개요</h3>
    <p>
      기존 이메일 기반의 연차 신청 프로세스의 비효율을 개선하고자, <strong>구글폼, 노션, 구글 시트</strong>를 활용한 <strong>노코드 기반 연차 자동화 시스템</strong>을 구축하였습니다.
      연차 신청, 승인, 차감, 개인 연차 확인, 연차 캘린더까지 모두 자동화하여 <strong>협업 편의성과 투명성</strong>을 높였습니다.
    </p>
    <img src="assets/images/project/notion/notion.png" alt="노코드 연차시스템 제작과정 일부" style="width: 100%; margin: 0.5rem 0;" />
    <h3>기획 배경</h3>
    <ul>
      <li>이전에는 직원이 대표에게 이메일로 연차 사용을 직접 통보하는 수동 방식이었음</li>
      <li>본인이 연차를 얼마나 썼는지 스스로 기록해야 하는 불편함 존재</li>
      <li><strong>연차 관리의 투명성과 기록 유지, 협업 효율 개선</strong> 필요</li>
    </ul>

    <h3>시스템 구성 및 흐름</h3>
    <ul>
      <li><strong>노션</strong>: 연차 신청 버튼 제공 → 구글폼 연결</li>
      <li><strong>구글폼</strong>: 날짜, 사유 등을 작성하여 제출 → 자동으로 <strong>구글 시트</strong>에 기록</li>
      <li><strong>구글 시트</strong>:
        <ul>
          <li>연차 사용일 계산 후 자동 차감</li>
          <li>개인별 연차 페이지 자동 생성 (잔여 연차 확인)</li>
          <li>공휴일/주말 자동 제외 처리</li>
        </ul>
      </li>
      <li><strong>연차 캘린더</strong>:
        <ul>
          <li>자동으로 월/년도별로 업데이트</li>
          <li>각 날짜마다 연차 사용자가 표시되어 <strong>협업 시 참고</strong> 가능</li>
        </ul>
      </li>
    </ul>

    <h3>도입 효과</h3>
    <ul>
      <li><strong>전 직원의 연차 기록 관리 자동화</strong>로 수기 기록 불필요</li>
      <li>대표 및 관리자도 <strong>한눈에 전체 연차 현황 확인 가능</strong></li>
      <li>협업 팀원들의 연차 계획 파악이 쉬워져 업무 조율 용이</li>
    </ul>

    <h3>기술 및 도구</h3>
    <ul>
      <li><strong>노코드 도구:</strong> Google Form, Google Sheets, Notion</li>
      <li><strong>자동화 설정:</strong> 구글 시트 함수 및 시트 간 연동</li>
      <li><strong>캘린더 동기화:</strong> 연도/월 자동 반영, 조건부 서식으로 사용자 표시</li>
    </ul>

    <h3>과정</h3>
    <ul>
      <li>입사 초기, 불편한 연차 신청 방식(이메일 기반)을 개선하기 위해 대표에게 직접 제안</li>
      <li>프로토타입 제작 후 시범 적용 → 전사 적용</li>
      <li><strong>내 연차 현황 확인 → 달력으로 팀 연차 상황 파악 → 대표 승인까지 원스톱</strong> 구조 완성</li>
    </ul>

    <h3>요약 한 줄</h3>
    <p>기존 이메일 연차 시스템을 대체할 <strong>노코드 기반 연차 자동화 시스템을 구축</strong>하고, 협업 생산성을 높였습니다.</p>
  `,
    crm: `
    <hr style="margin: 1rem 0;" />

    <h3>프로젝트 개요</h3>
    <p>
      서비스에 필요한 마케팅 및 사용자 알림 메시지를 통합 관리하고 자동화하기 위해 <strong>CRM 발송 자동화 시스템</strong>을 기획 및 개발하였습니다. 
      기존에는 <strong>마케팅팀, 백엔드팀, 모임플래너</strong>가 각자 Firebase 콘솔 또는 관리자페이지로 CRM을 발송하고 있어 관리에 혼선이 발생했고, 
      이를 <strong>하나의 API 기반 시스템으로 통합</strong>하고, 앱에 필요한 <strong>CRM을 추가</strong>하는 것이 목표였습니다.
    </p>

    <h3>진행 배경</h3>
    <ul>
      <li>각 부서에서 개인적으로 발송하던 Firebase Cloud Messaging을 자동화하여 효율적이고 일관된 CRM 운영 체계 구축</li>
      <li>마케팅 캠페인, 출석 알림, 모임 리마인더, 이벤트 등 다양한 메시지를 발송하는 과정에서 중복·누락 문제 발생</li>
    </ul>

    <h3>개발 목표</h3>
    <ul>
      <li>각 팀에서 사용하는 CRM을 종합하여 하나의 화면에서 보이게 하여 중복/누락 문제 방지</li>
      <li>유형별로 CRM을 분류하여 CRM의 종류와 수를 조절</li>
      <li>CRM 발송 로그 저장 및 실패 대응 (예: Firebase 응답 실패 시 재시도 또는 관리자 알림)</li>
    </ul>

    <h3>기술 스택 및 구성</h3>
    <ul>
      <li><strong>백엔드:</strong> FastAPI (CRM 발송 API 서버), Firebase Admin SDK (FCM 발송)</li>
      <li><strong>DB:</strong> mariaDB mySQL (유저 상태 및 발송 로그 기록)</li>
      <li><strong>자동화 도구:</strong> cron, celery, Redis</li>
      <li><strong>기타:</strong> GitHub Actions, Docker (개발환경 자동화)</li>
    </ul>

    <h3>담당 업무 및 주요 역할</h3>
    <ul>
      <li><strong>기획 정리:</strong> 기존 부서별 CRM 발송 현황 조사 및 유형 분류</li>
      <li><strong>API 설계:</strong> 메시지 유형, 대상 유저 조건, 발송 내용 등을 받아 CRM을 발송하는 API 구조 설계</li>
      <li><strong>Firebase 연동:</strong> FastAPI에서 FCM 메시지를 안정적으로 발송할 수 있도록 Firebase Admin SDK 연동</li>
      <li><strong>예외 처리 설계:</strong> FCM 실패 시 재시도 로직 및 관리자 대상 알림 계획</li>
    </ul>

    <h3>진행 상황</h3>
    <ul>
      <li>CRM 유형 분류 및 발송 케이스 정의 완료 (출석 알림, 미참여자 리마인드, 마케팅 캠페인 등)</li>
      <li>FastAPI 기반 API 1차 개발 완료 (템플릿 적용 및 사용자 조건 조회)</li>
      <li>Firebase 연동 및 FCM 메시지 발송 테스트 완료</li>
      <li><strong>퇴사로 인해 정식 배포는 미완료 상태</strong></li>
    </ul>

    <h3>기술적 어려움 및 해결</h3>
    <ul>
      <li><strong>문제:</strong> 파트 별로 어떤 CRM을 보내고 있는지 명확히 확인하기 어려움<br>
          → <strong>해결:</strong> 많은 회의와 figma로 시각화하여 이해하기 쉽게 정리</li>
      <li><strong>문제:</strong> 같은 시간이 타 부서별로 CRM이 중복하여 전송<br>
          → <strong>해결:</strong> CRM 피로도 감소를 위하여 스케줄링 도입 시도</li>
    </ul>

    <h3>회고</h3>
    <p>
      <strong>CRM 자동화 시스템</strong>은 단순히 메시지를 보내는 기능이 아닌, 유저와의 지속적 관계 유지를 위한 핵심 기능이라고 판단했습니다.
      제한된 인력과 시간 안에서도 <strong>팀 간 산재된 기능을 통합</strong>하고, <strong>운영팀의 반복 작업을 줄일 수 있는 기반</strong>을 설계했다는 점에서 
      의미 있는 프로젝트였습니다. 비록 퇴사로 인해 완전한 기능 고도화와 예약 발송 기능은 완성하지 못했지만, 추후에도 CRM을 백엔드와 통합하는 시도는 필수적이라고 생각합니다.
    </p>
  `,
    soop: `
  <hr style="margin: 1rem 0;" />

  <h3>프로젝트 개요</h3>
  <p>
    <strong>AI 실험 웹사이트 프로젝트</strong>는 다양한 최신 AI 도구들을 실제로 접목하고, 그 결과물을 웹사이트 형태로 시각화하며 배포하는 실습형 프로젝트입니다.
    단순한 서비스 구현보다도, <strong>ChatGPT, Claude, Midjourney, Runway, Groq</strong> 등 <strong>AI 툴의 실사용 경험</strong>과 
    이를 활용한 <strong>텍스트·이미지·영상 생성</strong> 실험을 중점적으로 진행하였습니다.
  </p>
  <img src="assets/images/project/soop/main.gif" alt="프로젝트 웹사이트 메인 gif" style="width: 100%; margin: 0.5rem 0;" />

  <h3>프로젝트 목표</h3>
  <ul>
    <li>주요 생성형 AI 툴을 직접 체험하고 기능 및 한계 파악</li>
    <li>웹사이트에 AI로 생성한 콘텐츠를 연동하여 실제 서비스 형태로 시각화</li>
    <li>도메인 연결 및 Vercel을 활용한 퍼블리싱 전 과정 경험</li>
  </ul>

  <h3>활용한 AI 툴 및 결과물</h3>
  <ul>
    <li><strong>ChatGPT / Claude:</strong> 심리테스트 문항, MBTI 성향 문구, 서비스 소개 콘텐츠 생성</li>
    <li><strong>Midjourney:</strong> 아트워크/캐릭터 스타일 이미지 생성 (예: 웹페이지 배너, 버튼 아이콘 등)</li>
    <li><strong>Runway ML:</strong> 짧은 영상 클립 생성 및 배경 제거 기능 실험</li>
    <li><strong>Groq API:</strong> 초고속 텍스트 응답 속도 비교 테스트 및 UI 응답 속도 실험</li>
  </ul>

  <h3>담당 역할</h3>
  <ul>
    <li><strong>기획:</strong> 각 AI 툴의 실험 목적 설정 및 사이트 콘텐츠 흐름 설계</li>
    <li><strong>콘텐츠 제작:</strong> 이미지 및 문구 생성, 테스트 심리유형 문항 구성</li>
    <li><strong>배포:</strong> 커스텀 도메인 연결 및 <strong>Vercel을 통한 정적 웹사이트 배포</strong></li>
  </ul>
  <img src="assets/images/project/soop/prompt.PNG" alt="프로젝트 웹사이트 제작 프롬프트" style="width: 100%; margin: 0.5rem 0;" />

  <h3>기술 스택</h3>
  <ul>
    <li><strong>프론트엔드:</strong> HTML, CSS, JavaScript (간단한 인터랙션 포함)</li>
    <li><strong>배포:</strong> Vercel (도메인 연결, CI 자동 배포 경험 포함)</li>
    <li><strong>AI 툴:</strong> OpenAI ChatGPT, Claude, Midjourney, Runway, Groq</li>
  </ul>

  <h3>회고</h3>
  <p>
    다양한 AI 생성 툴을 단순히 테스트하는 수준을 넘어, 결과물을 활용한 웹사이트 구성과 배포까지 연결한 프로젝트였습니다.
    각각의 툴이 가진 장점과 한계를 실감할 수 있었으며, 특히 <strong>실제 서비스를 만들기 위한 AI 툴 활용 방식</strong>과 
    UI 흐름 설계에 대한 감각을 키울 수 있었습니다. 향후 실사용 앱이나 웹서비스에서 AI 기능을 접목할 때 기반이 되는 경험이 되었습니다.
  </p>
  `,
    lunch: `
    <hr style="margin: 1rem 0;" />

    <h3>프로젝트 개요</h3>
    <p>
      <strong>사내 점심메뉴 추천 서비스</strong>는 직원들의 음식 취향 데이터를 수집하고, 
      해당 정보를 기반으로 개인 맞춤형 점심 메뉴를 추천하는 토이 프로젝트입니다.
      Django 기반으로 웹서비스를 구현했으며, 음식점 데이터는 웹 크롤링을 통해 수집하고 정제하였습니다.
    </p>
    
    <h3>프로젝트 목표</h3>
    <ul>
      <li>직원 개개인의 취향을 반영한 <strong>맞춤형 점심 추천</strong> 시스템 구현</li>
      <li>점심 메뉴 결정의 번거로움을 줄이고 <strong>의사결정 비용 절감</strong></li>
      <li>Figma·Notion을 활용한 <strong>팀 간 UI/기획 협업</strong> 및 백로그 공유 경험</li>
    </ul>

    <h3>담당 역할 및 주요 기능</h3>
    <ul>
      <li><strong>웹 크롤러 구현:</strong> 네이버 플레이스, 구글 등에서 음식점 정보 자동 수집 (Selenium & BeautifulSoup)</li>
      <li><strong>DB 구성:</strong> 음식점 카테고리, 위치, 가격대, 평점 등 기준으로 데이터 정제 및 저장</li>
      <li><strong>취향 기반 추천 로직:</strong> 설문 기반 선호 음식 스타일을 DB에 저장 → 유사도 필터링 추천 구현</li>
      <li><strong>프론트 연동:</strong> Django 템플릿 기반 추천 결과 시각화 (오늘의 메뉴, 랜덤 메뉴, 취향 메뉴)</li>
    </ul>

    <h3>기술 스택</h3>
    <ul>
      <li><strong>백엔드:</strong> Python, Django, mariaDB</li>
      <li><strong>크롤링:</strong> Selenium, BeautifulSoup</li>
      <li><strong>협업 도구:</strong> Figma (UI 시안), Notion (기획 및 업무 공유)</li>
      <li><strong>기타:</strong> HTML/CSS, Bootstrap (간단한 UI 구성)</li>
    </ul>

    <h3>회고</h3>
    <p>
      단순한 랜덤 추천이 아닌, <strong>사용자 데이터를 바탕으로 맞춤화된 추천</strong>을 구현해본 경험이었습니다.
      크롤링부터 DB 설계, 추천 알고리즘 구성, 협업하여 api설계까지 하면서 <strong>작지만 완결된 웹서비스를 직접 설계·구현</strong>할 수 있었습니다.
      Figma 및 Notion을 통한 협업도 익히며 <strong>디자이너 및 기획자와의 협업 흐름</strong>도 익숙해졌습니다.
    </p>
  `,
    discord: `
    <hr style="margin: 1rem 0;" />

    <h3>프로젝트 개요</h3>
    <p>
      <strong>디스코드봇 API 활용 프로젝트</strong>는 다양한 공공 및 상용 API를 디스코드 봇에 연동해보며 <strong>실시간 정보 제공 기능</strong>과 <strong>챗봇 연동</strong>을 실습한 사이드 프로젝트입니다.
      봇 명령어 기반으로 <strong>기상청 API, 라이엇 API, OpenAI API</strong>를 활용하였고, 사용자가 채팅창에 명령을 입력하면 각 API로부터 정보를 받아 응답하는 구조로 제작되었습니다.
    </p>
    <img src="assets/images/project/discord/lol.PNG" alt="라이엇api를 활용한 디스코드봇" style="width: 100%; margin: 0.5rem 0;" />
    <h3>프로젝트 목표</h3>
    <ul>
      <li>API 연동 방식 및 데이터 흐름 구조 학습</li>
      <li>외부 API로부터 데이터를 수신하고 사용자 맞춤 응답 생성</li>
      <li>간단한 자연어 인터페이스로 실시간 데이터 제공</li>
    </ul>

    <h3>주요 기능</h3>
    <ul>
      <li><strong>날씨 정보 조회:</strong> 기상청 API를 활용해 현재 위치(예: 서울, 광주 등)의 날씨/기온/강수 정보 제공</li>
      <li><strong>롤 전적 조회:</strong> 라이엇 API를 통해 소환사명 기반 최근 경기 기록, 티어, 승률 등의 정보 표시</li>
      <li><strong>ChatGPT 응답:</strong> OpenAI API 연동으로 자연어 채팅 명령을 처리하고 챗봇처럼 응답</li>
    </ul>

    <h3>사용 예시</h3>
    <ul>
      <li><code>!날씨 서울</code> → 오늘의 서울 날씨: 맑음, 최고기온 28도</li>
      <li><code>!롤전적 Hide on bush</code> → 최근 5경기 승률, KDA 등 표시</li>
      <li><code>!chat 안녕 GPT</code> → ChatGPT의 대화형 응답 제공</li>
    </ul>

    <h3>기술 스택</h3>
    <ul>
      <li><strong>봇 개발:</strong> Python (discord.py 라이브러리)</li>
      <li><strong>API:</strong> 기상청 오픈 API, Riot Games API, OpenAI GPT API</li>
      <li><strong>배포:</strong> Replit (또는 로컬 서버), dotenv로 키 관리</li>
    </ul>

    <h3>회고</h3>
    <p>
      단순한 연동을 넘어서 <strong>실제 서비스되는 API의 인증/요청/응답 구조</strong>를 실습할 수 있는 좋은 기회였습니다.
      특히 라이엇 API의 경우 <strong>Rate Limit 관리</strong>와 <strong>비동기 처리</strong>에 대한 이해도를 높일 수 있었으며,
      ChatGPT 기능은 챗봇 서비스의 기본 구조를 학습하는 데 도움을 주었습니다.
      추후엔 UI를 갖춘 Discord Dashboard로 확장하거나 웹서버와 연동하는 계획도 고려하고 있습니다.
    </p>
  `,
    portfolio: `
  <hr style="margin: 1rem 0;" />

  <h3>프로젝트 개요</h3>
  <p>
    <strong>프론트엔드 학습 및 포트폴리오 제작 웹사이트</strong>는 <strong>포트폴리오 사이트를 직접 구축</strong>하기 위해 기획된 개인 프로젝트입니다.
    HTML, CSS, JavaScript를 학습하며 UI/UX 기능 구현에 집중하였고, 
    ChatGPT와 Claude를 활용한 <strong>AI 프롬프트 설계 노트</strong>도 함께 정리한 학습 중심 웹사이트입니다.
  </p>

  <h3>프로젝트 목표</h3>
  <ul>
    <li>실제 구직용 포트폴리오 사이트를 직접 설계·구축</li>
    <li>Vanilla JS로 프로젝트 카드, 모달창, 무한스크롤 등 UI 구현 학습</li>
    <li>GPT 및 Claude 기반 AI 프롬프트 테스트 결과 정리</li>
  </ul>

  <h3>주요 기능</h3>
  <ul>
    <li><strong>모달 기반 상세 설명:</strong> 각 프로젝트 카드를 클릭하면 상세 설명 모달창 표시</li>
    <li><strong>무한 스크롤 구현:</strong> 프로젝트 목록을 무한 로딩 방식으로 표시</li>
    <li><strong>기술 필터링:</strong> 기술 태그를 기반으로 카드 필터링</li>
    <li><strong>이메일 전송 방식 개선:</strong> 초기 <code>mailto:</code> 링크 방식에서 <strong>Joey 메일 연동 방식</strong>으로 개선하여 브라우저 호환성 문제 해결</li>
  </ul>

  <h3>AI 프롬프트 학습 내용</h3>
  <ul>
    <li><strong>ChatGPT:</strong> 설명 문구 작성, 프로젝트 자동요약, 코드 피드백 등 실전 적용</li>
    <li><strong>Claude:</strong> 장문 작성 및 정보 구조화, 비교 정리 등 고급 활용법 학습</li>
  </ul>

  <h3>기술 스택</h3>
  <ul>
    <li><strong>Frontend:</strong> HTML, CSS, JavaScript</li>
    <li><strong>AI 활용:</strong> ChatGPT (GPT-4), Claude</li>
    <li><strong>배포:</strong> Vercel (커스텀 도메인 연결)</li>
  </ul>

  <h3>개선 경험</h3>
  <ul>
    <li><strong>프롬프트 설계:</strong> 사용자 시나리오에 따라 다양한 응답을 이끌어내는 프롬프트 구성</li>
    <li><strong>실용성 개선:</strong> <code>mailto:</code> 링크가 Gmail, Outlook 등 환경에서 작동하지 않는 이슈 → <strong>Joey 양식 도입</strong>으로 대체</li>
  </ul>

  <h3>회고</h3>
  <p>
    단순한 포트폴리오 사이트 구축을 넘어, <strong>프론트 기술과 생성형 AI</strong>를 공부하며 만들자는 주제로 확장한 학습 프로젝트였습니다.
    인터랙션 UI 구성에 대한 이해뿐 아니라, GPT/Claude 활용 경험을 통해 <strong>실제 업무에 적용 가능한 프롬프트 작성 역량</strong>도 향상시켰습니다.
    특히 <code>mailto</code>의 한계를 경험하고 <strong>대체 방법을 찾아가는 과정</strong>은 실용적 문제 해결 경험이었습니다.
  </p>
  `,
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
      // 유튜브 iframe 제거 (모달 닫을 때)
      const extraContent = modalBody.querySelector(".extra-content");
      if (extraContent) {
        const iframes = extraContent.querySelectorAll("iframe");
        iframes.forEach((iframe) => iframe.remove());
      }
    });
  });

  // 바깥 클릭 시 닫기
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
      // 유튜브 iframe 제거 (모달 닫을 때)
      const extraContent = modalBody.querySelector(".extra-content");
      if (extraContent) {
        const iframes = extraContent.querySelectorAll("iframe");
        iframes.forEach((iframe) => iframe.remove());
      }
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
