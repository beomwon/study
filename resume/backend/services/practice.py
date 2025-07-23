from fastapi import UploadFile, File
from fastapi.responses import JSONResponse
# from backend.utils.gcs import upload_to_gcs
from backend.utils.gemini import generate_interview_insights_with_answers

async def make_question_and_analysis(resume_pdf: UploadFile, company_pdf: UploadFile = File(None)):
    # gcs_urls = upload_to_gcs(resume_pdf, company_pdf)
    # print("make_question_and_analysis:", resume_pdf.filename, company_pdf.filename if company_pdf else "No company file")
    result = await generate_interview_insights_with_answers(resume_pdf, company_pdf)
    # print(type(result))
    # print(result)
    # print('feedback:', result.get("feedback"), '\n')
    # print('strengths:', result.get("strengths"), '\n')
    # print('weaknesses:', result.get("weaknesses"), '\n')
    # print('questions:', result['questions'], '\n')
    # print('첫번째 질문 :', result['questions'][0]['question'])
    # print('첫번째 질문의 예시 답변 :', result['questions'][0]['example_answer'])
    # print(result.get("questions", [])[0]['question'])

    return JSONResponse({
        "success": True,
        "files": {
            "feedback": result.get("feedback"),
            "strengths": result.get("strengths"),
            "weaknesses": result.get("weaknesses"),
            "q1": result['questions'][0]['question'],
            "a1": result['questions'][0]['example_answer'],
            "q2": result['questions'][1]['question'],
            "a2": result['questions'][1]['example_answer'],
            "q3": result['questions'][2]['question'],
            "a3": result['questions'][2]['example_answer'],
            "q4": result['questions'][3]['question'],
            "a4": result['questions'][3]['example_answer']
        }
    })