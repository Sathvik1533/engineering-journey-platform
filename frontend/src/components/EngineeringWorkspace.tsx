import React, { useState, useEffect, useRef } from 'react';
import { useEngineeringState } from '../context/EngineeringStateContext';
import { MonacoWorkspace } from './MonacoWorkspace';
import { 
  X, BookOpen, CheckSquare, Award, HelpCircle, 
  MessageSquare, RefreshCw, Send, CheckCircle2, Code
} from 'lucide-react';

interface EngineeringWorkspaceProps {
  nodeId: string;
  onClose: () => void;
}

type TabType = 'overview' | 'curriculum' | 'tasks' | 'code' | 'assessment' | 'ai';

export const EngineeringWorkspace: React.FC<EngineeringWorkspaceProps> = ({ nodeId, onClose }) => {
  const { state, toggleTask, passAssessment, fetchTopic } = useEngineeringState();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  
  // Dynamic topic loading states
  const [topic, setTopic] = useState<any>(null);
  const [loadingTopic, setLoadingTopic] = useState<boolean>(true);

  // Dynamic documentation loader states
  const [docContent, setDocContent] = useState<string>('');
  const [loadingDoc, setLoadingDoc] = useState<boolean>(false);

  // Timed assessment timer states
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [isAssessmentStarted, setIsAssessmentStarted] = useState<boolean>(false);

  // Interactive AI Mentor Chat states
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: 'Hi Sathwik! I am your topic-aware AI Mentor. I have full context on your curriculum and current progress for this workspace. Ask me anything about this topic!' }
  ]);
  const [userInput, setUserInput] = useState<string>('');
  const [sendingChat, setSendingChat] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Fetch Topic Object dynamically from backend Knowledge Engine
  useEffect(() => {
    let active = true;
    const loadTopic = async () => {
      setLoadingTopic(true);
      const data = await fetchTopic(nodeId);
      if (active) {
        setTopic(data);
        setLoadingTopic(false);
        setActiveTab('overview');
        setChatMessages([
          { role: 'assistant', content: `Hi Sathwik! I am your AI Mentor. Let's cover **${data?.title || nodeId}**. Ask me any conceptual question or paste your code here for review!` }
        ]);
      }
    };
    loadTopic();
    return () => { active = false; };
  }, [nodeId]);

  // Determine doc file to fetch based on phase/id prefix for supplemental reading
  useEffect(() => {
    if (!topic) return;
    
    let docName = '01-Foundation.md';
    if (topic.id.startsWith('week-3') || topic.id.startsWith('week-4') || topic.id.startsWith('phase-1')) {
      docName = '02-Semester-3-1.md';
    } else if (topic.id.startsWith('week-5') || topic.id.startsWith('week-6') || topic.id.startsWith('phase-2')) {
      docName = '02-Semester-3-1.md';
    } else if (topic.id.startsWith('week-7') || topic.id.startsWith('week-8') || topic.id.startsWith('week-9') || topic.id.startsWith('week-10') || topic.id.startsWith('phase-3') || topic.id.startsWith('phase-4')) {
      docName = '02-Semester-3-1.md';
    } else if (topic.id.startsWith('week-11') || topic.id.startsWith('week-12') || topic.id.startsWith('week-13') || topic.id.startsWith('week-14') || topic.id.startsWith('week-15') || topic.id.startsWith('phase-5') || topic.id.startsWith('phase-6')) {
      docName = '03-Semester-3-2.md';
    } else if (topic.id.startsWith('week-16') || topic.id.startsWith('week-17') || topic.id.startsWith('week-18') || topic.id.startsWith('phase-7')) {
      docName = '04-Placement-Advanced.md';
    } else if (topic.id.startsWith('week-19') || topic.id.startsWith('week-20') || topic.id.startsWith('phase-8')) {
      docName = '05-Professional-Growth.md';
    }

    const fetchDoc = async () => {
      setLoadingDoc(true);
      try {
        const res = await fetch(`/api/syllabus/docs/${docName}`);
        if (res.ok) {
          const text = await res.text();
          // Filter to show section corresponding to this topic title
          const lines = text.split('\n');
          const cleanLabel = topic.title.split(':')[1]?.trim() || topic.title;
          
          let filtered = [];
          let capture = false;
          let headingLevel = 2;

          for (let line of lines) {
            if (line.startsWith('#') || line.startsWith('**Week') || line.startsWith('**Month')) {
              const currentLevel = line.startsWith('#') ? (line.match(/^#+/)?.[0].length || 1) : 2;
              const matchesTitle = line.toLowerCase().includes(cleanLabel.toLowerCase()) || 
                                   line.toLowerCase().includes(topic.id.toLowerCase());
              
              if (matchesTitle) {
                capture = true;
                headingLevel = currentLevel;
                filtered.push(line);
              } else if (capture && currentLevel <= headingLevel) {
                capture = false;
              }
            } else if (capture) {
              filtered.push(line);
            }
          }
          
          setDocContent(filtered.join('\n').trim());
        }
      } catch (err) {
        console.error('Failed to load markdown details', err);
      } finally {
        setLoadingDoc(false);
      }
    };

    fetchDoc();
  }, [topic, nodeId]);

  // Timed Gate Assessment timer logic
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timerSeconds !== null && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => (s !== null ? s - 1 : null));
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerActive(false);
      alert('Assessment duration expired! Review your code and retry.');
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const handleStartAssessment = () => {
    setIsAssessmentStarted(true);
    setTimerSeconds(15 * 60); // 15 mins default fallback
    setTimerActive(true);
  };

  const handlePassGate = async () => {
    setTimerActive(false);
    await passAssessment(nodeId);
    alert('Exit Gate Passed! Graph dependencies updated.');
    onClose();
  };

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg = userInput;
    setUserInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setSendingChat(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatMessages, { role: 'user', content: userMsg }].map(m => ({
            role: m.role,
            content: `[Context: Node ${nodeId} - ${topic?.title || ''}] ${m.content}`
          }))
        })
      });

      if (res.ok) {
        const data = await res.json();
        setChatMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        throw new Error('AI request failed');
      }
    } catch (err) {
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '⚠️ Failed to connect with AI Mentor. Verify backend is running and Groq API key is valid.' 
      }]);
    } finally {
      setSendingChat(false);
    }
  };

  // Scroll chat to bottom on new messages
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  if (loadingTopic || !topic) {
    return (
      <div style={{
        position: 'fixed', inset: 0, background: '#fff', zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--sans)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <RefreshCw size={32} style={{ color: '#eab308', marginBottom: '12px', animation: 'spin 1s linear infinite' }} />
          <p style={{ color: '#475569', fontSize: '14px', fontFamily: 'var(--mono)' }}>Loading Engineering Workspace...</p>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  const isCompleted = state?.completed_topics.includes(nodeId);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#ffffff',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--sans)',
      animation: 'workspaceFadeIn 0.2s ease-out',
    }}>
      <style>{`
        @keyframes workspaceFadeIn {
          from { opacity: 0; transform: scale(0.99); }
          to { opacity: 1; transform: scale(1); }
        }
        .workspace-tab {
          border-bottom: 2px solid transparent;
          color: #64748b;
          font-weight: 600;
          font-size: 13px;
          padding: 16px 20px;
          cursor: pointer;
          transition: all 0.15s;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .workspace-tab:hover {
          color: #0f172a;
          background: #f8fafc;
        }
        .workspace-tab.active {
          border-color: #0f172a;
          color: #0f172a;
          font-weight: 700;
        }
        .concept-body code {
          background: #f1f5f9;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: var(--mono);
          font-size: 12px;
        }
        .concept-body pre {
          background: #0f172a;
          color: #e2e8f0;
          padding: 14px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 12px 0;
          font-family: var(--mono);
          font-size: 12px;
        }
      `}</style>

      {/* Header Panel */}
      <header style={{
        background: '#ffffff',
        borderBottom: '2px solid #0f172a',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            background: isCompleted ? '#ecfdf5' : '#fffbeb',
            border: `2px solid ${isCompleted ? '#10b981' : '#eab308'}`,
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '11px',
            fontWeight: 800,
            color: isCompleted ? '#059669' : '#d97706',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            {isCompleted ? '✓ Completed' : '⚙ Active'}
          </div>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              {topic.title}
            </h1>
            <div style={{ display: 'flex', gap: '12px', marginTop: '2px', fontSize: '11px', color: '#64748b' }}>
              <span>Est. Effort: <strong style={{ color: '#334155' }}>{topic.effort}</strong></span>
              <span>•</span>
              <span>Target Capability: <strong style={{ color: '#334155' }}>{topic.capability_gained}</strong></span>
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          style={{
            border: '2px solid #0f172a',
            background: '#ffffff',
            borderRadius: '6px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
          onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}
        >
          <X size={16} color="#0f172a" />
        </button>
      </header>

      {/* Tabs Menu */}
      <nav style={{
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        padding: '0 32px'
      }}>
        <div 
          onClick={() => setActiveTab('overview')}
          className={`workspace-tab ${activeTab === 'overview' ? 'active' : ''}`}
        >
          <Award size={15} /> Overview
        </div>
        <div 
          onClick={() => setActiveTab('curriculum')}
          className={`workspace-tab ${activeTab === 'curriculum' ? 'active' : ''}`}
        >
          <BookOpen size={15} /> Concepts & Study
        </div>
        <div 
          onClick={() => setActiveTab('tasks')}
          className={`workspace-tab ${activeTab === 'tasks' ? 'active' : ''}`}
        >
          <CheckSquare size={15} /> Practice Tasks
        </div>
        {topic.language && (
          <div 
            onClick={() => setActiveTab('code')}
            className={`workspace-tab ${activeTab === 'code' ? 'active' : ''}`}
          >
            <Code size={15} /> Monaco Playground
          </div>
        )}
        <div 
          onClick={() => setActiveTab('assessment')}
          className={`workspace-tab ${activeTab === 'assessment' ? 'active' : ''}`}
        >
          <HelpCircle size={15} /> Exit Gate
        </div>
        <div 
          onClick={() => setActiveTab('ai')}
          className={`workspace-tab ${activeTab === 'ai' ? 'active' : ''}`}
        >
          <MessageSquare size={15} /> AI Mentor
        </div>
      </nav>

      {/* Tab Work Content Area */}
      <main style={{
        flex: 1,
        overflowY: 'auto',
        background: '#f8fafc',
        padding: '32px'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', background: '#ffffff', border: '2px solid #0f172a', borderRadius: '8px', padding: '32px', boxShadow: '0 8px 0 rgba(15,23,42,0.05)' }}>
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Mission Objective
                </h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                  {topic.mission}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '16px' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', textTransform: 'uppercase' }}>
                    Why This Matters
                  </h4>
                  <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    {topic.why}
                  </p>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '16px' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', textTransform: 'uppercase' }}>
                    Real-World Relevance
                  </h4>
                  <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    {topic.relevance}
                  </p>
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                    Capabilities Gained
                  </h4>
                  <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    {topic.capability_gained}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                    Future Connections & Unlocks
                  </h4>
                  <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    {topic.future_connections}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CURRICULUM & CONCEPTS */}
          {activeTab === 'curriculum' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '12px', textTransform: 'uppercase' }}>
                  Syllabus Core Concepts
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {(topic.concepts || []).map((m: string, idx: number) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '8px 12px', borderRadius: '4px', fontSize: '13px', border: '1px solid #e2e8f0' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#eab308' }} />
                      <span style={{ color: '#334155', fontWeight: 500 }}>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {topic.subtopics && topic.subtopics.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', textTransform: 'uppercase' }}>
                    Detailed Subtopics
                  </h3>
                  <ul style={{ paddingLeft: '20px', color: '#475569', fontSize: '13.5px', lineHeight: '1.6' }}>
                    {topic.subtopics.map((sub: string, idx: number) => (
                      <li key={idx}>{sub}</li>
                    ))}
                  </ul>
                </div>
              )}

              {topic.examples && (
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', textTransform: 'uppercase' }}>
                    Examples & References
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.5', margin: 0 }}>
                    {topic.examples}
                  </p>
                </div>
              )}

              <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

              <div>
                <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '12px', textTransform: 'uppercase' }}>
                  Volume Documentation Reference
                </h3>
                {loadingDoc ? (
                  <p style={{ color: '#64748b', fontSize: '13px' }}>Loading volume references...</p>
                ) : (
                  <div 
                    className="concept-body"
                    style={{ 
                      background: '#fafafa', 
                      border: '1px solid #e2e8f0', 
                      borderRadius: '6px', 
                      padding: '20px', 
                      fontSize: '13px', 
                      whiteSpace: 'pre-wrap',
                      maxHeight: '400px',
                      overflowY: 'auto'
                    }}
                  >
                    {docContent || "No specific detailed notes mapped for this checkpoint node. Read Volume documentation files in the workspace directory."}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PRACTICE TASKS */}
          {activeTab === 'tasks' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '12px', textTransform: 'uppercase' }}>
                  Interactive Practice Checklist
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                  Complete the following manual code assignments on your local filesystem or directly in the Monaco Playground.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {(topic.practice || []).map((task: string, idx: number) => {
                    const taskKey = `practice-${topic.id}-${idx}`;
                    const isChecked = state?.completed_topics.includes(taskKey) || false;

                    return (
                      <div 
                        key={idx}
                        style={{
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          background: isChecked ? '#f0fdf4' : '#ffffff',
                          padding: '14px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px'
                        }}
                      >
                        <input 
                          type="checkbox" 
                          checked={isChecked}
                          onChange={(e) => toggleTask(taskKey, e.target.checked)}
                          style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#10b981' }}
                        />
                        <span style={{ fontSize: '13.5px', color: '#334155', fontWeight: 500 }}>
                          {task}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {topic.mini_build && (
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', textTransform: 'uppercase' }}>
                    Mini Build Specification
                  </h3>
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '16px' }}>
                    <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.6', margin: 0 }}>
                      {topic.mini_build}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: MONACO PLAYGROUND */}
          {activeTab === 'code' && topic.language && (
            <MonacoWorkspace 
              topicId={nodeId}
              language={topic.language}
              codeTemplate={topic.code_template}
              onSubmitComplete={() => {
                toggleTask(nodeId, true);
                passAssessment(nodeId);
              }}
            />
          )}

          {/* TAB 5: EXIT GATES */}
          {activeTab === 'assessment' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Exit Criteria Verification
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                  Ensure you comfortably achieve the following benchmarks before checking off this node:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  {(topic.exit_criteria || []).map((crit: string, idx: number) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13.5px', color: '#334155' }}>
                      <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>{crit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

              <div>
                <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '12px', textTransform: 'uppercase' }}>
                  Gate Assessment Challenge
                </h3>
                <div style={{ background: '#fffdf5', border: '2px solid #eab308', borderRadius: '6px', padding: '24px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#b45309', margin: '0 0 10px 0' }}>
                    Timed Exit Challenge
                  </h4>
                  <p style={{ fontSize: '13.5px', color: '#78350f', lineHeight: 1.6, marginBottom: '20px' }}>
                    {topic.assessment}
                  </p>

                  {isAssessmentStarted ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--mono)' }}>
                        {timerSeconds !== null ? formatTime(timerSeconds) : '--:--'}
                      </div>
                      <button
                        onClick={handlePassGate}
                        className="btn"
                        style={{ background: '#10b981', color: '#ffffff', border: '2px solid #0f172a', boxShadow: '2px 2px 0 #0f172a', fontWeight: 800 }}
                      >
                        Pass Exit Gate
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleStartAssessment}
                      className="btn"
                      style={{ background: '#eab308', color: '#0f172a', border: '2px solid #0f172a', boxShadow: '2px 2px 0 #0f172a', fontWeight: 800 }}
                    >
                      Start Challenge Timer
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: AI MENTOR CHAT */}
          {activeTab === 'ai' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '450px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Live AI Mentor Scoped Chat</span>
              </div>

              {/* Chat Messages Log */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                border: '2px solid #0f172a',
                borderRadius: '6px',
                padding: '16px',
                background: '#fafafa',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {chatMessages.map((msg, idx) => (
                  <div 
                    key={idx}
                    style={{
                      alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '80%',
                      background: msg.role === 'user' ? '#f1f5f9' : '#ffffff',
                      color: '#0f172a',
                      border: '2px solid #0f172a',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      fontSize: '13.5px',
                      lineHeight: 1.5,
                      boxShadow: '2px 2px 0px rgba(15,23,42,0.05)',
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    {msg.content}
                  </div>
                ))}
                {sendingChat && (
                  <div style={{ alignSelf: 'flex-start', background: '#ffffff', border: '2px solid #cbd5e1', padding: '10px 14px', borderRadius: '8px', color: '#94a3b8', fontSize: '12px' }}>
                    Thinking...
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <input 
                  type="text" 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={`Ask a question about ${topic.title}...`}
                  style={{
                    flex: 1,
                    background: '#ffffff',
                    border: '2px solid #0f172a',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  disabled={sendingChat || !userInput.trim()}
                  className="btn"
                  style={{
                    background: '#0f172a',
                    color: '#ffffff',
                    border: '2px solid #0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};
