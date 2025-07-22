// result.js: 결과 페이지 동작

document.addEventListener("DOMContentLoaded", () => {
  // 백엔드에서 전달받은 데이터가 window.resultData에 있다고 가정
  const result = window.resultData || {};
  const container = document.getElementById("result-content");

  if (!result || !result.questions) {
    container.innerHTML = "<p>결과 데이터를 불러올 수 없습니다.</p>";
    return;
  }

  let html = "";
  if (result.jobInfo) {
    html += `<h2>구인공고 분석</h2><p>${result.jobInfo}</p>`;
  }
  html += `<h2>이력서 분석</h2><p>${result.resumeInfo}</p>`;
  html += "<h2>면접 질문 및 답변</h2><ol>";
  result.questions.forEach((q, i) => {
    html += `<li><strong>Q${i + 1}. ${q.question}</strong><br><span>A: ${
      q.answer
    }</span></li>`;
  });
  html += "</ol>";
  html += `<h2>이력서 평가</h2><p>${result.evaluation}</p>`;

  container.innerHTML = html;

  document.getElementById("back-btn").onclick = () => {
    window.location.href = "/practice/file-upload";
  };
});
