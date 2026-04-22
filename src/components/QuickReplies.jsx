import React from 'react';

export default function QuickReplies({ replies, onSelect, disabled }) {
  if (!replies || replies.length === 0) return null;

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      justifyContent: 'center',
    }}>
      {replies.map((reply, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(reply)}
          disabled={disabled}
          className="animate-slide-up"
          style={{
            animationDelay: `${idx * 0.1}s`,
            padding: '10px 18px',
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'var(--text-primary)',
            fontSize: '14px',
            cursor: disabled ? 'default' : 'pointer',
            opacity: disabled ? 0.6 : 1,
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => {
            if (!disabled) {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
          }}
          onMouseLeave={e => {
            if (!disabled) {
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }
          }}
        >
          {reply}
        </button>
      ))}
    </div>
  );
}
