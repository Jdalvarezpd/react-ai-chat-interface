import React from 'react';
import MessageList from './MessageList';
import QuickReplies from './QuickReplies';
import ChatInput from './ChatInput';
import logoUrl from '../assets/images/linkedupsaleslogo.png';

export default function ChatWidget({ chatState }) {
  const { messages, quickReplies, isTyping, error, sendMessage, resetChat } = chatState;

  return (
    <div className="chat-widget animate-fade-in" style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '800px', // Like landbot, centered readable column
      height: '100dvh',
      margin: '0 auto',
      background: 'transparent',
    }}>
      {/* Header - Super clean styling */}
      <header style={{
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid var(--glass-border)',
        background: 'rgba(9, 9, 11, 0.4)', // Very subtle glass header
        backdropFilter: 'blur(12px)',
        zIndex: 10,
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}>
          <img 
            src={logoUrl}
            alt="Scale With Clarity Logo" 
            style={{ height: '32px', objectFit: 'contain', cursor: 'pointer' }}
            onDoubleClick={resetChat}
            title="Double click to reset chat"
          />
          <h1 style={{ 
            fontSize: '12px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.2em', 
            color: 'var(--text-primary)',
            margin: 0,
            fontWeight: 600
          }}>
            Scale With Clarity
          </h1>
        </div>
      </header>
      
      {/* Scrollable Message Area */}
      <MessageList messages={messages} isTyping={isTyping} />

      {/* Error Message */}
      {error && (
        <div style={{
          padding: '8px 24px',
          color: '#ef4444',
          fontSize: '13px',
          textAlign: 'center',
          background: 'rgba(239, 68, 68, 0.1)',
        }}>
          {error}
        </div>
      )}

      {/* Input / Affordance Area */}
      <div style={{
        marginTop: 'auto',
        background: 'rgba(9, 9, 11, 0.6)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid var(--glass-border)',
        padding: '16px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        position: 'relative',
        zIndex: 10
      }}>
        <QuickReplies replies={quickReplies} onSelect={sendMessage} disabled={isTyping} />
        <ChatInput onSend={sendMessage} disabled={isTyping} />
        
        <div style={{
          textAlign: 'center',
          fontSize: '11px',
          color: 'var(--text-secondary)',
          opacity: 0.6,
          marginTop: '4px'
        }}>
          Powered by Linked Up Sales
        </div>
      </div>
    </div>
  );
}
