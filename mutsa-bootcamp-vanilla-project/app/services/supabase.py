from supabase import create_client
from config.settings import settings
from datetime import date
import os


supabase = create_client(settings.SUPABASE_URL, os.environ.get("SUPABASE_SERVICE_ROLE_KEY"))
# supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)

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

def update_user_nickname(email: str, nickname: str):
    user = get_user_by_email(email)
    if not user:
        return None
    
    resp = supabase.table("users").update({"nickname": nickname}).eq("email", email).execute()
    if resp.data and len(resp.data) > 0:
        return resp.data[0]
    return None