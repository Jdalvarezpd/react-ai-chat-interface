import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';

const TypingIndicator = () => (
  <div style={{
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
    padding: '8px 12px',
    background: 'var(--glass-bg)',
    borderRadius: '16px',
    borderTopLeftRadius: '4px',
    border: '1px solid var(--glass-border)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: 'fit-content',
    marginTop: '4px',
    marginLeft: '36px'
  }}>
    <span className="typing-dot" style={{ display: 'block' }}></span>
    <span className="typing-dot" style={{ display: 'block' }}></span>
    <span className="typing-dot" style={{ display: 'block' }}></span>
  </div>
);

export default function MessageList({ messages, isTyping }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Scroll correctly to the bottom when messages or typing changes
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
      // Double check after layout reflow
      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      });
    }
  }, [messages, isTyping]);

  return (
    <div 
      ref={containerRef}
      style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        scrollBehavior: 'smooth'
      }}
    >
      {messages.length === 0 && !isTyping ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0 }}>
          {/* Layout placeholder */}
        </div>
      ) : null}

      {messages.map((msg, idx) => (
        <MessageBubble key={idx} role={msg.role} text={msg.text} />
      ))}
      
      {isTyping && <TypingIndicator />}
      <div style={{ paddingBottom: '8px' }}></div>
    </div>
  );
}
