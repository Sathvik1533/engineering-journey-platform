import { useEffect, useState, useCallback, useRef } from 'react';
import { useEngineeringState } from '../context/EngineeringStateContext';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface DiagnosticSnapshot {
  engineering_state: Record<string, any>;
  timeline_engine: Record<string, any>;
  recommendation_engine: Record<string, any>;
  capability_engine: Record<string, any>;
  recovery_engine: Record<string, any>;
  completion_analytics: Record<string, any>;
  ai_context: Record<string, any>;
  meta: Record<string, any>;
}

type DevTab = 'state' | 'timeline' | 'recommendation' | 'capability' | 'analytics' | 'timemachine';

interface SimulationResult {
  simulated_date: string;
  delta_from_today: number;
  weekday: string;
  is_sunday: boolean;
  projected_semester: string;
  projected_week: number;
  is_exam_window: boolean;
  timeline: Record<string, any>;
  recommendation: Record<string, any>;
  capability: Record<string, any>;
  meta: Record<string, any>;
}

interface TimePreset {
  id: string;
  label: string;
  date: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// JSON Tree Renderer — minimal, pretty, terminal-style
// ─────────────────────────────────────────────────────────────────────────────

function JsonValue({ value, depth = 0 }: { value: any; depth?: number }) {
  const [collapsed, setCollapsed] = useState(depth > 1);
  const indent = '  '.repeat(depth);

  if (value === null) return <span style={{ color: '#ff7b7b' }}>null</span>;
  if (typeof value === 'boolean') return <span style={{ color: '#79c0ff' }}>{value ? 'true' : 'false'}</span>;
  if (typeof value === 'number') return <span style={{ color: '#ffa657' }}>{value}</span>;
  if (typeof value === 'string') return <span style={{ color: '#a5d6ff' }}>"{value}"</span>;

  if (Array.isArray(value)) {
    if (value.length === 0) return <span style={{ color: '#8b949e' }}>[]</span>;
    return (
      <span>
        <button
          onClick={() => setCollapsed(c => !c)}
          style={{ background: 'none', border: 'none', color: '#58a6ff', cursor: 'pointer', padding: '0 2px', fontSize: '11px' }}
        >
          {collapsed ? '▶' : '▼'}
        </button>
        {collapsed ? (
          <span style={{ color: '#8b949e' }}>[{value.length} items]</span>
        ) : (
          <span>
            {'[\n'}
            {value.map((item, i) => (
              <span key={i}>
                {indent}  <JsonValue value={item} depth={depth + 1} />{i < value.length - 1 ? ',' : ''}
                {'\n'}
              </span>
            ))}
            {indent}{']'}
          </span>
        )}
      </span>
    );
  }

  if (typeof value === 'object') {
    const keys = Object.keys(value);
    if (keys.length === 0) return <span style={{ color: '#8b949e' }}>{'{}'}</span>;
    return (
      <span>
        <button
          onClick={() => setCollapsed(c => !c)}
          style={{ background: 'none', border: 'none', color: '#58a6ff', cursor: 'pointer', padding: '0 2px', fontSize: '11px' }}
        >
          {collapsed ? '▶' : '▼'}
        </button>
        {collapsed ? (
          <span style={{ color: '#8b949e' }}>{'{...}'} <span style={{ fontSize: '10px' }}>({keys.length} keys)</span></span>
        ) : (
          <span>
            {'{\n'}
            {keys.map((key, i) => (
              <span key={key}>
                {indent}  <span style={{ color: '#7ee787' }}>"{key}"</span>
                <span style={{ color: '#8b949e' }}>: </span>
                <JsonValue value={value[key]} depth={depth + 1} />
                {i < keys.length - 1 ? ',' : ''}
                {'\n'}
              </span>
            ))}
            {indent}{'}'}
          </span>
        )}
      </span>
    );
  }

  return <span style={{ color: '#8b949e' }}>{String(value)}</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Stat Pill — compact KV display
// ─────────────────────────────────────────────────────────────────────────────

function StatPill({ label, value, color }: { label: string; value: string | number; color?: string }) {
  return (
    <div style={{
      display: 'flex',
      gap: '6px',
      alignItems: 'center',
      padding: '4px 10px',
      borderRadius: '6px',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.07)',
      fontSize: '11px',
      fontFamily: 'var(--mono)',
    }}>
      <span style={{ color: '#8b949e' }}>{label}</span>
      <span style={{ color: color || '#e6edf3', fontWeight: 600 }}>{value}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab Button
// ─────────────────────────────────────────────────────────────────────────────

function DevTabBtn({ id, label, active, onClick }: {
  id: DevTab; label: string; active: boolean; onClick: (id: DevTab) => void;
}) {
  return (
    <button
      onClick={() => onClick(id)}
      style={{
        padding: '5px 12px',
        borderRadius: '6px',
        border: active ? '1px solid #388bfd' : '1px solid transparent',
        background: active ? 'rgba(56,139,253,0.15)' : 'transparent',
        color: active ? '#58a6ff' : '#8b949e',
        fontSize: '11px',
        fontFamily: 'var(--mono)',
        cursor: 'pointer',
        transition: 'all 0.15s',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Time Machine Panel
// ─────────────────────────────────────────────────────────────────────────────

function TimeMachinePanel({ currentDate }: { currentDate: string }) {
  const [presets, setPresets] = useState<TimePreset[]>([]);
  const [customDate, setCustomDate] = useState(currentDate);
  const [simulation, setSimulation] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/debug/presets')
      .then(r => r.json())
      .then(data => setPresets(data.presets || []))
      .catch(() => {});
  }, []);

  const simulate = async (date: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/debug/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ simulate_date: date }),
      });
      const data = await res.json();
      setSimulation(data);
    } catch (e) {
      console.error('Simulation failed', e);
    } finally {
      setLoading(false);
    }
  };

