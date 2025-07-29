import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import config.settings as settings

def send_auth_code(recipient: str):
    import random, string
    # 로그인 정보
    gmail_user = settings.GOOGLE_ID
    gmail_password = settings.GOOGLE_PASSWORD

    # 인증번호 생성 (대문자+숫자 6자리)
    code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))

    # 이메일 내용 설정
    sender = gmail_user
    subject = '[책갈피] 인증번호 안내'
    body = f'''
    <html>
      <body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 24px;">
        <div style="max-width: 400px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #eee; padding: 24px;">
          <h2 style="color: #2d7ef7;">이메일 인증번호 안내</h2>
          <p>아래 인증번호를 입력해주세요.</p>
          <div style="font-size: 2em; letter-spacing: 0.3em; font-weight: bold; color: #333; background: #f0f4ff; padding: 12px; border-radius: 6px; text-align: center; margin: 16px 0;">
            {code}
          </div>
          <p style="color: #888; font-size: 0.95em;">본 인증번호는 5분간 유효합니다.</p>
        </div>
      </body>
    </html>
    '''

    # 메시지 구성
    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'html'))

    # SMTP 서버에 연결하여 이메일 전송
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(gmail_user, gmail_password)
        server.send_message(msg)

    return code

if __name__ == "__main__":
    recipient_email = "beomwon22@gmail.com"
    send_auth_code(recipient_email)