from supabase import create_client, Client
from config import settings

class Database:
    def __init__(self):
        self.supabase: Client = create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_KEY
        )
    
    def get_client(self) -> Client:
        """Supabase 클라이언트 반환"""
        return self.supabase

# 데이터베이스 인스턴스
db = Database()