  const statusColor = simulation?.timeline?.status === 'On Schedule' ? '#3fb950'
    : simulation?.timeline?.status === 'At Risk' ? '#d29922' : '#f85149';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
      {/* Date Input */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input
          type="date"
          value={customDate}
          onChange={e => setCustomDate(e.target.value)}
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px',
            color: '#e6edf3',
            padding: '6px 10px',
            fontSize: '12px',
            fontFamily: 'var(--mono)',
          }}
        />
        <button
          onClick={() => simulate(customDate)}
          disabled={loading}
          style={{
            padding: '6px 14px',
            borderRadius: '6px',
            border: '1px solid #388bfd',
            background: 'rgba(56,139,253,0.2)',
            color: '#58a6ff',
            fontSize: '12px',
            fontFamily: 'var(--mono)',
            cursor: 'pointer',
            transition: 'all 0.15s',
            whiteSpace: 'nowrap',
          }}
        >
          {loading ? '⟳' : '▶ Simulate'}
        </button>
      </div>

      {/* Preset Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {presets.map(p => (
          <button
            key={p.id}
            onClick={() => { setCustomDate(p.date); simulate(p.date); }}
            style={{
              padding: '4px 9px',
              borderRadius: '5px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.04)',
              color: '#8b949e',
              fontSize: '10px',
              fontFamily: 'var(--mono)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Simulation Result */}
      {simulation && (
        <div style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          {/* Header info */}
          <div style={{
            padding: '10px 12px',
            borderRadius: '8px',
            background: simulation.is_exam_window
              ? 'rgba(248,81,73,0.1)' : 'rgba(63,185,80,0.07)',
            border: `1px solid ${simulation.is_exam_window ? 'rgba(248,81,73,0.3)' : 'rgba(63,185,80,0.2)'}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: '#e6edf3', fontWeight: 600 }}>
                {simulation.simulated_date}
              </span>
              <span style={{
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '10px',
                background: simulation.is_exam_window ? 'rgba(248,81,73,0.2)' : 'rgba(63,185,80,0.15)',
                color: simulation.is_exam_window ? '#f85149' : '#3fb950',
                fontFamily: 'var(--mono)',
              }}>
                {simulation.is_exam_window ? '🔒 EXAM WINDOW' : '🟢 ACTIVE'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <StatPill label="Day" value={simulation.weekday} />
              <StatPill label="Δ" value={`${simulation.delta_from_today > 0 ? '+' : ''}${simulation.delta_from_today}d`} color={simulation.delta_from_today >= 0 ? '#58a6ff' : '#f85149'} />
              <StatPill label="Sem" value={simulation.projected_semester} />
              <StatPill label="Week" value={simulation.projected_week} />
            </div>
          </div>

          {/* Recommendation */}
          <div style={{ padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '10px', color: '#8b949e', fontFamily: 'var(--mono)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recommendation Engine</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: '#ffa657', marginBottom: '6px' }}>
              {simulation.recommendation.task_id}
            </div>
            <div style={{ fontSize: '11px', color: '#8b949e', lineHeight: 1.6 }}>
              {simulation.recommendation.justification?.slice(0, 200)}{simulation.recommendation.justification?.length > 200 ? '…' : ''}
            </div>
          </div>

          {/* Timeline Status */}
          <div style={{ padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '10px', color: '#8b949e', fontFamily: 'var(--mono)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Timeline Engine</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <StatPill label="Status" value={simulation.timeline.status} color={statusColor} />
              <StatPill label="Buffer" value={`${simulation.timeline.remaining_buffer}d`} color="#3fb950" />
              <StatPill label="Slippage" value={`${simulation.timeline.slippage_days}d`} color={simulation.timeline.slippage_days > 0 ? '#f85149' : '#3fb950'} />
            </div>
          </div>

          {/* Capability at that date */}
          <div style={{ padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '10px', color: '#8b949e', fontFamily: 'var(--mono)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Capability Scores</div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {Object.entries(simulation.capability.capability_scores).map(([k, v]) => (
                <StatPill key={k} label={k} value={`${v}%`} color={(v as number) >= 70 ? '#3fb950' : (v as number) >= 40 ? '#d29922' : '#8b949e'} />
              ))}
            </div>
            <div style={{ marginTop: '8px', fontSize: '11px', color: '#58a6ff', fontFamily: 'var(--mono)' }}>
              Overall Readiness: {simulation.capability.overall_readiness}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Developer Mode Overlay — Main Component
// ─────────────────────────────────────────────────────────────────────────────

export function DeveloperModeOverlay() {
  const { state } = useEngineeringState();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<DevTab>('state');
  const [snapshot, setSnapshot] = useState<DiagnosticSnapshot | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('');
  const panelRef = useRef<HTMLDivElement>(null);

  // Keyboard activation: Cmd+Shift+D or Ctrl+Shift+D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setIsOpen(open => !open);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Fetch snapshot when panel opens
  const fetchSnapshot = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/debug/snapshot');
      const data = await res.json();
      setSnapshot(data);
      setLastRefreshed(new Date().toLocaleTimeString());
    } catch (e) {
      console.error('Failed to fetch debug snapshot', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) fetchSnapshot();
  }, [isOpen, fetchSnapshot]);

  if (!isOpen) {
    return (
      <div
        title="Developer Mode (Cmd+Shift+D)"
        style={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          zIndex: 9999,
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'rgba(30,30,36,0.8)',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.2s',
          fontSize: '14px',
          opacity: 0.4,
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '0.4')}
        onClick={() => setIsOpen(true)}
      >
        🔧
      </div>
    );
  }

  const tabData = (() => {
    if (!snapshot) return null;
    switch (activeTab) {
      case 'state': return snapshot.engineering_state;
      case 'timeline': return { ...snapshot.timeline_engine, recovery: snapshot.recovery_engine };
      case 'recommendation': return snapshot.recommendation_engine;
      case 'capability': return snapshot.capability_engine;
      case 'analytics': return { ...snapshot.completion_analytics, ai_context: snapshot.ai_context, meta: snapshot.meta };
      default: return null;
    }
  })();

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: '16px',
      }}
    >
      <div
        ref={panelRef}
        style={{
          width: '520px',
          height: '640px',
          borderRadius: '12px',
          background: 'rgba(13,17,23,0.97)',
          border: '1px solid rgba(56,139,253,0.3)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(56,139,253,0.1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          pointerEvents: 'all',
          backdropFilter: 'blur(20px)',
          fontFamily: 'var(--mono)',
          animation: 'devPanelIn 0.2s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <style>{`
          @keyframes devPanelIn {
            from { transform: translateY(12px) scale(0.97); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
          }
        `}</style>

        {/* Header */}
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(56,139,253,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px' }}>🔧</span>
            <span style={{ fontSize: '12px', color: '#58a6ff', fontWeight: 600 }}>
              Developer Mode
            </span>
            <span style={{
              padding: '1px 6px',
              borderRadius: '3px',
              background: 'rgba(63,185,80,0.15)',
              color: '#3fb950',
              fontSize: '9px',
              border: '1px solid rgba(63,185,80,0.25)',
            }}>
              ACTIVE
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {lastRefreshed && (
              <span style={{ fontSize: '10px', color: '#8b949e' }}>Updated {lastRefreshed}</span>
            )}
            <button
              onClick={fetchSnapshot}
              disabled={loading}
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '5px',
                color: '#8b949e',
                fontSize: '11px',
                padding: '3px 8px',
                cursor: 'pointer',
              }}
            >
              {loading ? '⟳' : '↺ Refresh'}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#8b949e',
                fontSize: '16px',
                cursor: 'pointer',
                padding: '0 4px',
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Quick Stats Bar */}
        {snapshot && (
          <div style={{
            padding: '8px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
          }}>
            <StatPill label="Date" value={snapshot.engineering_state.current_date} />
            <StatPill label="Phase" value={snapshot.engineering_state.current_phase} color="#ffa657" />
            <StatPill label="Streak" value={`${snapshot.engineering_state.daily_streak}d`} color="#3fb950" />
            <StatPill
              label="Status"
              value={snapshot.engineering_state.schedule_status}
              color={snapshot.engineering_state.schedule_status === 'On Schedule' ? '#3fb950' : '#f85149'}
            />
            <StatPill label="Readiness" value={`${snapshot.capability_engine.overall_readiness}%`} color="#58a6ff" />
          </div>
        )}

        {/* Tab Navigation */}
        <div style={{
          padding: '8px 12px',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          display: 'flex',
          gap: '4px',
          overflowX: 'auto',
        }}>
          {[
            { id: 'state' as DevTab, label: '📊 State' },
            { id: 'timeline' as DevTab, label: '⏱ Timeline' },
            { id: 'recommendation' as DevTab, label: '🎯 Reco' },
            { id: 'capability' as DevTab, label: '📈 Capability' },
            { id: 'analytics' as DevTab, label: '🔍 Analytics' },
            { id: 'timemachine' as DevTab, label: '🕐 Time Machine' },
          ].map(tab => (
            <DevTabBtn
              key={tab.id}
              id={tab.id}
              label={tab.label}
              active={activeTab === tab.id}
              onClick={setActiveTab}
            />
          ))}
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '14px 16px',
          fontSize: '11px',
          lineHeight: 1.7,
          color: '#e6edf3',
          whiteSpace: 'pre-wrap',
        }}>
          {loading && !snapshot && (
            <div style={{ color: '#8b949e', textAlign: 'center', paddingTop: '60px' }}>
              Loading diagnostic snapshot...
            </div>
          )}

          {activeTab === 'timemachine' && state && (
            <TimeMachinePanel currentDate={state.current_date} />
          )}

          {activeTab !== 'timemachine' && tabData && (
            <code style={{ fontFamily: 'var(--mono)', fontSize: '11px' }}>
              <JsonValue value={tabData} depth={0} />
            </code>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '6px 16px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: '9px', color: '#8b949e' }}>
            ⌘⇧D to toggle · ESC to close · Read-only inspection
          </span>
          <span style={{ fontSize: '9px', color: '#8b949e' }}>
            Engineering OS v4.0 · Dev Mode
          </span>
        </div>
      </div>
    </div>
  );
}
