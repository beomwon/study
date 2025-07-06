from fastapi import APIRouter, HTTPException
from datetime import datetime, date
from models import APIResponse
from database import db

router = APIRouter(tags=["api"])

@router.get("/page-views", response_model=APIResponse)
async def get_all_page_views():
    """모든 페이지 조회수 조회 (초기 로딩용)"""
    try:
        result = db.get_client().table("page_views").select("page_name, view_count").execute()
        
        # 딕셔너리 형태로 변환 (page_name: view_count)
        page_views = {item["page_name"]: item["view_count"] for item in result.data}
        
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
        # 기존 페이지 조회수 확인
        result = db.get_client().table("page_views").select("*").eq("page_name", page_name).execute()
        
        if result.data:
            # 기존 페이지가 있으면 조회수 증가
            current_count = result.data[0]["view_count"]
            new_count = current_count + 1
            
            db.get_client().table("page_views").update({
                "view_count": new_count,
                "updated_at": datetime.now().isoformat()
            }).eq("page_name", page_name).execute()
            
            return APIResponse(
                success=True,
                message="페이지 조회수가 증가했습니다.",
                data={
                    "page_name": page_name,
                    "view_count": new_count
                }
            )
        else:
            # 새 페이지라면 추가
            db.get_client().table("page_views").insert({
                "page_name": page_name,
                "view_count": 1
            }).execute()
            
            return APIResponse(
                success=True,
                message="새 페이지 조회수가 기록되었습니다.",
                data={
                    "page_name": page_name,
                    "view_count": 1
                }
            )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/tmi", response_model=APIResponse)
async def get_today_tmi():
    """오늘 날짜의 TMI 조회"""
    try:
        today = date.today().isoformat()
        
        # 오늘 날짜의 TMI 조회
        result = db.get_client().table("tmi").select("*").eq("date", today).execute()
        
        if result.data:
            tmi_data = result.data[0]
            return APIResponse(
                success=True,
                message="오늘의 TMI를 성공적으로 조회했습니다.",
                data={
                    "date": tmi_data["date"],
                    "content": tmi_data["content"]
                }
            )
        else:
            return APIResponse(
                success=False,
                message="오늘의 TMI 데이터가 없습니다.",
                data={
                    "date": today,
                    "content": "오늘의 TMI가 준비되지 않았습니다."
                }
            )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
