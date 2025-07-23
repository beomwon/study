// practice.js - 파일 업로드 UI 및 기본 동작

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".practice-form");
  const jobInput = document.getElementById("job-pdf");
  const resumeInput = document.getElementById("resume-pdf");
  const jobDropzone = document.getElementById("job-dropzone");
  const resumeDropzone = document.getElementById("resume-dropzone");
  const submitBtn = form.querySelector('button[type="submit"]');
  const loadingOverlay = document.getElementById("loading-overlay");

  function setupDropzone(dropzone, input) {
    // 클릭 시 파일 선택
    dropzone.addEventListener("click", () => input.click());

    // 드래그 오버 시 스타일 변경
    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.classList.add("dragover");
    });
    dropzone.addEventListener("dragleave", (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
    });
    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
      const files = e.dataTransfer.files;
      if (files && files[0]) {
        input.files = files;
        updateDropzoneText(dropzone, files[0].name);
      }
    });
    // 파일 선택 시 텍스트 변경
    input.addEventListener("change", () => {
      if (input.files && input.files[0]) {
        updateDropzoneText(dropzone, input.files[0].name);
      }
    });
  }

  function updateDropzoneText(dropzone, filename) {
    const text = dropzone.querySelector(".dropzone-text");
    text.textContent = filename
      ? `선택됨: ${filename}`
      : "여기에 파일을 끌어다 놓거나 클릭하세요";
  }

  setupDropzone(jobDropzone, jobInput);
  setupDropzone(resumeDropzone, resumeInput);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!resumeInput.files[0]) {
      alert("이력서 PDF를 첨부해 주세요.");
      return;
    }

    submitBtn.disabled = true;
    loadingOverlay.style.display = "flex";

    const formData = new FormData();
    if (jobInput.files[0]) {
      formData.append("job_pdf", jobInput.files[0]);
    }
    formData.append("resume_pdf", resumeInput.files[0]);

    fetch("/practice/send-file", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          throw new Error(data.message || "파일 업로드 실패");
        }

        // Store variables in localStorage (from data.files)
        localStorage.setItem("q1", data.files.q1);
        localStorage.setItem("q2", data.files.q2);
        localStorage.setItem("q3", data.files.q3);
        localStorage.setItem("q4", data.files.q4);
        localStorage.setItem("a1", data.files.a1);
        localStorage.setItem("a2", data.files.a2);
        localStorage.setItem("a3", data.files.a3);
        localStorage.setItem("a4", data.files.a4);
        localStorage.setItem("feedback", data.files.feedback);
        localStorage.setItem("strengths", JSON.stringify(data.files.strengths));
        localStorage.setItem(
          "weaknesses",
          JSON.stringify(data.files.weaknesses)
        );

        loadingOverlay.style.display = "none";
        submitBtn.disabled = false;
        window.location.href = `/practice/question`;
      })
      .catch((err) => {
        alert("업로드 실패: " + err.message);
      });
  });
});
