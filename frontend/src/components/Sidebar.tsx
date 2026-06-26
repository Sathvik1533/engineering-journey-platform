import React from 'react';
import { useEngineeringState } from '../context/EngineeringStateContext';
import { 
  Home, 
  Clock, 
  BookOpen, 
  Map, 
  Cpu, 
  FolderOpen, 
  AlertTriangle 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const navItems = [
  { id: 'roadmap', label: 'Interactive Roadmap', icon: Map },
  { id: 'dashboard', label: 'Mission Control', icon: Home },
  { id: 'daily', label: 'Daily OS Loop', icon: Clock },
  { id: 'phases', label: 'Curriculum Checklist', icon: BookOpen },
  { id: 'resources', label: 'Resource Logs', icon: FolderOpen },
  { id: 'risk', label: 'Risk Registry', icon: AlertTriangle },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  sidebarOpen,
  setSidebarOpen
}) => {
  const { state } = useEngineeringState();

  return (
    <>
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`} 
        onClick={() => setSidebarOpen(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(3px)',
          zIndex: 90,
          display: sidebarOpen ? 'block' : 'none'
        }}
      />
      <aside 
        id="sidebar" 
        className={sidebarOpen ? 'open' : ''}
        style={{
          width: 'var(--sidebar-w)',
          minHeight: '100vh',
          background: 'var(--bg2)',
          borderRight: '1px solid var(--border)',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          overflowY: 'auto',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          transform: sidebarOpen ? 'translateX(0)' : undefined,
          transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="sidebar-header" style={{ padding: '20px 18px', borderBottom: '1px solid var(--border)' }}>
          <div className="sidebar-logo">
            <div className="logo-mark" style={{ color: '#fff' }}>
              <Cpu size={15} />
            </div>
            <div>
              <div className="logo-text" style={{ fontSize: '0.85rem' }}>ENGINEERING OS</div>
              <div className="logo-sub" style={{ fontSize: '0.62rem' }}>VERSION 4.0</div>
            </div>
          </div>
        </div>

        <nav style={{ padding: '16px 10px', flex: 1 }}>
          <ul style={{ listStyle: 'none' }}>
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id} style={{ marginBottom: '4px' }}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius)',
                      border: 'none',
                      background: isActive ? 'var(--accent-dim)' : 'transparent',
                      color: isActive ? 'var(--accent-light)' : 'var(--text2)',
                      fontSize: '0.88rem',
                      fontWeight: isActive ? 600 : 400,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'var(--bg4)';
                        e.currentTarget.style.color = 'var(--text)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--text2)';
                      }
                    }}
                  >
                    <IconComponent size={16} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {state && (
          <div className="sidebar-phase-card" style={{ margin: '14px', flexShrink: 0 }}>
            <div className="phase-pill">Current Technology</div>
            <div className="phase-name" style={{ fontSize: '0.85rem' }}>Phase {state.current_phase}</div>
            <div className="phase-meta" style={{ fontSize: '0.75rem', marginTop: '2px' }}>{state.current_technology}</div>
          </div>
        )}
      </aside>
    </>
  );
};
