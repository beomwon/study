from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter()

# 개인 정보 샘플 데이터
personal_info = {
    "name": "홍길동",
    "title": "Full Stack Developer",
    "email": "example@email.com",
    "phone": "010-0000-0000",
    "location": "Seoul, Korea",
    "bio": "안녕하세요! 풀스택 개발자 홍길동입니다. 다양한 기술스택을 활용하여 사용자 친화적인 웹 애플리케이션을 개발합니다.",
    "skills": {
        "frontend": ["HTML", "CSS", "JavaScript", "React", "Vue.js"],
        "backend": ["Python", "FastAPI", "Django", "Node.js"],
        "database": ["PostgreSQL", "MySQL", "MongoDB"],
        "tools": ["Git", "Docker", "AWS", "Vercel"]
    },
    "education": [
        {
            "school": "OO대학교",
            "degree": "컴퓨터공학과",
            "period": "2018-2022",
            "description": "컴퓨터공학 전공, 웹 개발 동아리 활동"
        }
    ],
    "experience": [
        {
            "company": "OO 회사",
            "position": "주니어 개발자",
            "period": "2022-현재",
            "description": "웹 애플리케이션 개발 및 유지보수"
        }
    ]
}

@router.get("/profile")
async def get_profile():
    """개인 프로필 정보를 반환합니다."""
    return personal_info

@router.get("/skills")
async def get_skills():
    """기술 스택 정보를 반환합니다."""
    return personal_info["skills"]

@router.get("/education")
async def get_education():
    """학력 정보를 반환합니다."""
    return personal_info["education"]

@router.get("/experience")
async def get_experience():
    """경력 정보를 반환합니다."""
    return personal_info["experience"]

@router.get("/contact")
async def get_contact():
    """연락처 정보를 반환합니다."""
    return {
        "email": personal_info["email"],
        "phone": personal_info["phone"],
        "location": personal_info["location"]
    }
