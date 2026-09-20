import React, { useState } from 'react';

export default function WordCard({ item, isStarred, onToggleStar, isBothMode }) {
  const [flipped, setFlipped] = useState(false);

  if (isBothMode) {
    return (
      <div className="both-row-container">
        <div className="side-card eng-face">
          <div className={`star-icon ${isStarred ? 'starred' : ''}`} onClick={(e) => { e.stopPropagation(); onToggleStar(item.en); }}>
            {isStarred ? '★' : '☆'}
          </div>
          <div className="center-text-anchor"><div className="word">{item.en}</div></div>
          {item.pron && <div className="card-extra-bottom"><div className="pron">{item.pron}</div></div>}
        </div>
        <div className="side-card kor-face">
          {item.pos && <div className="card-extra-top"><span className="pos-badge">{item.pos}</span></div>}
          <div className="center-text-anchor"><div className="meaning">{item.ko}</div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flip-container" onClick={() => setFlipped(!flipped)}>
      <div className={`card ${flipped ? 'flipped' : ''}`}>
        {/* 앞면 */}
        <div className="card-face eng-face card-front">
          <div className={`star-icon ${isStarred ? 'starred' : ''}`} onClick={(e) => { e.stopPropagation(); onToggleStar(item.en); }}>
            {isStarred ? '★' : '☆'}
          </div>
          <div className="center-text-anchor"><div className="word">{item.en}</div></div>
          {item.pron && <div className="card-extra-bottom"><div className="pron">{item.pron}</div></div>}
        </div>
        {/* 뒷면 */}
        <div className="card-face kor-face card-back">
          <div className={`star-icon ${isStarred ? 'starred' : ''}`} onClick={(e) => { e.stopPropagation(); onToggleStar(item.en); }}>
            {isStarred ? '★' : '☆'}
          </div>
          {item.pos && <div className="card-extra-top"><span className="pos-badge">{item.pos}</span></div>}
          <div className="center-text-anchor"><div className="meaning">{item.ko}</div></div>
        </div>
      </div>
    </div>
  );
}
