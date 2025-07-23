// question.js - 질문 텍스트 동적 삽입

document.addEventListener("DOMContentLoaded", () => {
  // 질문 목록 가져오기
  const questions = [
    localStorage.getItem("q1") || "질문 1",
    localStorage.getItem("q2") || "질문 2",
    localStorage.getItem("q3") || "질문 3",
    localStorage.getItem("q4") || "질문 4",
  ];
  // 답변 저장용
  const answers = ["", "", "", ""];
  let currentIdx = 0;

  const label = document.getElementById("question-label");
  const textarea = document.getElementById("answer-input");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const form = document.querySelector(".practice-form");

  function updateUI() {
    label.textContent = `Q${currentIdx + 1}. ${questions[currentIdx]}`;
    textarea.value = answers[currentIdx];
    prevBtn.disabled = currentIdx === 0;
    if (currentIdx === questions.length - 1) {
      nextBtn.textContent = "제출하기";
    } else {
      nextBtn.textContent = "다음";
    }
  }

  // 답변 입력시 저장
  textarea.addEventListener("input", (e) => {
    answers[currentIdx] = e.target.value;
  });

  // 이전 버튼
  prevBtn.addEventListener("click", () => {
    if (currentIdx > 0) {
      currentIdx--;
      updateUI();
      textarea.focus();
    }
  });

  // 다음/제출 버튼
  nextBtn.addEventListener("click", () => {
    if (currentIdx < questions.length - 1) {
      currentIdx++;
      updateUI();
      textarea.focus();
    } else {
      // 제출 로직 (예시: 콘솔 출력)
      console.log("제출된 답변:", answers);
      // 실제 제출 처리 필요시 여기에 추가
      alert("답변이 제출되었습니다!");
    }
  });

  // Enter로 다음 질문 이동 (Shift+Enter는 줄바꿈)
  textarea.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (currentIdx < questions.length - 1) {
        nextBtn.click();
      }
    }
  });

  // 폼 제출 방지
  form.addEventListener("submit", function (e) {
    e.preventDefault();
  });

  updateUI();
});
