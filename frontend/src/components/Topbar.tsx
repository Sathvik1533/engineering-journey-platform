import React from 'react';
import { Database, Bot, Sun, Moon, Cpu } from 'lucide-react';

interface TopbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
  isBackendConnected: boolean;
  onToggleAi: () => void;
  onToggleProfile: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ 
  setActiveTab,
  theme, 
  setTheme, 
  isBackendConnected,
  onToggleAi,
  onToggleProfile
}) => {
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <header 
      id="topbar" 
      style={{
        height: '64px',
        background: 'var(--bg2)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {/* Left: Brand Logo (roadmap.sh style) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setActiveTab('roadmap')}>
        <div style={{
          background: '#0f172a',
          color: '#eab308',
          border: '2px solid #0f172a',
          borderRadius: '6px',
          width: '28px',
          height: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Cpu size={14} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.04em', color: 'var(--text)' }}>
            ENGINEERING OS
          </span>
          <span style={{ fontSize: '0.62rem', color: 'var(--text3)', fontWeight: 600, marginTop: '-2px' }}>
            V4.0.0
          </span>
        </div>
      </div>

      {/* Center: Removed navigation tabs since graph is the single primary viewport */}
      <div style={{ flex: 1 }} />

      {/* Right: Actions (Status, AI toggle, Theme, Profile) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Connection status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text3)' }}>
          <Database size={13} style={{ color: isBackendConnected ? 'var(--green)' : 'var(--red)' }} />
          <span style={{ fontFamily: 'var(--mono)' }}>
            {isBackendConnected ? 'Synced' : 'Offline'}
          </span>
        </div>

        {/* AI Mentor triggers */}
        <button 
          onClick={onToggleAi}
          style={{
            background: '#eab308',
            border: '2px solid #0f172a',
            color: '#0f172a',
            cursor: 'pointer',
            padding: '6px 14px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8rem',
            fontWeight: 800,
            transition: 'all 0.15s ease',
            boxShadow: '2px 2px 0 #0f172a'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-1px, -1px)';
            e.currentTarget.style.boxShadow = '3px 3px 0 #0f172a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '2px 2px 0 #0f172a';
          }}
          title="Open AI Mentor"
        >
          <Bot size={15} />
          <span>AI Mentor</span>
        </button>

        {/* Theme toggle */}
        <button 
          onClick={toggleTheme}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text2)',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: 'var(--radius)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg4)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Profile trigger */}
        <div 
          onClick={onToggleProfile}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            padding: '4px 10px',
            borderRadius: '6px',
            border: '2px solid #0f172a',
            background: '#ffffff',
            transition: 'all 0.15s ease',
            boxShadow: '2px 2px 0 #0f172a'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-1px, -1px)';
            e.currentTarget.style.boxShadow = '3px 3px 0 #0f172a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '2px 2px 0 #0f172a';
          }}
        >
          <div style={{
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            background: '#0f172a',
            color: '#eab308',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.7rem',
            fontWeight: 800
          }}>
            KS
          </div>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text)' }}>
            Kotagiri Sathvik
          </span>
        </div>
      </div>
    </header>
  );
};
