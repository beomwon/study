from fastapi import UploadFile, File
from fastapi.responses import JSONResponse
from backend.utils.gcs import upload_to_gcs

async def make_question_and_analysis(resume_pdf: UploadFile, company_pdf: UploadFile = File(None)):

    gcs_urls = upload_to_gcs(resume_pdf, company_pdf)

    return JSONResponse({
        "success": True,
        "files": {
            "resume": gcs_urls.get("resume"),
            "company": gcs_urls.get("company")
        },
        "gcs_urls": gcs_urls
    })

    # # Gemini API 호출
    # import requests
    # gemini_api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=YOUR_GEMINI_API_KEY"  # 실제 키로 수정 필요
    # prompt = ""
    # if gcs_urls.get("job"):
    #     prompt += f"구인공고 PDF: {gcs_urls['job']}\n"
    #     prompt += "구인공고에 맞는 면접관이 되어 질문 5가지와 답변, 이력서 평가를 해주세요.\n"
    # else:
    #     prompt += "이력서 PDF만 있습니다. 이력서를 분석하고 면접관이 되어 질문 5가지와 답변, 평가를 해주세요.\n"
    # prompt += f"이력서 PDF: {gcs_urls.get('resume','')}\n"

    # gemini_payload = {
    #     "contents": [
    #         {"parts": [{"text": prompt}]}
    #     ]
    # }
    # gemini_resp = requests.post(gemini_api_url, json=gemini_payload)
    # gemini_data = gemini_resp.json() if gemini_resp.ok else {"error": "Gemini API 호출 실패"}

    # return JSONResponse({
    #     "success": True,
    #     "files": files,
    #     "gcs_urls": gcs_urls,
    #     "gemini": gemini_data
    # })