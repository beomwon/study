from bs4 import BeautifulSoup
from pydantic import BaseModel
import requests, openai, json
import settings


async def check_spelling(original: str):
    openai.api_key = settings.GROQ_API_KEY
    openai.api_base = "https://api.groq.com/openai/v1"
    openai.api_type = "openai"

    prompt = f"""
너는 한국어 원문을 교정해주는 AI야. 다음 원문을 맞춤법, 띄어쓰기, 자음이나 모음만 있는 것들을 모두 고쳐.
주어진 원문을 반환형식에 맞춰서 반환형식만 줘. 다른 미사어구를 붙이지마.

원문: "{original}"
반환형식:
{{
  "original": "...",
  "corrected": "...",
  "corrections": [{{ "before": "...", "after": "..." }}, ...]
}}
"""

    try:
        response = openai.ChatCompletion.create(
            model="llama3-8b-8192",
            messages=[
                {"role": "system", "content": "너는 한국어 교정 전문가야."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.2
        )

        print(f"Response: {response}")
        corrected = response["choices"][0]["message"]["content"]

        # JSON 문자열로 응답이 올 테니 안전하게 파싱
        try:
            parsed = json.loads(corrected)
        except json.JSONDecodeError:
            # corrected가 JSON 형식이 아닐 경우 처음으로 시작하는 { 와 마지막 } 사이의 부분만 추출
            start = corrected.find('{')
            end = corrected.rfind('}')
            if start != -1 and end != -1:
                corrected = corrected[start:end + 1]
                parsed = json.loads(corrected)
                return parsed
            else:
                return {
                    "original": original,
                    "corrected": original,
                    "corrections": [],
                    "error": str(e)
                }

        return parsed

    except Exception as e:
        print(f"Error during spell check: {e}")
        return {
            "original": original,
            "corrected": original,
            "corrections": [],
            "error": str(e)
        }
    

# 1안
# 너는 한국어 문장을 교정해주는 AI야. 다음 문장을 맞춤법, 띄어쓰기, 표현 오류 없이 고쳐.
# 그리고 수정된 부분들을 "before", "after" 쌍으로 JSON 배열로 반환해줘. 다른 대답을 하지말고, 반환형식만 지켜.

# 원문: "{original}"

# 반환 형식:
# {{
#   "original": "...",
#   "corrected": "...",
#   "corrections": [{{ "before": "...", "after": "..." }}, ...]
# }}