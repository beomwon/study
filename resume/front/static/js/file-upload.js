// file-upload.js: 파일 업로드 및 드래그&드롭
const fileUpload = document.getElementById('file-upload');
const fileInput = document.getElementById('resume-input');
const filePreview = document.getElementById('file-preview');

fileUpload.addEventListener('dragover', (e) => {
  e.preventDefault();
  fileUpload.classList.add('dragover');
});
fileUpload.addEventListener('dragleave', (e) => {
  e.preventDefault();
  fileUpload.classList.remove('dragover');
});
fileUpload.addEventListener('drop', (e) => {
  e.preventDefault();
  fileUpload.classList.remove('dragover');
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    fileInput.files = files;
    showFilePreview(files[0]);
  }
});
fileInput.addEventListener('change', (e) => {
  if (fileInput.files.length > 0) {
    showFilePreview(fileInput.files[0]);
  }
});
function showFilePreview(file) {
  filePreview.textContent = `선택된 파일: ${file.name}`;
}
