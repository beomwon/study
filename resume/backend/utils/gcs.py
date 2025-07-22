import os, time
from google.cloud import storage
import google.auth
import backend.config.settings as settings
from fastapi import UploadFile, File

BUCKET_NAME = settings.GOOGLE_APPLICATION_CREDENTIALS_JSON["bucket_name"]
PROJECT_ID = settings.GOOGLE_APPLICATION_CREDENTIALS_JSON["project_id"]

try:
    STORAGE_CLIENT = storage.Client(project=PROJECT_ID)
    print("Google Cloud Storage client initialized successfully.")

except Exception as e:
    print(f"Error initializing Google Cloud Storage client: {e}")
    print("Please ensure GOOGLE_APPLICATION_CREDENTIALS or GOOGLE_APPLICATION_CREDENTIALS_JSON is set correctly.")

def upload_to_gcs(resume_pdf: UploadFile, company_pdf: UploadFile = File(None)):
    result = {}
    # 파일이름과 현재 시간을 이용하여 HASH 생성
    for file_obj, name in [(resume_pdf, "resume"), (company_pdf, "company")]:
        if not file_obj:
            continue

        # 파일 이름에 현재 시간을 추가하여 중복 방지
        file_name = f"{name}_{file_obj.filename}_{int(time.time())}.pdf"
        bucket = STORAGE_CLIENT.bucket(BUCKET_NAME)
        blob = bucket.blob(file_name)
        blob.upload_from_file(file_obj.file, content_type="application/pdf")
        gcs_uri = f"gs://{BUCKET_NAME}/{file_name}"
        result[name] = gcs_uri
        print(f"File {file_name} uploaded to GCS at {gcs_uri}")

    return result