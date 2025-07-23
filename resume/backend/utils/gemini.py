from google import genai
from pydantic import BaseModel
from typing import List, Optional
from fastapi import UploadFile, File
import backend.config.settings as settings
import json

# Define Pydantic models for the response structure
class InterviewQuestion(BaseModel):
    question: str
    example_answer: str

class FeedbackAnalysis(BaseModel):
    feedback: str
    strengths: List[str]
    weaknesses: List[str]
    questions: Optional[List[InterviewQuestion]] = None

async def generate_interview_insights_with_answers(resume_pdf: UploadFile, company_pdf: UploadFile = File(None)):
    """
    Analyzes a resume and, optionally, a job posting to provide feedback,
    identify strengths and weaknesses, and generate interview questions.

    Args:
        resume_pdf (UploadFile): The candidate's resume in PDF format.
        company_pdf (UploadFile, optional): The company's job posting in PDF format.

    Returns:
        FeedbackAnalysis: An object containing the analysis result in JSON format.
    """
    client = genai.Client(api_key=settings.GOOGLE_APPLICATION_CREDENTIALS_JSON["ai_studio_api_key"])
    # print("Gemini client initialized successfully.")
    contents = []
    # Read and encode the resume PDF
    resume_bytes = await resume_pdf.read()
    resume_part = { "inline_data": { "data": resume_bytes, "mime_type": "application/pdf" } }
    contents.append(resume_part)
    prompt = """
        당신은 숙련된 기술 면접관입니다.
        주어진 [이력서]를 꼼꼼하게 분석하여, 면접자에게 도움이 될 피드백과 날카로운 면접 질문 4개, 그리고 그에 대한 모범 답변을 생성해야 합니다.

        당신의 역할:
        1.  **이력서 피드백**: 일반적인 기술 직무 면접관의 관점에서 이력서의 강점과 약점을 분석하고, 전반적인 총평을 작성합니다.
        2.  **면접 질문 및 모범 답변 생성**: 이력서 내용을 기반으로, 아래와 같은 유형의 질문 4개를 만들고, 각 질문에 대한 지원자의 훌륭한 답변 예시도 함께 작성해주세요.
            - 기술 심층 질문
            - 경험 기반 상황 질문
            - 답변하기 까다로운 질문
            - 이력서 기반 팩트체크 질문
        """
    
    if company_pdf:
        company_bytes = await company_pdf.read()
        company_part = { "inline_data": { "data": company_bytes, "mime_type": "application/pdf" } }
        contents.append(company_part)

        prompt = """
        당신은 우리 회사(구인공고를 낸 회사)의 숙련된 기술 면접관입니다.
        주어진 [구인공고]와 [이력서]를 꼼꼼하게 분석하여, 면접자에게 도움이 될 피드백과 날카로운 면접 질문 4개, 그리고 그에 대한 모범 답변을 생성해야 합니다.

        당신의 역할:
        1.  **이력서 피드백**: 구인공고의 요구사항과 비교하여 이력서의 강점과 약점을 분석하고, 전반적인 총평을 작성합니다.
        2.  **면접 질문 및 모범 답변 생성**: 이력서와 구인공고를 기반으로, 아래와 같은 유형의 질문 4개를 만들고, 각 질문에 대한 지원자의 훌륭한 답변 예시도 함께 작성해주세요.
            - 기술 심층 질문
            - 회사/직무 연관 질문
            - 답변하기 까다로운 질문
            - 이력서 기반 팩트체크 질문
        """
    contents.append(prompt)
    contents.append(
        "답변을 다음 JSON 형식으로 생성해 주세요: "
        '{"feedback": str, "strengths": list[str], "weaknesses": list[str], "questions": list[{"question": str, "example_answer": str}]}'
    )

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=contents,
        config={
            "response_mime_type": "application/json",
            "response_schema": FeedbackAnalysis
        }
    )
    # print(response.text)
    result = json.loads(response.text)
    return result
