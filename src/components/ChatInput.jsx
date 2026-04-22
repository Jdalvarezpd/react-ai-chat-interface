import React, { useState, useRef } from 'react';

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSend(text);
      setText('');
      // focus back on input (optional, keeps keyboard open on mobile)
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '2px' // room for focus ring
      }}
    >
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        disabled={disabled}
        autoComplete="off"
        style={{
          flex: 1,
          padding: '16px 20px',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(24, 24, 27, 0.5)',
          color: 'var(--text-primary)',
          fontSize: '15px',
          outline: 'none',
          transition: 'all 0.2s ease',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--accent-primary)';
          e.target.style.background = 'rgba(24, 24, 27, 0.8)';
          e.target.style.boxShadow = '0 0 0 2px var(--accent-glow)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'rgba(255,255,255,0.12)';
          e.target.style.background = 'rgba(24, 24, 27, 0.5)';
          e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.2)';
        }}
      />
      
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          border: 'none',
          background: disabled || !text.trim() ? 'rgba(255,255,255,0.05)' : 'var(--accent-primary)',
          color: disabled || !text.trim() ? 'rgba(255,255,255,0.3)' : 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: disabled || !text.trim() ? 'default' : 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: disabled || !text.trim() ? 'none' : '0 4px 14px rgba(59, 130, 246, 0.4)',
          flexShrink: 0
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          style={{ width: '20px', height: '20px', marginLeft: '2px' }}
        >
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </form>
  );
}
