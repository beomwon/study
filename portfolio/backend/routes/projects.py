from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter()

# 샘플 프로젝트 데이터
sample_projects = [
    {
        "id": 1,
        "title": "재미있는 테스트 사이트",
        "description": "다양한 심리테스트와 운세를 제공하는 웹사이트",
        "tech_stack": ["Python", "FastAPI", "HTML", "CSS", "JavaScript"],
        "github_url": "https://github.com/username/funny-test",
        "demo_url": "https://example.com",
        "image_url": "/images/funny-test.png",
        "status": "completed"
    },
    {
        "id": 2,
        "title": "포트폴리오 사이트",
        "description": "개인 포트폴리오를 소개하는 웹사이트",
        "tech_stack": ["FastAPI", "HTML", "CSS", "JavaScript"],
        "github_url": "https://github.com/username/portfolio",
        "demo_url": "https://example.com",
        "image_url": "/images/portfolio.png",
        "status": "in_progress"
    }
]

@router.get("/", response_model=List[Dict[str, Any]])
async def get_all_projects():
    """모든 프로젝트 목록을 반환합니다."""
    return sample_projects

@router.get("/{project_id}", response_model=Dict[str, Any])
async def get_project(project_id: int):
    """특정 프로젝트의 상세 정보를 반환합니다."""
    project = next((p for p in sample_projects if p["id"] == project_id), None)
    if not project:
        return {"error": "Project not found"}
    return project

@router.get("/category/{tech}")
async def get_projects_by_tech(tech: str):
    """특정 기술스택을 사용한 프로젝트들을 반환합니다."""
    filtered_projects = [
        p for p in sample_projects 
        if any(t.lower() == tech.lower() for t in p["tech_stack"])
    ]
    return filtered_projects
