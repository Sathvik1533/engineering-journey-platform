import { useState, useEffect } from 'react';
import { EngineeringStateProvider, useEngineeringState } from './context/EngineeringStateContext';
import { Topbar } from './components/Topbar';
import { MissionControl } from './components/MissionControl';
import { RoadmapVisualizer } from './components/RoadmapVisualizer';
import { PhaseTracker } from './components/PhaseTracker';
import { RiskRegister } from './components/RiskRegister';
import { TabContent } from './components/TabContent';
import { TopicDrawer } from './components/TopicDrawer';
import { AiMentorDrawer } from './components/AiMentorDrawer';
import { ProfileDrawer } from './components/ProfileDrawer';
import { MarkdownReader } from './components/MarkdownReader';
import { DeveloperModeOverlay } from './components/DeveloperModeOverlay';

interface Risk {
  id?: number;
  description: string;
  impact: string;
  probability: string;
  mitigation: string;
}

function AppContent() {
  const [activeTab, setActiveTab] = useState<string>('roadmap');
  const [theme, setTheme] = useState<string>('dark');
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [curriculumView, setCurriculumView] = useState<'volumes' | 'checklist'>('volumes');

  const [risks, setRisks] = useState<Risk[]>([]);
  const { isBackendConnected, loading, error } = useEngineeringState();

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const loadRisks = async () => {
      try {
        const res = await fetch('/api/risks/');
        if (res.ok) {
          const data = await res.json();
          setRisks(data);
        }
      } catch (err) {
        console.error('Failed to sync risks from backend', err);
      }
    };
    loadRisks();
  }, []);

  const handleAddRisk = async (newRisk: Risk) => {
    try {
      const res = await fetch('/api/risks/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRisk),
      });
      if (res.ok) {
        const saved = await res.json();
        setRisks(prev => [...prev, saved]);
      }
    } catch (err) {
      console.error('Could not create risk entry in DB', err);
    }
  };

  const handleUpdateRisk = async (updated: Risk) => {
    try {
      const res = await fetch(`/api/risks/${updated.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        const saved = await res.json();
        setRisks(prev => prev.map(r => r.id === saved.id ? saved : r));
      }
    } catch (err) {
      console.error('Could not update risk entry in DB', err);
    }
  };

  const handleDeleteRisk = async (id: number) => {
    try {
      const res = await fetch(`/api/risks/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setRisks(prev => prev.filter(r => r.id !== id));
      }
    } catch (err) {
      console.error('Could not delete risk entry from DB', err);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        background: 'var(--bg)',
        color: 'var(--text)'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid var(--border)',
          borderTopColor: 'var(--accent)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '16px'
        }} />
        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', color: 'var(--text2)' }}>Initializing Engineering Operating System...</p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error && !isBackendConnected) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        background: 'var(--bg)',
        color: 'var(--text)',
        padding: '24px',
        textAlign: 'center'
      }}>
        <h3 style={{ marginBottom: '10px', color: 'var(--red)' }}>⚠️ Connection Failed</h3>
        <p style={{ maxWidth: '400px', fontSize: '0.88rem', color: 'var(--text2)', marginBottom: '20px' }}>
          Could not establish connection to the FastAPI learning backend server. Ensure the server is running on port 8000.
        </p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>Retry Connection</button>
      </div>
    );
  }

  return (
    <div id="app-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Header Navigation (Sidebar completely removed) */}
      <div id="main-viewport" style={{ marginLeft: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          theme={theme} 
          setTheme={setTheme} 
          isBackendConnected={isBackendConnected}
          onToggleAi={() => setIsAiOpen(true)}
          onToggleProfile={() => setIsProfileOpen(true)}
        />

        {/* 3. Full-width content wrapper */}
        <main id="content-area" style={{ 
          maxWidth: activeTab === 'roadmap' ? '100%' : '1160px', 
          width: '100%', 
          padding: activeTab === 'roadmap' ? '20px 24px' : '40px 48px 80px' 
        }}>
          {activeTab === 'roadmap' && (
            <RoadmapVisualizer onSelectNode={(nodeId) => setSelectedNodeId(nodeId)} />
          )}

          {activeTab === 'dashboard' && <MissionControl />}

          {activeTab === 'phases' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                <button
                  onClick={() => setCurriculumView('volumes')}
                  className="btn btn-sm"
                  style={{
                    background: curriculumView === 'volumes' ? 'var(--accent-dim)' : 'transparent',
                    color: curriculumView === 'volumes' ? 'var(--accent-light)' : 'var(--text2)',
                    borderColor: curriculumView === 'volumes' ? 'var(--accent)' : 'var(--border)'
                  }}
                >
                  Syllabus Volumes
                </button>
                <button
                  onClick={() => setCurriculumView('checklist')}
                  className="btn btn-sm"
                  style={{
                    background: curriculumView === 'checklist' ? 'var(--accent-dim)' : 'transparent',
                    color: curriculumView === 'checklist' ? 'var(--accent-light)' : 'var(--text2)',
                    borderColor: curriculumView === 'checklist' ? 'var(--accent)' : 'var(--border)'
                  }}
                >
                  Interactive Checklist
                </button>
              </div>
              {curriculumView === 'volumes' ? <MarkdownReader /> : <PhaseTracker />}
            </div>
          )}

          {activeTab === 'risk' && (
            <RiskRegister 
              risks={risks} 
              onAddRisk={handleAddRisk}
              onUpdateRisk={handleUpdateRisk}
              onDeleteRisk={handleDeleteRisk}
            />
          )}

          {activeTab !== 'roadmap' && activeTab !== 'dashboard' && activeTab !== 'phases' && activeTab !== 'risk' && (
            <TabContent activeTab={activeTab} />
          )}
        </main>
      </div>

      {/* Syllabus Workspace Drawer */}
      <TopicDrawer 
        nodeId={selectedNodeId} 
        onClose={() => setSelectedNodeId(null)} 
      />

      {/* AI Mentor Drawer */}
      <AiMentorDrawer 
        isOpen={isAiOpen} 
        onClose={() => setIsAiOpen(false)} 
      />

      {/* Candidate Profile Drawer */}
      <ProfileDrawer 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />

      {/* Developer Mode Overlay — Cmd+Shift+D to activate */}
      <DeveloperModeOverlay />
    </div>
  );
}

function App() {
  return (
    <EngineeringStateProvider>
      <AppContent />
    </EngineeringStateProvider>
  );
}

export default App;
