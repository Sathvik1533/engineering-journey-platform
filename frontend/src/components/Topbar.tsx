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

const navItems = [
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'dashboard', label: 'Mission Control' },
  { id: 'phases', label: 'Curriculum' },
  { id: 'handbook', label: 'Handbook' },
  { id: 'risk', label: 'Risks' }
];

export const Topbar: React.FC<TopbarProps> = ({ 
  activeTab,
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
          background: 'var(--accent)',
          color: '#fff',
          borderRadius: '6px',
          width: '28px',
          height: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Cpu size={16} />
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

      {/* Center: Clean Horizontal Navigation Links (roadmap.sh style) */}
      <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                background: isActive ? 'var(--accent-dim)' : 'transparent',
                color: isActive ? 'var(--accent-light)' : 'var(--text2)',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'var(--text)';
                  e.currentTarget.style.background = 'var(--bg4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'var(--text2)';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

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
            background: 'var(--accent-dim)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            color: 'var(--accent-light)',
            cursor: 'pointer',
            padding: '6px 12px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8rem',
            fontWeight: 600,
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--accent)';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--accent-dim)';
            e.currentTarget.style.color = 'var(--accent-light)';
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
            padding: '4px 8px',
            borderRadius: '6px',
            border: '1px solid var(--border)',
            background: 'var(--bg3)',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
            e.currentTarget.style.background = 'var(--bg4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.background = 'var(--bg3)';
          }}
        >
          <div style={{
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            background: 'var(--accent)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.7rem',
            fontWeight: 700
          }}>
            KS
          </div>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text)' }}>
            Kotagiri Sathvik
          </span>
        </div>
      </div>
    </header>
  );
};
