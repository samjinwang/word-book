import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PageSelector from './components/PageSelector';
import WordCard from './components/WordCard';

// 폰트 크기 6단계 정의
const FONT_LEVELS = [
  { word: '26px', meaning: '22px', bWord: '22px', bMeaning: '19px' },
  { word: '32px', meaning: '26px', bWord: '26px', bMeaning: '22px' },
  { word: '38px', meaning: '30px', bWord: '31px', bMeaning: '26px' }, // 기본
  { word: '45px', meaning: '35px', bWord: '37px', bMeaning: '31px' },
  { word: '52px', meaning: '40px', bWord: '43px', bMeaning: '36px' },
  { word: '60px', meaning: '46px', bWord: '49px', bMeaning: '41px' }
];

export default function App() {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [baseWords, setBaseWords] = useState([]);
  const [displayWords, setDisplayWords] = useState([]);

  const [isBothMode, setIsBothMode] = useState(false);
  const [isStarOnly, setIsStarOnly] = useState(false);
  const [starredSet, setStarredSet] = useState(new Set());
  const [fontLevel, setFontLevel] = useState(2);
  const [loading, setLoading] = useState(true);

  // 1. 초기 세팅 (로컬스토리지 복구 및 페이지 목록 호출)
  useEffect(() => {
    const savedStars = JSON.parse(localStorage.getItem('starred_words') || '[]');
    setStarredSet(new Set(savedStars));

    const savedFont = parseInt(localStorage.getItem('word_font_level') || '2', 10);
    setFontLevel(savedFont);

    fetch('/api/pages')
      .then((res) => res.json())
      .then((data) => {
        setPages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('API Error:', err);
        setLoading(false);
      });
  }, []);

  // 2. 폰트 레벨 변동 시 CSS 전역 변수 및 로컬스토리지 갱신
  useEffect(() => {
    const cfg = FONT_LEVELS[fontLevel];
    document.documentElement.style.setProperty('--word-size', cfg.word);
    document.documentElement.style.setProperty('--meaning-size', cfg.meaning);
    document.documentElement.style.setProperty('--both-word-size', cfg.bWord);
    document.documentElement.style.setProperty('--both-meaning-size', cfg.bMeaning);
    localStorage.setItem('word_font_level', fontLevel);
  }, [fontLevel]);

  // 페이지 열기
  const handleSelectPage = (pageName) => {
    fetch(`/api/pages/${encodeURIComponent(pageName)}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentPage(pageName);
        setBaseWords(data);
        setDisplayWords(data);
        setIsBothMode(false);
        setIsStarOnly(false);
        window.scrollTo(0, 0);
      });
  };

  // 전체 별표 모아보기
  const handleSelectAllStarred = () => {
    fetch('/api/words/all')
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((w) => starredSet.has(w.en));
        setCurrentPage('★ 별표 모아보기');
        setBaseWords(filtered);
        setDisplayWords(filtered);
        setIsBothMode(false);
        setIsStarOnly(true);
        window.scrollTo(0, 0);
      });
  };

  // 별표 토글
  const handleToggleStar = (enWord) => {
    const nextSet = new Set(starredSet);
    if (nextSet.has(enWord)) {
      nextSet.delete(enWord);
    } else {
      nextSet.add(enWord);
    }
    setStarredSet(nextSet);
    localStorage.setItem('starred_words', JSON.stringify([...nextSet]));

    if (isStarOnly) {
      setDisplayWords((prev) => prev.filter((w) => nextSet.has(w.en)));
    }
  };

  // 별표 필터
  const handleToggleStarFilter = () => {
    if (!isStarOnly) {
      setIsStarOnly(true);
      setDisplayWords(baseWords.filter((w) => starredSet.has(w.en)));
    } else {
      setIsStarOnly(false);
      setDisplayWords([...baseWords]);
    }
  };

  // 셔플
  const handleShuffle = () => {
    const shuffled = [...displayWords];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setDisplayWords(shuffled);
  };

  const handleAdjustFontSize = (delta) => {
    setFontLevel((prev) => Math.min(Math.max(prev + delta, 0), FONT_LEVELS.length - 1));
  };

  return (
    <div className="app-container">
      <Header
        currentPage={currentPage}
        onBack={() => setCurrentPage(null)}
        isBothMode={isBothMode}
        onToggleBothMode={() => setIsBothMode(!isBothMode)}
        onAdjustFontSize={handleAdjustFontSize}
        isStarOnly={isStarOnly}
        onToggleStarFilter={handleToggleStarFilter}
        onShuffle={handleShuffle}
      />

      {loading ? (
        <div className="empty-msg">단어 목록 로딩 중...</div>
      ) : !currentPage ? (
        <PageSelector
          pages={pages}
          totalStarredCount={starredSet.size}
          onSelectPage={handleSelectPage}
          onSelectAllStarred={handleSelectAllStarred}
        />
      ) : (
        <main className="word-study-view">
          {displayWords.length === 0 ? (
            <div className="empty-msg">단어가 없습니다.</div>
          ) : (
            displayWords.map((item, idx) => (
              <WordCard
                key={`${item.en}-${idx}`}
                item={item}
                isStarred={starredSet.has(item.en)}
                onToggleStar={handleToggleStar}
                isBothMode={isBothMode}
              />
            ))
          )}
        </main>
      )}
    </div>
  );
}
