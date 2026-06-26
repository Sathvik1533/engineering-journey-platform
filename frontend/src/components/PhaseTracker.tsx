import React, { useState } from 'react';
import { useEngineeringState } from '../context/EngineeringStateContext';
import { ChevronDown, ChevronRight, CheckSquare, Square, Star, AlertCircle } from 'lucide-react';

export const PhaseTracker: React.FC = () => {
  const { state, syllabus, toggleTask } = useEngineeringState();
  const [expandedPhases, setExpandedPhases] = useState<Record<number, boolean>>({ 0: true, 1: true });

  if (!state || !syllabus) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ color: 'var(--text3)' }}>Loading curriculum structure...</p>
      </div>
    );
  }

  const toggleExpand = (phaseNum: number) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseNum]: !prev[phaseNum]
    }));
  };

  // Group syllabus data into phases and their child weeks
  const phases = Object.values(syllabus).filter(node => node.id.startsWith('phase-')).sort((a, b) => a.phaseNum - b.phaseNum);
  const weeks = Object.values(syllabus).filter(node => node.id.startsWith('week-')).sort((a, b) => {
    const aNum = parseInt(a.id.split('-')[1]);
    const bNum = parseInt(b.id.split('-')[1]);
    return aNum - bNum;
  });

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">Interactive Curriculum</div>
        <h1 className="page-title">Curriculum Phases</h1>
        <p className="page-sub">Tracks structural learning checkpoints. Toggle checklist items as they are finished to update capability vectors.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {phases.map((phase) => {
          const isExpanded = !!expandedPhases[phase.phaseNum];
          const phaseWeeks = weeks.filter(w => w.phaseNum === phase.phaseNum);
          
          // Calculate overall completed tasks percentage for this phase
          let totalDays = 0;
          let completedDays = 0;
          phaseWeeks.forEach(w => {
            w.dayMissions?.forEach(d => {
              totalDays++;
              if (state.completed_topics.includes(`day-${d.dayNum}`)) {
                completedDays++;
              }
            });
          });

          // Include exit gate assessment in completion
          const exitGateId = phase.id === 'phase-0' ? 'week-2' 
                           : phase.id === 'phase-1' ? 'week-4' 
                           : phase.id === 'phase-2' ? 'week-6' 
                           : phase.id === 'phase-4' ? 'week-10' : '';
          
          if (exitGateId) {
            totalDays++;
            if (state.completed_topics.includes(exitGateId)) {
              completedDays++;
            }
          }

          const percent = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
          const isPhaseActive = state.current_phase === phase.phaseNum;
          const isPhaseDone = state.completed_topics.includes(exitGateId) || state.current_phase > phase.phaseNum;

          return (
            <div className="phase-card" key={phase.id} style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              {/* Header */}
              <div 
                className="phase-header" 
                onClick={() => toggleExpand(phase.phaseNum)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 20px',
                  background: 'var(--bg3)',
                  cursor: 'pointer'
                }}
              >
                <div className="phase-header-left" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  <div>
                    <span 
                      className="badge" 
                      style={{ 
                        marginRight: '10px', 
                        background: isPhaseActive ? 'var(--green-dim)' : isPhaseDone ? 'var(--accent-dim)' : 'var(--bg4)',
                        color: isPhaseActive ? 'var(--green)' : isPhaseDone ? 'var(--accent-light)' : 'var(--text3)',
                        border: '1px solid var(--border)'
                      }}
                    >
                      {isPhaseDone ? 'Completed' : isPhaseActive ? 'Active' : 'Locked'}
                    </span>
                    <span className="phase-title-text" style={{ fontSize: '1rem', fontWeight: 600 }}>
                      Phase {phase.phaseNum} — {phase.title.replace('Phase ' + phase.phaseNum + ': ', '')}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '80px', height: '4px', background: 'var(--bg4)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${percent}%`, background: isPhaseDone ? 'var(--green)' : 'var(--accent)', borderRadius: '999px' }} />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--text2)', width: '32px', textAlign: 'right' }}>
                      {percent}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Collapsible Body */}
              <div 
                className={`phase-body ${isExpanded ? 'open' : ''}`}
                style={{
                  maxHeight: isExpanded ? '2000px' : '0px',
                  overflow: 'hidden',
                  padding: isExpanded ? '20px' : '0px',
                  background: 'var(--bg2)',
                  borderTop: isExpanded ? '1px solid var(--border)' : 'none',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text2)', fontStyle: 'italic' }}>
                    {phase.objective}
                  </p>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>
                    <strong>Core Tech Stack:</strong> {phase.technology} | <strong>Restriction:</strong> {phase.aiStage}
                  </div>
                </div>

                <div className="grid grid-2" style={{ gap: '20px', alignItems: 'flex-start' }}>
                  {phaseWeeks.map((week) => (
                    <div key={week.id} className="phase-week" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', padding: '14px', borderRadius: 'var(--radius)' }}>
                      <div className="phase-week-title" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                        <Star size={14} style={{ color: 'var(--accent)' }} />
                        <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{week.title}</span>
                      </div>
                      
                      {/* Day Missions */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {week.dayMissions && week.dayMissions.length > 0 ? (
                          week.dayMissions.map((day) => {
                            const dayTaskId = `day-${day.dayNum}`;
                            const isDayDone = state.completed_topics.includes(dayTaskId);
                            
                            return (
                              <div 
                                key={dayTaskId} 
                                className="checklist-item"
                                style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}
                                onClick={() => toggleTask(dayTaskId, !isDayDone)}
                              >
                                {isDayDone ? (
                                  <CheckSquare size={16} style={{ color: 'var(--green)', flexShrink: 0, marginTop: '2px' }} />
                                ) : (
                                  <Square size={16} style={{ color: 'var(--text3)', flexShrink: 0, marginTop: '2px' }} />
                                )}
                                <div>
                                  <span className={`checklist-label ${isDayDone ? 'checked' : ''}`} style={{ fontSize: '0.82rem', fontWeight: 500, color: isDayDone ? 'var(--text3)' : 'var(--text)' }}>
                                    Day {day.dayNum}: {day.title}
                                  </span>
                                  <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text3)', marginTop: '2px' }}>
                                    Build: {day.miniBuild}
                                  </span>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div style={{ fontSize: '0.75rem', color: 'var(--text3)', fontStyle: 'italic' }}>
                            No daily missions configured for this module.
                          </div>
                        )}

                        {/* Week Exit Assessment Status */}
                        {week.timedAssessment && (
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'var(--bg3)',
                            padding: '8px 10px',
                            borderRadius: '4px',
                            border: '1px solid var(--border)',
                            marginTop: '6px',
                            fontSize: '0.75rem'
                          }}>
                            <AlertCircle size={14} style={{ color: state.completed_topics.includes(week.id) ? 'var(--green)' : 'var(--amber)' }} />
                            <span style={{ fontWeight: 600, color: state.completed_topics.includes(week.id) ? 'var(--green)' : 'var(--text2)' }}>
                              Exit Gate: {state.completed_topics.includes(week.id) ? 'Passed' : 'Pending Verification'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
