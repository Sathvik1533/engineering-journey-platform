import React, { useState } from 'react';
import { useEngineeringState } from '../context/EngineeringStateContext';
import { TimerCard } from './TimerCard';
import { 
  X, 
  BookOpen, 
  CheckSquare, 
  Square, 
  ShieldCheck, 
  Flame, 
  GitCommit
} from 'lucide-react';

interface TopicDrawerProps {
  nodeId: string | null;
  onClose: () => void;
}

export const TopicDrawer: React.FC<TopicDrawerProps> = ({ nodeId, onClose }) => {
  const { state, syllabus, toggleTask, passAssessment } = useEngineeringState();
  const [activeSection, setActiveSection] = useState<'overview' | 'journey' | 'tasks'>('overview');

  if (!nodeId || !syllabus || !state) return null;

  const node = syllabus[nodeId];

  if (!node) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '460px',
        height: '100vh',
        background: 'var(--bg2)',
        borderLeft: '1px solid var(--border)',
        zIndex: 110,
        padding: '24px',
        color: 'var(--text)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Not Found</h3>
          <button className="btn" onClick={onClose}><X size={16} /></button>
        </div>
        <p style={{ marginTop: '20px', color: 'var(--text2)' }}>Curriculum details for node {nodeId} could not be loaded.</p>
      </div>
    );
  }

  const isCompleted = state.completed_topics.includes(nodeId);

  // Derive dynamic or default values for the 10-element journey mapping
  const missionText = node.objective || "Establish technical proficiency in this block.";
  
  const whyText = (node as any).why || 
    `EJP Law 2 Compliance: This technology exists to unlock production capabilities. It moves you past theoretical understanding and requires verified, hand-written implementations. Mastering this prevents reliance on AI completions and ensures you can solve core interview algorithms under timed pressure.`;
  
  const subtopicsList = (node as any).subtopics || 
    node.milestones || 
    ["Concept syntax patterns", "Handwritten drills", "Local repository commits"];

  // Gather practice exercises from day missions
  const practiceList: string[] = [];
  node.dayMissions?.forEach(d => {
    if (d.practice) practiceList.push(...d.practice);
  });
  if (practiceList.length === 0) {
    practiceList.push("Verify syntax console logs", "Write 5+ short local scripts", "Commit codebase changes");
  }

  // Gather mini-builds
  const miniBuildsList: string[] = [];
  node.dayMissions?.forEach(d => {
    if (d.miniBuild) miniBuildsList.push(d.miniBuild);
  });
  if (miniBuildsList.length === 0) {
    miniBuildsList.push("Complete localized terminal execution scripts");
  }

  const capabilityGainedText = node.capabilitiesUnlocked?.join(", ") || "Refined logical engineering structures";
  
  const futureConnectionsText = (node as any).futureConnections || 
    `Unlocks subsequent modules in the EJP syllabus. Builds the core knowledge vector needed for Semester 3-2 backend AI pipelines, distributed design templates, and mock interview calibrations.`;

  return (
    <>
      {/* Overlay Backdrop */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 110
        }}
        onClick={onClose}
      />

      {/* Slide-out Drawer Panel */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '480px',
        maxWidth: '100%',
        height: '100vh',
        background: 'var(--bg2)',
        borderLeft: '1px solid var(--border)',
        zIndex: 120,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
        animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}>
        <style>{`
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>

        {/* Drawer Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '12px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <BookOpen size={16} style={{ color: 'var(--accent)' }} />
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--text3)', fontWeight: 600 }}>
                {node.id.startsWith('phase') ? 'CURRICULUM PHASE' : 'WEEK SPRINT'}
              </span>
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text)' }}>{node.title}</h3>
          </div>
          <button 
            onClick={onClose} 
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--text2)', 
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg4)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Section Tabs Switcher */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg3)'
        }}>
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'journey', label: '10-Element Journey' },
            { id: 'tasks', label: 'Daily Tasks' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              style={{
                flex: 1,
                padding: '12px 6px',
                border: 'none',
                background: activeSection === tab.id ? 'var(--bg2)' : 'transparent',
                color: activeSection === tab.id ? 'var(--accent-light)' : 'var(--text2)',
                fontSize: '0.8rem',
                fontWeight: activeSection === tab.id ? 700 : 500,
                cursor: 'pointer',
                borderBottom: activeSection === tab.id ? '2px solid var(--accent)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Drawer Body (Scrollable) */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>

          {/* TAB 1: OVERVIEW */}
          {activeSection === 'overview' && (
            <>
              {/* Mission Statement */}
              <div>
                <h4 style={{ fontSize: '0.78rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.05em', fontWeight: 700 }}>
                  Mission Objective
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text2)', lineHeight: '1.5' }}>{missionText}</p>
              </div>

              {/* AI Rules Banner Callout */}
              <div style={{
                background: 'rgba(239, 68, 68, 0.04)',
                border: '1.5px solid rgba(239, 68, 68, 0.2)',
                borderRadius: 'var(--radius)',
                padding: '12px 14px',
                display: 'flex',
                gap: '10px'
              }}>
                <Flame size={18} style={{ color: 'var(--red)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--red)', textTransform: 'uppercase' }}>AI Usage Protocol</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text2)', marginTop: '2px' }}>{node.aiStage}</div>
                </div>
              </div>

              {/* Tech & Status Grid */}
              <div className="grid grid-2" style={{ gap: '14px' }}>
                <div style={{ background: 'var(--bg3)', padding: '12px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                  <h4 style={{ fontSize: '0.72rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 700 }}>Technology</h4>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)' }}>{node.technology}</span>
                </div>
                <div style={{ background: 'var(--bg3)', padding: '12px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                  <h4 style={{ fontSize: '0.72rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 700 }}>Status</h4>
                  <span className={`badge ${isCompleted ? 'badge-green' : 'badge-amber'}`} style={{ fontSize: '0.72rem' }}>
                    {isCompleted ? 'Completed' : 'Active'}
                  </span>
                </div>
              </div>

              {/* Milestones Checklist summary */}
              {node.milestones && node.milestones.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.78rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em', fontWeight: 700 }}>
                    Syllabus Milestones
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {node.milestones.map((ms, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.82rem', color: 'var(--text2)' }}>
                        <GitCommit size={14} style={{ color: 'var(--accent)' }} />
                        <span>{ms}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* TAB 2: 10-ELEMENT JOURNEY */}
          {activeSection === 'journey' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Why This Topic Exists */}
              <div style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '12px' }}>
                <h4 style={{ fontSize: '0.78rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 700 }}>
                  1. Why This Topic Exists
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: '1.4' }}>{whyText}</p>
              </div>

              {/* Subtopics */}
              <div>
                <h4 style={{ fontSize: '0.78rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 700 }}>
                  2. Detailed Subtopics
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {subtopicsList.map((st: string, i: number) => (
                    <span key={i} className="badge" style={{ background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--text2)' }}>
                      {st}
                    </span>
                  ))}
                </div>
              </div>

              {/* Practice Exercises */}
              <div>
                <h4 style={{ fontSize: '0.78rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 700 }}>
                  3. Practice Drills
                </h4>
                <ul style={{ listStyleType: 'circle', paddingLeft: '18px', fontSize: '0.82rem', color: 'var(--text2)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {practiceList.map((pr: string, i: number) => (
                    <li key={i}>{pr}</li>
                  ))}
                </ul>
              </div>

              {/* Mini Builds */}
              <div>
                <h4 style={{ fontSize: '0.78rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 700 }}>
                  4. Mini Builds
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {miniBuildsList.map((mb: string, i: number) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', padding: '10px', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--text2)' }}>
                      <strong>Build Target:</strong> {mb}
                    </div>
                  ))}
                </div>
              </div>

              {/* Capability Gained */}
              <div>
                <h4 style={{ fontSize: '0.78rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 700 }}>
                  5. Capabilities Gained
                </h4>
                <span className="badge badge-indigo" style={{ fontSize: '0.75rem' }}>
                  <ShieldCheck size={12} style={{ marginRight: '4px', display: 'inline', verticalAlign: 'middle' }} />
                  {capabilityGainedText}
                </span>
              </div>

              {/* Future Connections */}
              <div>
                <h4 style={{ fontSize: '0.78rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 700 }}>
                  6. Future Connections
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: '1.4' }}>{futureConnectionsText}</p>
              </div>

              {/* Unlocks */}
              {node.capabilitiesUnlocked && node.capabilitiesUnlocked.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.78rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 700 }}>
                    7. Unlocks Milestone
                  </h4>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {node.capabilitiesUnlocked.map((cap) => (
                      <span key={cap} className="badge" style={{ background: 'var(--accent-glow)', color: 'var(--accent-light)', border: '1px solid var(--border)', fontSize: '0.72rem' }}>
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DAILY TASKS */}
          {activeSection === 'tasks' && (
            <>
              {/* Daily Checklist */}
              {node.dayMissions && node.dayMissions.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.78rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.05em', fontWeight: 700 }}>
                    Day Missions Checklist
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {node.dayMissions.map((day) => {
                      const dayTaskId = `day-${day.dayNum}`;
                      const isDayDone = state.completed_topics.includes(dayTaskId);

                      return (
                        <div 
                          key={dayTaskId}
                          style={{
                            background: isDayDone ? 'rgba(16, 185, 129, 0.02)' : 'var(--bg3)',
                            border: isDayDone ? '1px solid var(--green)' : '1px solid var(--border)',
                            borderRadius: 'var(--radius)',
                            padding: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onClick={() => toggleTask(dayTaskId, !isDayDone)}
                        >
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            {isDayDone ? (
                              <CheckSquare size={16} style={{ color: 'var(--green)', flexShrink: 0, marginTop: '2px' }} />
                            ) : (
                              <Square size={16} style={{ color: 'var(--text3)', flexShrink: 0, marginTop: '2px' }} />
                            )}
                            <div style={{ flex: 1 }}>
                              <span style={{ fontWeight: 700, fontSize: '0.85rem', color: isDayDone ? 'var(--green)' : 'var(--text)' }}>
                                Day {day.dayNum}: {day.title}
                              </span>
                              <p style={{ fontSize: '0.78rem', color: 'var(--text2)', marginTop: '4px', lineHeight: '1.4' }}>
                                {day.mission}
                              </p>
                              <div style={{ marginTop: '8px', fontSize: '0.72rem', color: 'var(--text3)' }}>
                                <strong>Practice:</strong> {day.practice.join(', ')}
                              </div>
                              <div style={{ marginTop: '4px', fontSize: '0.72rem', color: 'var(--text3)' }}>
                                <strong>Deliverable:</strong> {day.miniBuild}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Timed Assessment */}
              {node.timedAssessment && (
                <div>
                  <h4 style={{ fontSize: '0.78rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em', fontWeight: 700 }}>
                    Exit Gate Assessment
                  </h4>
                  <TimerCard
                    durationMinutes={node.timedAssessment.durationMinutes}
                    assessmentId={node.id}
                    assessmentTitle={node.timedAssessment.title}
                    isPassed={isCompleted}
                    onPass={() => passAssessment(node.id)}
                  />
                  <div style={{ fontSize: '0.75rem', color: 'var(--text3)', marginTop: '8px', lineHeight: '1.4' }}>
                    <strong>Prompt:</strong> {node.timedAssessment.prompt}
                  </div>
                </div>
              )}

              {/* Exit Criteria fallback (for phases without direct days) */}
              {node.exitCriteria && node.exitCriteria.length > 0 && (!node.dayMissions || node.dayMissions.length === 0) && (
                <div>
                  <h4 style={{ fontSize: '0.78rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em', fontWeight: 700 }}>
                    Exit gate criteria check
                  </h4>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', fontSize: '0.82rem', color: 'var(--text2)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {node.exitCriteria.map((crit, idx) => (
                      <li key={idx}>{crit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </>
  );
};
