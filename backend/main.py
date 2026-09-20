import json
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Vocabulary App API")

# React 개발 서버 및 로컬 접속 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

WORDS_FILE = os.path.join(os.path.dirname(__file__), "words.json")

def get_word_data() -> dict:
    if not os.path.exists(WORDS_FILE):
        return {}
    with open(WORDS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

@app.get("/api/pages")
def get_pages():
    """모든 페이지 목록 및 각 페이지별 단어 수 반환"""
    data = get_word_data()
    return [{"name": page_name, "count": len(words)} for page_name, words in data.items()]

@app.get("/api/pages/{page_name}")
def get_page_words(page_name: str):
    """특정 페이지 단어 리스트 반환"""
    data = get_word_data()
    if page_name not in data:
        raise HTTPException(status_code=404, detail="Page not found")
    return data[page_name]

@app.get("/api/words/all")
def get_all_words():
    """전체 페이지 단어 반환 (별표 모아보기용)"""
    data = get_word_data()
    all_words = []
    for page_name, words in data.items():
        for item in words:
            all_words.append({**item, "source_page": page_name})
    return all_words
