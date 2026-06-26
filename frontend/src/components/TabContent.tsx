import React, { useState } from 'react';
import { 
  Clock, 
  Layers, 
  HelpCircle, 
  ShieldAlert, 
  FolderOpen,
  BookOpen,
  ListTodo
} from 'lucide-react';

interface TabContentProps {
  activeTab: string;
}

export const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  const [activeSubTab, setActiveSubTab] = useState<'ai-policy' | 'day-types' | 'links' | 'readiness'>('ai-policy');
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (stepNum: string) => {
    setCheckedSteps(prev => ({
      ...prev,
      [stepNum]: !prev[stepNum]
    }));
  };

  switch (activeTab) {
    case 'handbook':
      return (
        <div>
          {/* Header */}
          <div className="page-header" style={{ marginBottom: '20px' }}>
            <div className="page-eyebrow">
              <BookOpen size={14} />
              Operating Manual
            </div>
            <h1 className="page-title" style={{ fontSize: '1.8rem', marginBottom: '2px' }}>EJP Handbook</h1>
            <p className="page-sub" style={{ fontSize: '0.85rem' }}>
              Your operational guidelines, daily rituals loop checklist, and reference documents centralized in one workspace.
            </p>
          </div>

          {/* Split Screen Columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '24px', alignItems: 'start' }}>
            
            {/* Left Column: Interactive 7-Step Daily Ritual */}
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px' }}>
                <ListTodo size={18} style={{ color: 'var(--accent)' }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>The Seven-Step Daily Ritual</h3>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text2)', marginBottom: '18px', lineHeight: '1.4' }}>
                Repeat this sequence every single build day. Click each block to verify completion for today's session.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { num: '01', label: 'Plan', desc: 'Open this OS. Read the active target checklist. Identify today\'s single deliverable. Write it in one sentence before touching any code.', time: '5 min' },
                  { num: '02', label: 'Learn', desc: 'Read or watch only enough to attempt the build. If you can describe what you\'re about to build, stop reading and start.', time: '20 min' },
                  { num: '03', label: 'Build', desc: 'Implement the target from scratch. No AI code generation during this block. Physically go offline if needed.', time: '90 min' },
                  { num: '04', label: 'Commit', desc: 'Push to GitHub with a descriptive commit message saying what was built (e.g. "feat: add CLI Calc validation").', time: '5 min' },
                  { num: '05', label: 'Review', desc: 'Apply AI Stage 3 — paste your working code and ask: "What would you improve? What\'s a known bad pattern?" Re-implement yourself.', time: '20 min' },
                  { num: '06', label: 'Journal', desc: 'Write three sentences in your README log: what was built, what was the hardest barrier, and what to improve tomorrow.', time: '5 min' },
                  { num: '07', label: 'Maintain', desc: 'Rotate secondary slots: DSA review problems, SQL console query audits, or placement aptitude drills.', time: '45 min' }
                ].map((step) => {
                  const isChecked = checkedSteps[step.num];
                  return (
                    <div 
                      key={step.num}
                      onClick={() => toggleStep(step.num)}
                      style={{
                        display: 'flex',
                        gap: '14px',
                        padding: '12px 14px',
                        background: isChecked ? 'rgba(16, 185, 129, 0.02)' : 'var(--bg3)',
                        border: '1px solid',
                        borderColor: isChecked ? 'rgba(16, 185, 129, 0.2)' : 'var(--border)',
                        borderRadius: 'var(--radius)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        border: `1.5px solid ${isChecked ? 'var(--green)' : 'var(--text3)'}`,
                        background: isChecked ? 'var(--green)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--bg)',
                        fontWeight: 'bold',
                        fontSize: '11px',
                        marginTop: '2px',
                        flexShrink: 0
                      }}>
                        {isChecked && "✓"}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          fontWeight: 600, 
                          fontSize: '0.88rem', 
                          color: isChecked ? 'var(--text2)' : 'var(--text)',
                          textDecoration: isChecked ? 'line-through' : 'none'
                        }}>
                          {step.num}. {step.label}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text3)', marginTop: '3px', lineHeight: '1.4' }}>
                          {step.desc}
                        </div>
                      </div>
                      <span style={{ 
                        fontSize: '0.72rem', 
                        fontFamily: 'var(--mono)', 
                        color: isChecked ? 'var(--text3)' : 'var(--accent-light)',
                        alignSelf: 'flex-start',
                        marginTop: '2px'
                      }}>
                        {step.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Dynamic Sub-tab Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{
                display: 'flex',
                gap: '6px',
                background: 'var(--bg3)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '4px'
              }}>
                {[
                  { id: 'ai-policy', label: 'AI Code Rules' },
                  { id: 'day-types', label: 'Day Patterns' },
                  { id: 'readiness', label: 'Readiness' },
                  { id: 'links', label: 'References' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSubTab(tab.id as any)}
                    className="btn btn-sm"
                    style={{
                      flex: 1,
                      background: activeSubTab === tab.id ? 'var(--bg2)' : 'transparent',
                      color: activeSubTab === tab.id ? 'var(--accent-light)' : 'var(--text2)',
                      borderColor: activeSubTab === tab.id ? 'var(--border)' : 'transparent',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      padding: '6px 0',
                      cursor: 'pointer'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Sub-tab Content Panel */}
              <div className="card" style={{ minHeight: '380px', padding: '24px' }}>
                
                {activeSubTab === 'ai-policy' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <ShieldAlert style={{ color: 'var(--red)' }} size={18} />
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 700 }}>AI Restriction Policies</h4>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text2)', lineHeight: '1.4' }}>
                      To prevent syntax dependencies, enforce strict constraints on your AI Mentor based on the active curriculum phase.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <span className="badge badge-red" style={{ flexShrink: 0 }}>Stage 1</span>
                        <div>
                          <strong style={{ fontSize: '0.85rem', display: 'block', color: 'var(--text)' }}>Zero AI (Phase 0, 1, 2)</strong>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text3)', display: 'block', marginTop: '2px', lineHeight: '1.4' }}>
                            All code written physically by hand. No copypasting. Learn syntax parameters from compiler errors.
                          </span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <span className="badge badge-amber" style={{ flexShrink: 0 }}>Stage 2</span>
                        <div>
                          <strong style={{ fontSize: '0.85rem', display: 'block', color: 'var(--text)' }}>Structural Read (Phase 3, 4)</strong>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text3)', display: 'block', marginTop: '2px', lineHeight: '1.4' }}>
                            You may ask AI for conceptual descriptions, ERDs, or syntax samples. Autocompletion of files remains locked.
                          </span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <span className="badge badge-green" style={{ flexShrink: 0 }}>Stage 3</span>
                        <div>
                          <strong style={{ fontSize: '0.85rem', display: 'block', color: 'var(--text)' }}>Review & Observability (Phase 5, 6, 7)</strong>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text3)', display: 'block', marginTop: '2px', lineHeight: '1.4' }}>
                            Write the code yourself first. Commit it, then pass it to the AI Mentor for reviews and audits.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSubTab === 'day-types' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Clock style={{ color: 'var(--accent)' }} size={18} />
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 700 }}>Operational Patterns</h4>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text2)', lineHeight: '1.4' }}>
                      Study block structures mapped against academic calendars to ensure consistent daily commitment.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                      <div style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '10px' }}>
                        <strong style={{ fontSize: '0.82rem', display: 'block', color: 'var(--text)' }}>Type A: Buffer / Sprint Day</strong>
                        <span style={{ fontSize: '0.76rem', color: 'var(--text3)', display: 'block', marginTop: '2px' }}>
                          Morning (90m concept) + Midday (60m mini-build) + Evening (45m SQL/DSA).
                        </span>
                      </div>
                      <div style={{ borderLeft: '3px solid var(--blue)', paddingLeft: '10px' }}>
                        <strong style={{ fontSize: '0.82rem', display: 'block', color: 'var(--text)' }}>Type B: College Instruction Day</strong>
                        <span style={{ fontSize: '0.76rem', color: 'var(--text3)', display: 'block', marginTop: '2px' }}>
                          Midday (30m SQL logs) + Evening (90m code block + 45m git commit logs).
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeSubTab === 'readiness' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Layers style={{ color: 'var(--green)' }} size={18} />
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 700 }}>Exit Gate Readiness Metrics</h4>
                    </div>
                    <div className="tbl-wrap" style={{ marginTop: '8px' }}>
                      <table style={{ fontSize: '0.78rem' }}>
                        <thead>
                          <tr><th>Milestone</th><th>Exit gate criteria</th><th>Status</th></tr>
                        </thead>
                        <tbody>
                          <tr><td>Python Core</td><td>Multi-class order script &lt;45m</td><td><span className="badge badge-green">Passed</span></td></tr>
                          <tr><td>SQL Aggregation</td><td>3-table window joins &lt;15m</td><td><span className="badge badge-amber">Active</span></td></tr>
                          <tr><td>Responsive CSS</td><td>Responsive layouts &lt;1 hr</td><td><span className="badge badge-red">Locked</span></td></tr>
                          <tr><td>FastAPI APIs</td><td>Auth CRUD API &lt;2 hrs</td><td><span className="badge badge-red">Locked</span></td></tr>
                          <tr><td>React SPA</td><td>Task stage context &lt;3 hrs</td><td><span className="badge badge-red">Locked</span></td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeSubTab === 'links' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <FolderOpen style={{ color: 'var(--accent)' }} size={18} />
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 700 }}>Quick Reference Links</h4>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text2)', lineHeight: '1.4' }}>
                      Official documentation sheets for rapid syntax verification.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg3)', padding: '10px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>FastAPI API Reference</span>
                        <a href="https://fastapi.tiangolo.com/" target="_blank" rel="noreferrer" style={{ fontSize: '0.76rem', color: 'var(--accent-light)', fontWeight: 600 }}>Open &rarr;</a>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg3)', padding: '10px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>SQLAlchemy 2.0 ORM</span>
                        <a href="https://docs.sqlalchemy.org/" target="_blank" rel="noreferrer" style={{ fontSize: '0.76rem', color: 'var(--accent-light)', fontWeight: 600 }}>Open &rarr;</a>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg3)', padding: '10px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>React Dev Guides</span>
                        <a href="https://react.dev/" target="_blank" rel="noreferrer" style={{ fontSize: '0.76rem', color: 'var(--accent-light)', fontWeight: 600 }}>Open &rarr;</a>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      );

    default:
      return (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <HelpCircle size={24} style={{ color: 'var(--text3)', marginBottom: '8px' }} />
          <p style={{ color: 'var(--text2)' }}>Section content could not be loaded.</p>
        </div>
      );
  }
};
