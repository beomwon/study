// send.js
emailjs.init("YOUR_USER_ID"); // 환경변수로 관리

function sendEmail() {
  emailjs
    .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
      from_name: document.getElementById("name").value,
      from_email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    })
    .then(
      function (response) {
        alert("이메일이 성공적으로 전송되었습니다!");
      },
      function (error) {
        alert("이메일 전송에 실패했습니다.");
      }
    );
}

document.getElementById("sendBtn").addEventListener("click", function (e) {
  e.preventDefault();
  sendEmail();
});
