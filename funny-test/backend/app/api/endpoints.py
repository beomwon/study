from fastapi import APIRouter, HTTPException
from app.models import APIResponse
from app.services import PageViewService, TMIService

router = APIRouter(tags=["api"])

@router.get("/page-views", response_model=APIResponse)
async def get_all_page_views():
    """모든 페이지 조회수 조회 (초기 로딩용)"""
    try:
        page_views = await PageViewService.get_all_page_views()
        
        return APIResponse(
            success=True,
            message="모든 페이지 조회수를 성공적으로 조회했습니다.",
            data={"page_views": page_views}
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/page-view/{page_name}", response_model=APIResponse)
async def increase_page_view(page_name: str):
    """페이지 조회수 1 증가"""
    try:
        result = await PageViewService.increase_page_view(page_name)
        
        return APIResponse(
            success=True,
            message="페이지 조회수가 증가했습니다.",
            data=result
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/tmi", response_model=APIResponse)
async def get_today_tmi():
    """오늘 날짜의 TMI 조회"""
    try:
        result = await TMIService.get_today_tmi()
        
        return APIResponse(
            success=True,
            message="오늘의 TMI를 성공적으로 조회했습니다.",
            data=result
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
