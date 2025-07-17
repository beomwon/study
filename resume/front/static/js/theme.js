// theme.js: 다크/라이트 모드 토글
const themeToggle = document.getElementById("theme-toggle");
function setTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}
function toggleTheme() {
  const current = document.body.getAttribute("data-theme") || "light";
  setTheme(current === "dark" ? "light" : "dark");
}
themeToggle.addEventListener("click", toggleTheme);
// 초기 테마 설정
const saved = localStorage.getItem("theme") || "light";
setTheme(saved);
