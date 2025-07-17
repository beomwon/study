async function spellCheck() {
  const text = document.getElementById("input-text").value;
  const response = await fetch("/api/spellcheck", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  const data = await response.json();
  const output = document.getElementById("output-area");

  let html = "";

  if (data.corrections && data.corrections.length > 0) {
    let temp = data.original;

    data.corrections.forEach((corr) => {
      const trimmedBefore = corr.before.trim();
      const trimmedAfter = corr.after.trim();

      // 변경이 없는 경우 (공백 제외) 무시
      if (trimmedBefore === trimmedAfter) return;

      // 공백만 다른 경우 스타일 다르게 표시
      if (corr.before !== corr.after && trimmedBefore === trimmedAfter) {
        temp = temp.replaceAll(
          corr.before,
          `<span class='spell-correct space-diff'>${corr.after}</span>`
        );
        return;
      }

      // 일반 수정 사항
      temp = temp.replaceAll(
        corr.before,
        `<span class='spell-correct'>${corr.after}</span>`
      );
    });

    // 마지막에 줄바꿈 처리
    temp = temp.replace(/\r\n|\n|\r/g, "<br />");
    html = `<div>${temp}</div>`;
  } else {
    html = `<div>맞춤법 오류 없음</div>`;
  }

  output.innerHTML = html;
}

window.spellCheck = spellCheck;
