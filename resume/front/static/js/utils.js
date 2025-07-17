// user-id.js: 유저 ID 생성 및 저장
function getOrCreateUserId() {
  let userId = localStorage.getItem("anonymous_user_id");
  if (!userId) {
    userId = crypto.randomUUID(); // 브라우저에서 UUID 생성
    localStorage.setItem("anonymous_user_id", userId);
  }
  return userId;
}
