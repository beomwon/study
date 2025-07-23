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
      //asnwers를 로컬 저장소 ua1~ua4에 저장
      submitBtn.disabled = true;
      loadingOverlay.style.display = "flex";

      localStorage.setItem("ua1", answers[0]);
      localStorage.setItem("ua2", answers[1]);
      localStorage.setItem("ua3", answers[2]);
      localStorage.setItem("ua4", answers[3]);

      //로컬스토리지의 q1~q4, ua1~ua4를 서버에 전송하고, 응답을 기다린 후 /practice/result로 이동
      fetch("/practice/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questions: [
            localStorage.getItem("q1"),
            localStorage.getItem("q2"),
            localStorage.getItem("q3"),
            localStorage.getItem("q4"),
          ],
          userAnswers: [
            localStorage.getItem("ua1"),
            localStorage.getItem("ua2"),
            localStorage.getItem("ua3"),
            localStorage.getItem("ua4"),
          ],
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          localStorage.setItem("f1", data.files.f1);
          localStorage.setItem("f2", data.files.f2);
          localStorage.setItem("f3", data.files.f3);
          localStorage.setItem("f4", data.files.f4);
          // 성공적으로 제출된 후 결과 페이지로 이동
          loadingOverlay.style.display = "none";
          submitBtn.disabled = false;
          window.location.href = "/practice/result";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
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
