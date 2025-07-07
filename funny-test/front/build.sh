#!/bin/bash

# Vercel 빌드 시 환경변수를 HTML에 주입하는 스크립트

# 환경변수가 설정되어 있는지 확인
if [ -z "$VITE_SUPABASE_URL" ] || [ -z "$VITE_SUPABASE_ANON_KEY" ]; then
    echo "Warning: VITE_SUPABASE_URL 또는 VITE_SUPABASE_ANON_KEY 환경변수가 설정되지 않았습니다."
fi

# HTML 파일에서 플레이스홀더를 실제 환경변수 값으로 치환
sed -i "s|%VITE_SUPABASE_URL%|$VITE_SUPABASE_URL|g" index.html
sed -i "s|%VITE_SUPABASE_ANON_KEY%|$VITE_SUPABASE_ANON_KEY|g" index.html

echo "환경변수 주입이 완료되었습니다."
