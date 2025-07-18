document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.getElementById("start-btn");
  if (!startBtn) return;

  startBtn.addEventListener("click", () => {
    const resumeConsent = document.getElementById("resume-consent").checked;
    const cameraConsent = document.getElementById("camera-consent").checked;

    if (!resumeConsent || !cameraConsent) {
      alert("모든 약관에 동의하셔야 시작할 수 있습니다.");
      return;
    }

    const resumeInput = document.getElementById("resume-input");
    if (!resumeInput.files.length) {
      alert("이력서 파일을 업로드해주세요.");
      return;
    }

    // 익명 사용자 ID 생성
    // 로컬 스토리지에서 ID를 가져오거나 없으면 새로 생성
    let userId = localStorage.getItem("anonymous_user_id");
    if (!userId) {
      userId = crypto.randomUUID(); // 브라우저에서 UUID 생성
      localStorage.setItem("anonymous_user_id", userId);
    }

    // 서버에 데이터 전송
    const formData = new FormData();
    formData.append("resume", resumeInput.files[0]);
    formData.append("resume_consent", resumeConsent);
    formData.append("camera_consent", cameraConsent);
    formData.append("anonymous_id", userId);

    fetch("/api/start-test", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status) {
          window.location.href = "/page/test";
        } else {
          alert(res.message);
        }
      })
      .catch((err) => {
        alert("서버와 통신 중 오류가 발생했습니다.");
      });
  });
});
