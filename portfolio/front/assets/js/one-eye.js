document.addEventListener("DOMContentLoaded", function () {
  //   스킬 블러 처리
  const selector = document.querySelectorAll(".skill-selector > div");
  const items = document.querySelectorAll(".skill-item");

  selector.forEach((menu) => {
    menu.addEventListener("click", function () {
      // 메뉴 active 처리
      selector.forEach((m) => m.classList.remove("active"));
      menu.classList.add("active");

      const type = menu.classList[0]; // all, backend, ai, communication, etc

      if (type === "all") {
        items.forEach((item) => item.classList.remove("blur"));
      } else {
        items.forEach((item) => {
          if (!item.classList.contains(type)) {
            item.classList.add("blur");
          } else {
            item.classList.remove("blur");
          }
        });
      }
    });
  });

  // 스킬 툴팁 처리
  document.querySelectorAll(".skill-item").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      if (item.classList.contains("blur")) return;
      const old = item.querySelector(".skill-tooltip");
      if (old) old.remove();
      const skill = item.dataset.skill || "";
      const level = parseInt(item.dataset.level || "0", 10);
      const period = item.dataset.period || "";
      const usage = item.dataset.usage || "";
      let levelText = "하";
      if (level >= 8) levelText = "상";
      else if (level >= 4) levelText = "중";
      const tooltip = document.createElement("div");
      tooltip.className = "skill-tooltip";
      tooltip.innerHTML = `
        <div class=\"skill-tooltip-title\">${skill}</div>
        <div class=\"skill-tooltip-info\"><b>숙련도</b>: ${levelText}</div>
        <div class=\"skill-tooltip-info\"><b>사용기간</b>: ${period}</div>
        <div class=\"skill-tooltip-info\"><b>활용</b>: ${usage}</div>
      `;
      item.appendChild(tooltip);
      setTimeout(() => {
        tooltip.style.opacity = 1;
      }, 10);
    });
    item.addEventListener("mouseleave", function () {
      const tooltip = item.querySelector(".skill-tooltip");
      if (tooltip) tooltip.remove();
    });
  });

  document.querySelectorAll(".view-detail").forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      content.style.display =
        content.style.display === "block" ? "none" : "block";

      if (button.textContent.includes("보기")) {
        button.textContent = button.textContent.replace("보기", "가리기");
      } else {
        button.textContent = button.textContent.replace("가리기", "보기");
      }
    });
  });
});
