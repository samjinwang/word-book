import React from 'react';

export default function Header({
  currentPage,
  onBack,
  isBothMode,
  onToggleBothMode,
  onAdjustFontSize,
  isStarOnly,
  onToggleStarFilter,
  onShuffle
}) {
  return (
    <header className="app-header">
      <div className="header-top">
        {currentPage ? (
          <button id="back-btn" className="header-btn" onClick={onBack}>
            ← 목록
          </button>
        ) : (
          <div style={{ width: 60 }} />
        )}
        <div id="header-title">{currentPage ? currentPage : '단어장 선택'}</div>
        <div style={{ width: 60 }} />
      </div>

      {currentPage && (
        <div className="header-actions">
          <button
            className={`header-btn ${isBothMode ? 'active' : ''}`}
            onClick={onToggleBothMode}
          >
            {isBothMode ? '뒤집기 모드' : '단어+뜻'}
          </button>

          <div className="font-ctrl-group">
            <button className="header-btn font-btn" onClick={() => onAdjustFontSize(-1)}>
              가-
            </button>
            <button className="header-btn font-btn" onClick={() => onAdjustFontSize(1)}>
              가+
            </button>
          </div>

          <button
            className={`header-btn ${isStarOnly ? 'active' : ''}`}
            onClick={onToggleStarFilter}
          >
            {isStarOnly ? '전체보기' : '★만 보기'}
          </button>

          <button className="header-btn" onClick={onShuffle}>
            셔플
          </button>
        </div>
      )}
    </header>
  );
}
