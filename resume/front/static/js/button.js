import { getOrCreateUserId } from "./utils.js";

const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", () => {
  if (!document.getElementById("resume-input").files.length) {
    alert("이력서 파일을 업로드해주세요.");
    return;
  }

  const formData = new FormData();
  formData.append("resume", document.getElementById("resume-input").files[0]);

  const userId = getOrCreateUserId(); // ← 추가
  formData.append("anonymous_id", userId); // ← 백엔드에 보냄

  fetch("/api/start-test", {
    method: "POST",
    body: formData,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  }).then((response) => {
    if (response.ok) {
      window.location.href = "/test";
    } else {
      alert("업로드 실패");
    }
  });
});
