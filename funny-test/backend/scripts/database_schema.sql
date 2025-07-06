# Supabase 테이블 생성 SQL

-- 페이지 조회수 테이블
CREATE TABLE page_views (
    id SERIAL PRIMARY KEY,
    page_name VARCHAR(100) UNIQUE NOT NULL,
    view_count INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TMI 테이블
CREATE TABLE tmi (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_page_views_page_name ON page_views(page_name);
CREATE INDEX idx_tmi_date ON tmi(date);

-- RLS (Row Level Security) 활성화 (필요한 경우)
-- ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE tmi ENABLE ROW LEVEL SECURITY;
