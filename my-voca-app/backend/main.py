from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

# React 로컬/배포 서버와 통신 허용 (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def load_words():
    with open("words.json", "r", encoding="utf-8") as f:
        return json.load(f)

# 1. 전체 페이지 목록 및 단어 수 반환
@app.get("/api/pages")
def get_pages():
    data = load_words()
    return [{"page": k, "count": len(v)} for k, v in data.items()]

# 2. 특정 페이지 단어 목록 반환
@app.get("/api/pages/{page_name}")
def get_page_words(page_name: str):
    data = load_words()
    if page_name not in data:
        raise HTTPException(status_code=404, detail="Page not found")
    return data[page_name]

# 3. 전체 단어 반환 (별표 모아보기용)
@app.get("/api/words/all")
def get_all_words():
    data = load_words()
    all_words = []
    for page, words in data.items():
        all_words.extend(words)
    return all_words
