// result.js: 결과 페이지 동작

document.addEventListener("DOMContentLoaded", () => {
  // 데이터 읽기
  const questions = [
    localStorage.getItem("q1"),
    localStorage.getItem("q2"),
    localStorage.getItem("q3"),
    localStorage.getItem("q4"),
  ];
  const aiAnswers = [
    localStorage.getItem("a1"),
    localStorage.getItem("a2"),
    localStorage.getItem("a3"),
    localStorage.getItem("a4"),
  ];
  const userAnswers = [
    localStorage.getItem("ua1"),
    localStorage.getItem("ua2"),
    localStorage.getItem("ua3"),
    localStorage.getItem("ua4"),
  ];
  const feedbacks = [
    localStorage.getItem("f1"),
    localStorage.getItem("f2"),
    localStorage.getItem("f3"),
    localStorage.getItem("f4"),
  ];
  const strengths = JSON.parse(localStorage.getItem("strengths") || "[]");
  const weaknesses = JSON.parse(localStorage.getItem("weaknesses") || "[]");
  const resumeFeedback = localStorage.getItem("feedback") || "";

  // 이력서 피드백
  document.getElementById("resume-feedback").textContent = resumeFeedback;

  // 강점
  const strengthsList = document.getElementById("strengths-list");
  strengthsList.innerHTML = "";
  strengths.forEach((s) => {
    const li = document.createElement("li");
    li.textContent = s;
    strengthsList.appendChild(li);
  });

  // 약점
  const weaknessesList = document.getElementById("weaknesses-list");
  weaknessesList.innerHTML = "";
  weaknesses.forEach((w) => {
    const li = document.createElement("li");
    li.textContent = w;
    weaknessesList.appendChild(li);
  });

  // 면접 질문 및 답변
  const interviewList = document.getElementById("interview-list");
  interviewList.innerHTML = "";
  questions.forEach((q, i) => {
    if (!q) return;
    const li = document.createElement("li");
    li.innerHTML = `<span>${q}</span><br/>
      <span><b>내 답변</b><br/> ${userAnswers[i] || ""}</span><br/>
      <span><b>답변에 대한 피드백</b><br/> ${feedbacks[i] || ""}</span><br/>
      <span><b>참고할만한 AI 답변</b><br/> ${aiAnswers[i] || ""}</span><br/>
      `;
    interviewList.appendChild(li);
  });

  document.getElementById("back-btn").onclick = () => {
    window.location.href = "/";
  };

  // PDF 저장 버튼
  const saveBtn = document.getElementById("save-pdf-btn");
  if (saveBtn) {
    saveBtn.onclick = function () {
      const element = document.getElementById("result-content");
      // 임시 div 생성 및 innerHTML 복사, PDF용 스타일 추가
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = `
        <style>
          ul, ol { margin-bottom: 16px; }
          li { margin-bottom: 8px; }
          h2 { margin-top: 24px; margin-bottom: 12px; }
          p { margin-bottom: 12px; }
          span { line-height: 1.5; }
        </style>
        ${element.innerHTML}
      `;
      tempDiv.style.color = "#000";
      tempDiv.style.padding = "20px";
      tempDiv.style.background = "#fff";
      tempDiv.style.width = "100%";
      tempDiv.style.boxSizing = "border-box";
      document.body.appendChild(tempDiv);
      html2pdf()
        .set({
          margin: 10,
          filename: "aierview-면접피드백.pdf",
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { orientation: "portrait" },
          pagebreak: { mode: ["avoid-all", "css", "legacy"] },
        })
        .from(tempDiv)
        .save()
        .then(() => {
          document.body.removeChild(tempDiv);
        });
    };
  }
});
