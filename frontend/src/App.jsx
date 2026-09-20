import React, { useState, useEffect } from 'react';
import WordCard from './components/WordCard';

export default function App() {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [words, setWords] = useState([]);
  const [isBothMode, setIsBothMode] = useState(false);
  const [fontLevel, setFontLevel] = useState(2);
  const [starredSet, setStarredSet] = useState(new Set());

  // 백엔드 API에서 페이지 목록 불러오기
  useEffect(() => {
    fetch("http://localhost:8000/api/pages")
      .then(res => res.json())
      .then(data => setPages(data));
  }, []);

  // 특정 페이지 단어 불러오기
  const loadPage = (pageName) => {
    fetch(`http://localhost:8000/api/pages/${encodeURIComponent(pageName)}`)
      .then(res => res.json())
      .then(data => {
        setWords(data);
        setCurrentPage(pageName);
      });
  };

  // ... 셔플, 별표 토글 함수들
  return (
    <div>
      {/* currentPage가 null이면 메뉴 목록, 있으면 WordCard 리스트 렌더링 */}
    </div>
  );
}
