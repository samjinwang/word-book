import React, { useState } from 'react';

export default function WordCard({ item, isStarred, onToggleStar, isBothMode }) {
  const [flipped, setFlipped] = useState(false);

  // 별표 클릭 시 카드 뒤집힘 방지
  const handleStarClick = (e) => {
    e.stopPropagation();
    onToggleStar(item.en);
  };

  if (isBothMode) {
    // 1) 단어+뜻 독립 2카드 나란히 모드
    return (
      <div className="both-row-container">
        <div className="side-card eng-face">
          <div className={`star-icon ${isStarred ? 'starred' : ''}`} onClick={handleStarClick}>
            {isStarred ? '★' : '☆'}
          </div>
          <div className="center-text-anchor">
            <div className="word">{item.en}</div>
          </div>
          {item.pron && (
            <div className="card-extra-bottom">
              <div className="pron">{item.pron}</div>
            </div>
          )}
        </div>

        <div className="side-card kor-face">
          {item.pos && (
            <div className="card-extra-top">
              <span className="pos-badge">{item.pos}</span>
            </div>
          )}
          <div className="center-text-anchor">
            <div className="meaning">{item.ko}</div>
          </div>
        </div>
      </div>
    );
  }

  // 2) 제자리 뒤집기 플립 모드
  return (
    <div className="flip-container">
      <div className={`card ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
        {/* 앞면: 영어 */}
        <div className="card-face eng-face card-front">
          <div className={`star-icon ${isStarred ? 'starred' : ''}`} onClick={handleStarClick}>
            {isStarred ? '★' : '☆'}
          </div>
          <div className="center-text-anchor">
            <div className="word">{item.en}</div>
          </div>
          {item.pron && (
            <div className="card-extra-bottom">
              <div className="pron">{item.pron}</div>
            </div>
          )}
        </div>

        {/* 뒷면: 한글뜻 */}
        <div className="card-face kor-face card-back">
          <div className={`star-icon ${isStarred ? 'starred' : ''}`} onClick={handleStarClick}>
            {isStarred ? '★' : '☆'}
          </div>
          {item.pos && (
            <div className="card-extra-top">
              <span className="pos-badge">{item.pos}</span>
            </div>
          )}
          <div className="center-text-anchor">
            <div className="meaning">{item.ko}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
