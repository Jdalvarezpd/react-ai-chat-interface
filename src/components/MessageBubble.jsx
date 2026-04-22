import React from 'react';
import avatarUrl from '../assets/images/agent_avatar.png';

function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  
  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      let linkText = '🔗 Open Link';
      let icon = '';
      const lower = part.toLowerCase();
      
      if (lower.includes('hubspot.com') || lower.includes('calendly.com') || lower.includes('meet.') || lower.includes('booking')) {
        linkText = 'Book Here';
        icon = '📅 ';
      } else if (lower.includes('youtube.com') || lower.includes('vimeo.com') || lower.includes('youtu.be')) {
        linkText = 'Watch Video';
        icon = '▶️ ';
      } else if (lower.includes('drive.google.com') || lower.includes('dropbox.com')) {
        linkText = 'View File';
        icon = '📁 ';
      } else {
        // Fallback: show the domain name cleanly
        try {
          const urlObj = new URL(part);
          linkText = urlObj.hostname.replace(/^www\./, '');
        } catch (e) {
          linkText = 'Open Link';
        }
        icon = '🔗 ';
      }

      return (
        <a 
          key={index} 
          href={part} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'var(--accent-primary)',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px',
            margin: '8px 0 4px 0',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
          }}
        >
          {icon}{linkText}
        </a>
      );
    }
    return part;
  });
}

export default function MessageBubble({ role, text }) {
  const isUser = role === 'user';
  
  return (
    <div className={`animate-slide-up`} style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      alignItems: 'flex-end',
      gap: '8px',
      width: '100%'
    }}>
      {!isUser && (
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          backgroundImage: `url(${avatarUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          flexShrink: 0,
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          marginBottom: '2px'
        }} />
      )}
      
      <div style={{
        maxWidth: '85%',
        padding: '14px 18px',
        fontSize: '15px',
        lineHeight: '1.5',
        color: 'var(--text-primary)',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        borderRadius: '18px',
        borderTopRightRadius: isUser ? '4px' : '18px',
        borderTopLeftRadius: isUser ? '18px' : '4px',
        background: isUser ? 'var(--accent-primary)' : 'var(--glass-bg)',
        border: isUser ? '1px solid rgba(59, 130, 246, 0.5)' : '1px solid var(--glass-border)',
        boxShadow: isUser 
          ? '0 4px 14px rgba(59, 130, 246, 0.2)' 
          : 'var(--glass-shadow)',
        backdropFilter: isUser ? 'none' : 'blur(10px)',
      }}>
        {linkify(text)}
      </div>
    </div>
  );
}
