from fastapi import APIRouter, UploadFile, File, Form, HTTPException

router = APIRouter()

@router.post("/start-test")
async def start_test(
    resume: UploadFile = File(...),
    resume_consent: bool = Form(...),
    camera_consent: bool = Form(...),
    anonymous_id: str = Form(...)
):
    # if not resume_consent or not camera_consent:
    #     raise HTTPException(status_code=400, detail="모든 약관에 동의해야 합니다.")

    # # 이력서 파일 저장 예시 (원하면)
    # contents = await resume.read()
    # with open(f"resumes/{anonymous_id}_{resume.filename}", "wb") as f:
    #     f.write(contents)

    # 이후 로직 처리...
    print(f"Resume consent: {resume_consent}, Camera consent: {camera_consent}, Anonymous ID: {anonymous_id}")
    return {"status": 0, "message": anonymous_id}