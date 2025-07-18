from supabase import create_client
from config.settings import settings
from datetime import date

supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

def get_user_by_email(email):
    try:
        resp = supabase.table("users").select("*").eq("email", email).single().execute()
        return resp.data
    except Exception as e:
        # 결과가 없을 때 None 반환
        return None

def create_user(email: str, hashed_pw: str, nickname: str, created_at: date):
    resp = supabase.table("users").insert({
        "email": email,
        "password": hashed_pw,
        "nickname": nickname,
        "created_at": created_at
    }).execute()
    if resp.data and len(resp.data) > 0:
        return resp.data[0]
    return None