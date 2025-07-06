from datetime import date
from app.core import db

class TMIService:
    """TMI 관련 비즈니스 로직"""
    
    @staticmethod
    async def get_today_tmi():
        """오늘 날짜의 TMI 조회"""
        today = date.today().isoformat()
        
        result = db.get_client().table("tmi").select("*").eq("date", today).execute()
        
        if result.data:
            tmi_data = result.data[0]
            return {
                "date": tmi_data["date"],
                "content": tmi_data["content"]
            }
        else:
            return {
                "date": today,
                "content": "오늘의 TMI가 준비되지 않았습니다."
            }
