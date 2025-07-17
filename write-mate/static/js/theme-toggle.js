// theme-toggle.js: 다크/라이트 모드 토글 스크립트
export function setupThemeToggle(btnId = "themeToggleBtn") {
  const themeBtn = document.getElementById(btnId);
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (themeBtn) themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  }
  // 초기 테마 적용
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) setTheme(savedTheme);
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "light"
          : "dark";
      setTheme(current);
    });
  }
}
