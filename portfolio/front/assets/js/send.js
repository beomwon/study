document.getElementById("sendBtn").addEventListener("click", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const mailto = `mailto:beomwon22@gmail.com?subject=${encodeURIComponent(
    name + "님의 문의"
  )}&body=${encodeURIComponent("이메일: " + email + "\n\n" + message)}`;
  window.location.href = mailto;
  console.log("메일 보내기 링크:", mailto);
});
