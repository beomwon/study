async function countChars() {
  const text = document.getElementById("input-text").value;
  const response = await fetch("/api/charcount", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  const data = await response.json();
  // 공백 제외 글자수 계산
  const noSpaceCount = text.replace(/\s/g, "").length;
  // 결과 표시
  document.getElementById(
    "charCountResult"
  ).textContent = `글자수: ${data.chars} (공백제외: ${noSpaceCount})`;
}

window.countChars = countChars;
