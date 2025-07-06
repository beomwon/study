from datetime import datetime
from app.core import db
from app.models import PageView

class PageViewService:
    """페이지 조회수 관련 비즈니스 로직"""
    
    @staticmethod
    async def get_all_page_views():
        """모든 페이지 조회수 조회"""
        result = db.get_client().table("page_views").select("page_name, view_count").execute()
        return {item["page_name"]: item["view_count"] for item in result.data}
    
    @staticmethod
    async def increase_page_view(page_name: str):
        """페이지 조회수 1 증가"""
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
            
            return {"page_name": page_name, "view_count": new_count}
        else:
            # 새 페이지라면 추가
            db.get_client().table("page_views").insert({
                "page_name": page_name,
                "view_count": 1
            }).execute()
            
            return {"page_name": page_name, "view_count": 1}
