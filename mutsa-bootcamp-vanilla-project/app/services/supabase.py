import re
from supabase import create_client
from config.settings import settings
from datetime import date
import os, logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# supabase = create_client(settings.SUPABASE_URL, os.environ.get("SUPABASE_SERVICE_ROLE_KEY"))
supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)

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

def supabase_update_user_nickname(email: str, nickname: str):
    user = get_user_by_email(email)
    if not user:
        return None
    
    try:
        resp = supabase.table("users").update({"nickname": nickname}).eq("email", email).execute()
    except Exception as e:
        logger.error(f"Error updating nickname: {e}")
        return None
    if resp.data and len(resp.data) > 0:
        return resp.data[0]
    return None

def get_reading_logs(user_id: str):
    try:
        resp = supabase.table("reading_logs") \
            .select("*") \
            .eq("user_id", user_id) \
            .order("created_at", desc=True) \
            .execute()
        return resp.data
    except Exception as e:
        logger.error(f"Error fetching reading logs: {e}")
        return []
    
def create_review(review: dict):
    try:
        resp = supabase.table("reading_logs").insert(review).execute()
        if resp.data and len(resp.data) > 0:
            return resp.data[0]
        return True
    except Exception as e:
        logger.error(f"Error creating review: {e}")
        return False
    
def get_user_reviews(user_id: str):
    try:
        resp = supabase.table("reading_logs") \
            .select("*") \
            .eq("user_id", user_id) \
            .order("created_at", desc=True) \
            .execute()
        return resp.data
    except Exception as e:
        logger.error(f"Error fetching user reviews: {e}")
        return []
    
def get_user_review(user_id: str, isbn13: str):
    try:
        resp = supabase.table("reading_logs") \
            .select("*") \
            .eq("user_id", user_id) \
            .eq("isbn13", isbn13) \
            .single() \
            .execute()
        return resp.data
    except Exception as e:
        logger.error(f"Error fetching user review: {e}")
        return None

def get_public_reading_logs():
    try:
        # users 테이블의 nickname도 조인해서 가져오기
        resp = supabase.table("reading_logs") \
            .select("*, users:nickname") \
            .eq("public", True) \
            .order("created_at", desc=True) \
            .execute()
        return resp.data
    except Exception as e:
        logger.error(f"Error fetching reading logs: {e}")
        return []