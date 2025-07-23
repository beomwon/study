from fastapi import UploadFile, File
from fastapi.responses import JSONResponse
# from backend.utils.gcs import upload_to_gcs
from backend.utils.gemini import generate_interview_insights_with_answers, generate_feedback

async def make_question_and_analysis(resume_pdf: UploadFile, company_pdf: UploadFile = File(None)):
    result = await generate_interview_insights_with_answers(resume_pdf, company_pdf)

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

async def make_feedback(questions, userAnswers):
    result = await generate_feedback(questions, userAnswers)
    return JSONResponse({
        "success": True,
        "files": {
            "f1": result["feedbacks"][0],
            "f2": result["feedbacks"][1],
            "f3": result["feedbacks"][2],
            "f4": result["feedbacks"][3],
        }
    })