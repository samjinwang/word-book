import React from 'react';

export default function PageSelector({ pages, totalStarredCount, onSelectPage, onSelectAllStarred }) {
  return (
    <main className="page-selection-view">
      <button className="all-starred-btn" onClick={onSelectAllStarred}>
        <span>★ 별표 친 단어 모두 모아보기</span>
        <span className="badge">{totalStarredCount}개</span>
      </button>

      <div className="page-grid">
        {pages.map((p) => (
          <button key={p.name} className="page-btn" onClick={() => onSelectPage(p.name)}>
            {p.name}
            <span className="count">{p.count}단어</span>
          </button>
        ))}
      </div>
    </main>
  );
}
