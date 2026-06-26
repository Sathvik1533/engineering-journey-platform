import React, { useState, useEffect } from 'react';
import { useEngineeringState } from '../context/EngineeringStateContext';
import { 
  Compass, 
  Calendar, 
  Flame, 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  BookOpen, 
  Layers, 
  CheckSquare, 
  ChevronRight,
  Code,
  Award
} from 'lucide-react';

export const MissionControl: React.FC = () => {
  const { state, syllabus, setDate, toggleFreeze, toggleTask, passAssessment } = useEngineeringState();
  const [simulatedDate, setSimulatedDate] = useState(state?.current_date || '2026-06-26');
  const [localCheckedItems, setLocalCheckedItems] = useState<Record<string, boolean>>({});
  const [systemTime, setSystemTime] = useState(new Date());

  // Keep simulated date in sync with state
  useEffect(() => {
    if (state) {
      setSimulatedDate(state.current_date);
    }
  }, [state]);

  // Update clock for estimated finish time
  useEffect(() => {
    const timer = setInterval(() => setSystemTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, [systemTime]);

  if (!state) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ color: 'var(--text3)' }}>Loading active Engineering OS state...</p>
      </div>
    );
  }

  // Parse recommendation details
  let justificationObj = { why: "", capability: "", milestone: "" };
  try {
    justificationObj = JSON.parse(state.recommendation_justification);
  } catch (e) {
    justificationObj = {
      why: state.recommendation_justification,
      capability: "Core engineering logic and syntax",
      milestone: "Phase Exit Gate Assessment"
    };
  }

  // Get current day/assessment metadata mapping
  const getActiveTaskDetails = () => {
    const taskId = state.recommended_task_id;
    
    let details = {
      title: taskId.replace('-', ' ').toUpperCase(),
      mission: "No active mission description available.",
      practice: [] as string[],
      miniBuild: "Build the requested task/assessment.",
      exitCriteria: "Verify all outputs.",
      aiStage: "Stage 1 — Zero AI",
      technology: state.current_technology,
      duration: "3.5 Hours",
      project: state.current_project,
      type: "day"
    };

    if (!syllabus) return details;

    if (taskId.startsWith("day-")) {
      const dayNum = parseInt(taskId.split("-")[1]);
      for (const node of Object.values(syllabus)) {
        if (node.dayMissions) {
          const found = node.dayMissions.find(m => m.dayNum === dayNum);
          if (found) {
            details.title = `Day ${dayNum}: ${found.title}`;
            details.mission = found.mission;
            details.practice = found.practice || [];
            details.miniBuild = found.miniBuild;
            details.exitCriteria = found.exitCriteria;
            details.aiStage = node.aiStage;
            details.technology = node.technology;
            details.project = state.current_project || "CLI Portfolio Tools";
            details.type = "day";
            return details;
          }
        }
      }
    } else if (taskId.startsWith("week-") && taskId.endsWith("-assessment")) {
      const weekId = taskId.replace("-assessment", "");
      const node = syllabus[weekId];
      if (node && node.timedAssessment) {
        details.title = node.timedAssessment.title;
        details.mission = `Exit gate assessment for ${node.title}. Verify phase competence.`;
        details.practice = ["Review previous daily practice files", "Ensure clean compilation environment"];
        details.miniBuild = node.timedAssessment.prompt;
        details.exitCriteria = `Pass all test configurations within ${node.timedAssessment.durationMinutes} minutes.`;
        details.aiStage = node.aiStage;
        details.technology = node.technology;
        details.duration = `${node.timedAssessment.durationMinutes} Minutes`;
        details.type = "assessment";
        return details;
      }
    } else if (taskId === "sunday-review") {
      details.title = "Mandatory Sunday Review & Calibration";
      details.mission = "Log commits, audit completed topics, update reflective metrics diary, and plan the upcoming week.";
      details.practice = ["Reflective progress logging", "Check git repository sync status", "Verify weekly streak continuity"];
      details.miniBuild = "45-minute Weekly Review Protocol document update";
      details.exitCriteria = "Submit reflection log to unlock next week's sprint modules.";
      details.aiStage = "Self-Evaluation Mode";
      details.technology = "Engineering Aptitude";
      details.duration = "45 Minutes";
      details.type = "sunday";
    } else if (taskId.startsWith("revision-")) {
      const topic = taskId.replace("revision-", "").toUpperCase();
      details.title = `Exam Maintenance Revision: ${topic}`;
      details.mission = "College exam freeze is active. Standard concepts are paused. Focus on reviewing this weakest technology track and run daily 15-minute DSA logic practice.";
      details.practice = ["Review completed code packages", "Solve 1 DSA review problem from memory", "Run local compiler diagnostics"];
      details.miniBuild = "Refactor previous practice files or projects for clean modular design";
      details.exitCriteria = "Consolidate concept retention. Resume track after exam window closes.";
      details.aiStage = "Stage 2 - Helper Allowed";
      details.technology = topic;
      details.duration = "2 Hours";
      details.type = "revision";
    }

    return details;
  };

  const taskDetails = getActiveTaskDetails();

  const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setSimulatedDate(newDate);
    await setDate(newDate);
  };

  const handleToggleFreeze = async () => {
    const isFreeze = !state.is_maintenance;
    await toggleFreeze(isFreeze);
  };

  const handleExecuteRecommendedTask = async () => {
    const taskId = state.recommended_task_id;
    if (taskId.startsWith('day-')) {
      await toggleTask(taskId, true);
    } else if (taskId.includes('-assessment')) {
      const assessmentId = taskId.replace('-assessment', '');
      await passAssessment(assessmentId);
    } else if (taskId === 'sunday-review') {
      await toggleTask('sunday-review', true);
    } else if (taskId.startsWith('revision-')) {
      await toggleTask(taskId, true);
    }
    setLocalCheckedItems({});
  };

  const toggleLocalCheck = (key: string) => {
    setLocalCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Get dynamic finish time based on clock
  const getEstimatedFinishTime = (durationStr: string) => {
    let hoursToAdd = 3.5;
    if (durationStr.includes("Hours") || durationStr.includes("hrs")) {
      const match = durationStr.match(/(\d+(\.\d+)?)/);
      if (match) hoursToAdd = parseFloat(match[1]);
    } else if (durationStr.includes("Minutes") || durationStr.includes("mins")) {
      const match = durationStr.match(/(\d+)/);
      if (match) hoursToAdd = parseInt(match[1]) / 60;
    }
    const finishTime = new Date(systemTime.getTime() + hoursToAdd * 60 * 60 * 1000);
    return finishTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const estimatedFinish = getEstimatedFinishTime(taskDetails.duration);

  // Status mapping
  const statusColorMap: Record<string, string> = {
    "On Schedule": "var(--green)",
    "Behind Schedule": "var(--red)",
    "Ahead of Schedule": "var(--accent-light)",
    "Exam Freeze": "var(--amber)",
    "Sunday Rest": "var(--amber)"
  };

  const statusColor = statusColorMap[state.schedule_status] || "var(--text)";

  return (
    <div>
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: '20px' }}>
        <div className="page-eyebrow" style={{ marginBottom: '4px' }}>
          <Layers size={14} />
          Engineering Operating System
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="page-title" style={{ fontSize: '1.8rem', marginBottom: '2px' }}>Mission Control</h1>
            <p className="page-sub" style={{ fontSize: '0.85rem' }}>
              Your single source of truth developer workspace. Automatically calculated learning targets, academic buffer metrics, and streak vectors.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Student Metadata Tag */}
            <div style={{
              background: 'var(--bg3)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '8px 14px',
              fontSize: '0.78rem',
              color: 'var(--text2)',
              display: 'flex',
              flexDirection: 'column',
              lineHeight: '1.4'
            }}>
              <div><span style={{ color: 'var(--text3)', fontWeight: 600 }}>ENGINEER:</span> <strong style={{ color: 'var(--text)' }}>Kotagiri Sathwik</strong></div>
              <div><span style={{ color: 'var(--text3)', fontWeight: 600 }}>SEM:</span> <strong style={{ color: 'var(--text2)' }}>{state.current_semester}</strong></div>
            </div>

            {/* Streak Counter */}
            <div style={{
              background: 'var(--bg3)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Flame size={16} style={{ color: 'var(--amber)' }} />
              <div style={{ fontSize: '0.78rem', lineHeight: '1.4' }}>
                <div style={{ color: 'var(--text3)', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase' }}>Streak</div>
                <strong style={{ color: 'var(--text)' }}>{state.daily_streak} Days</strong>
              </div>
            </div>
            
            {/* Date Simulator */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'var(--bg3)',
              padding: '8px 14px',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)'
            }}>
              <Calendar size={15} style={{ color: 'var(--accent)' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text2)' }}>Date:</span>
              <input 
                type="date" 
                value={simulatedDate} 
                onChange={handleDateChange}
                style={{
                  background: 'var(--bg2)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  color: 'var(--text)',
                  padding: '3px 6px',
                  fontSize: '0.8rem',
                  outline: 'none',
                  fontFamily: 'var(--mono)'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.60fr) minmax(0, 1fr)', gap: '24px', alignItems: 'start' }}>
        
        {/* Left Column: Today's Mission & Active Workspace Tasks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Today's Mission Core Hero Panel */}
          <div style={{
            background: 'linear-gradient(135deg, var(--bg2) 0%, rgba(99, 102, 241, 0.03) 100%)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            position: 'relative',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(99,102,241,0.06)',
              border: '1px solid rgba(99,102,241,0.15)',
              borderRadius: '999px',
              padding: '4px 12px',
              fontSize: '0.72rem',
              fontFamily: 'var(--mono)',
              color: 'var(--accent-light)'
            }}>
              <Code size={12} />
              {taskDetails.aiStage}
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{
                background: 'var(--accent-dim)',
                border: '1.5px solid var(--accent)',
                borderRadius: '10px',
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)'
              }}>
                <Compass size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--text3)', letterSpacing: '0.05em' }}>TODAY'S MISSION TARGET</div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '2px' }}>
                  {taskDetails.title}
                </h2>
              </div>
            </div>

            <p style={{ fontSize: '0.98rem', color: 'var(--text)', lineHeight: '1.6', marginBottom: '22px' }}>
              {taskDetails.mission}
            </p>

            {/* Justification details */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '12px',
              background: 'rgba(0,0,0,0.18)',
              padding: '16px 20px',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)'
            }}>
              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Engine Priority Justification</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text2)', marginTop: '4px', lineHeight: '1.4' }}>
                  {justificationObj.why}
                </div>
              </div>
            </div>
          </div>

          {/* Daily Workspace Checklist Blocks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckSquare size={16} style={{ color: 'var(--accent)' }} />
              Active Workspace Tasks
            </h3>

            {/* Practice Tasks Section */}
            {taskDetails.practice && taskDetails.practice.length > 0 && (
              <div className="card" style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>
                    Practice Tasks ({taskDetails.practice.length})
                  </div>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--text3)' }}>LOCAL VERIFICATION</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {taskDetails.practice.map((item, idx) => {
                    const key = `practice-${idx}`;
                    return (
                      <div 
                        key={key} 
                        onClick={() => toggleLocalCheck(key)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '10px 14px',
                          background: localCheckedItems[key] ? 'rgba(16, 185, 129, 0.02)' : 'var(--bg3)',
                          border: '1px solid',
                          borderColor: localCheckedItems[key] ? 'rgba(16, 185, 129, 0.2)' : 'var(--border)',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '4px',
                          border: `1.5px solid ${localCheckedItems[key] ? 'var(--green)' : 'var(--text3)'}`,
                          background: localCheckedItems[key] ? 'var(--green)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--bg)',
                          flexShrink: 0
                        }}>
                          {localCheckedItems[key] && <span style={{ fontSize: '10px', fontWeight: 'bold' }}>✓</span>}
                        </div>
                        <span style={{ 
                          fontSize: '0.85rem', 
                          color: localCheckedItems[key] ? 'var(--text2)' : 'var(--text)',
                          textDecoration: localCheckedItems[key] ? 'line-through' : 'none'
                        }}>
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mini Build Task Section */}
            <div className="card" style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>
                  Mini Build Requirement
                </div>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--accent)' }}>HAND-CODED</span>
              </div>
              <div 
                onClick={() => toggleLocalCheck('minibuild')}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '14px',
                  background: localCheckedItems['minibuild'] ? 'rgba(16, 185, 129, 0.02)' : 'var(--bg3)',
                  border: '1px solid',
                  borderColor: localCheckedItems['minibuild'] ? 'rgba(16, 185, 129, 0.2)' : 'var(--border)',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '4px',
                  border: `1.5px solid ${localCheckedItems['minibuild'] ? 'var(--green)' : 'var(--text3)'}`,
                  background: localCheckedItems['minibuild'] ? 'var(--green)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--bg)',
                  marginTop: '2px',
                  flexShrink: 0
                }}>
                  {localCheckedItems['minibuild'] && <span style={{ fontSize: '10px', fontWeight: 'bold' }}>✓</span>}
                </div>
                <div>
                  <div style={{ 
                    fontSize: '0.88rem', 
                    color: localCheckedItems['minibuild'] ? 'var(--text2)' : 'var(--text)',
                    fontWeight: 600,
                    textDecoration: localCheckedItems['minibuild'] ? 'line-through' : 'none'
                  }}>
                    {taskDetails.miniBuild}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text3)', marginTop: '4px' }}>
                    Develop this in your local repo workspace and verify all logic paths manually.
                  </div>
                </div>
              </div>
            </div>

            {/* Assessment Exit Criteria Section */}
            <div className="card" style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>
                  {taskDetails.type === "assessment" ? "Timed Exit Assessment Gate" : "Assessment Exit Criteria"}
                </div>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--amber)' }}>VERIFICATION GATE</span>
              </div>
              <div 
                onClick={() => toggleLocalCheck('assessment')}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '14px',
                  background: localCheckedItems['assessment'] ? 'rgba(16, 185, 129, 0.02)' : 'var(--bg3)',
                  border: '1px solid',
                  borderColor: localCheckedItems['assessment'] ? 'rgba(16, 185, 129, 0.2)' : 'var(--border)',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '4px',
                  border: `1.5px solid ${localCheckedItems['assessment'] ? 'var(--green)' : 'var(--text3)'}`,
                  background: localCheckedItems['assessment'] ? 'var(--green)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--bg)',
                  marginTop: '2px',
                  flexShrink: 0
                }}>
                  {localCheckedItems['assessment'] && <span style={{ fontSize: '10px', fontWeight: 'bold' }}>✓</span>}
                </div>
                <div>
                  <div style={{ 
                    fontSize: '0.88rem', 
                    color: localCheckedItems['assessment'] ? 'var(--text2)' : 'var(--text)',
                    fontWeight: 600,
                    textDecoration: localCheckedItems['assessment'] ? 'line-through' : 'none'
                  }}>
                    {taskDetails.exitCriteria}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text3)', marginTop: '4px' }}>
                    {taskDetails.type === "assessment" 
                      ? "This is a timed block. Verify compile speed and design requirements."
                      : "Independent verification: Can you replicate this logic structure from memory?"}
                  </div>
                </div>
              </div>
            </div>

            {/* Project Work Section */}
            <div className="card" style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>
                  Active Project Work
                </div>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--blue)' }}>PROJECT INTEGRATION</span>
              </div>
              <div 
                onClick={() => toggleLocalCheck('project')}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '14px',
                  background: localCheckedItems['project'] ? 'rgba(16, 185, 129, 0.02)' : 'var(--bg3)',
                  border: '1px solid',
                  borderColor: localCheckedItems['project'] ? 'rgba(16, 185, 129, 0.2)' : 'var(--border)',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '4px',
                  border: `1.5px solid ${localCheckedItems['project'] ? 'var(--green)' : 'var(--text3)'}`,
                  background: localCheckedItems['project'] ? 'var(--green)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--bg)',
                  marginTop: '2px',
                  flexShrink: 0
                }}>
                  {localCheckedItems['project'] && <span style={{ fontSize: '10px', fontWeight: 'bold' }}>✓</span>}
                </div>
                <div>
                  <div style={{ 
                    fontSize: '0.88rem', 
                    color: localCheckedItems['project'] ? 'var(--text2)' : 'var(--text)',
                    fontWeight: 600,
                    textDecoration: localCheckedItems['project'] ? 'line-through' : 'none'
                  }}>
                    Integrate concepts into project: <strong style={{ color: 'var(--accent-light)' }}>{state.current_project}</strong>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text3)', marginTop: '4px' }}>
                    Apply today's learning ({taskDetails.technology}) to the active development build phase of your project.
                  </div>
                </div>
              </div>
            </div>

            {/* Complete Mission Action Block */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button 
                className="btn" 
                onClick={handleExecuteRecommendedTask}
                disabled={state.recommended_task_id === 'graduation'}
                style={{
                  background: 'var(--accent)',
                  borderColor: 'var(--accent)',
                  color: '#fff',
                  fontWeight: 600,
                  padding: '12px 24px',
                  boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
                }}
              >
                Complete Today's Mission Target
                <ChevronRight size={16} />
              </button>
            </div>

          </div>

        </div>

        {/* Right Column: Study Session Details & Buffer Health */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Recommended Study Session & Estimated Finish Clock */}
          <div className="card" style={{
            background: 'var(--bg2)',
            borderColor: 'var(--border)',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '18px' }}>
              <Clock size={18} style={{ color: 'var(--accent)' }} />
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>Recommended Study Session</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text2)' }}>Estimated Effort:</span>
                <strong style={{ fontSize: '0.85rem', fontFamily: 'var(--mono)', color: 'var(--text)' }}>{taskDetails.duration}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text2)' }}>Start Time Target:</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text)' }}>Immediate Focus block</span>
              </div>

              {/* Dynamic Estimated Finish Time */}
              <div style={{ 
                background: 'var(--accent-glow)',
                border: '1.5px dashed rgba(99, 102, 241, 0.3)',
                borderRadius: 'var(--radius)',
                padding: '14px',
                textAlign: 'center',
                marginTop: '6px'
              }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--accent-light)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>ESTIMATED FINISH TIME</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text)', marginTop: '4px', letterSpacing: '-0.02em' }}>
                  {estimatedFinish}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text3)', marginTop: '2px' }}>
                  Based on immediate start at local system time.
                </div>
              </div>
            </div>
          </div>

          {/* Buffer & Academic Timeline Health Card */}
          <div className="card" style={{
            borderLeft: `4px solid ${statusColor}`,
            padding: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Flame size={18} style={{ color: statusColor }} />
                <div style={{ fontWeight: 700, fontSize: '1rem' }}>Timeline Health</div>
              </div>
              <span style={{ 
                fontSize: '0.7rem', 
                fontWeight: 700, 
                textTransform: 'uppercase', 
                padding: '2px 8px', 
                borderRadius: '4px',
                background: `${statusColor}1A`, 
                color: statusColor,
                border: `1px solid ${statusColor}33`
              }}>
                {state.schedule_status}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Buffer Days Progress Gauge */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text2)', fontWeight: 500 }}>Remaining Buffer:</span>
                  <strong style={{ color: 'var(--text)' }}>{state.remaining_buffer} / 11 Days</strong>
                </div>
                <div style={{ height: '6px', background: 'var(--bg4)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      height: '100%', 
                      width: `${(state.remaining_buffer / 11) * 100}%`, 
                      background: state.remaining_buffer > 5 ? 'var(--green)' : state.remaining_buffer > 2 ? 'var(--amber)' : 'var(--red)',
                      borderRadius: '999px'
                    }} 
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text2)' }}>Slippage Incurred:</span>
                <span style={{ color: state.slippage_days > 0 ? 'var(--red)' : 'var(--green)', fontWeight: 600 }}>
                  {state.slippage_days} Days
                </span>
              </div>

              {/* Revision Freeze Warning / Status */}
              <div style={{ 
                background: state.is_maintenance ? 'var(--amber-dim)' : 'var(--bg3)',
                border: '1px solid',
                borderColor: state.is_maintenance ? 'rgba(245, 158, 11, 0.2)' : 'var(--border)',
                borderRadius: 'var(--radius)',
                padding: '12px 14px',
                fontSize: '0.8rem',
                color: 'var(--text2)'
              }}>
                {state.is_maintenance ? (
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <ShieldAlert size={15} style={{ color: 'var(--amber)', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong>College Exam Mode Active:</strong> Core sprint track suspended. Study recommendations locked on local maintenance drills.
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <ShieldCheck size={15} style={{ color: 'var(--green)', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong>Academic Track Normal:</strong> Syncing daily milestones with graduation targets. Maintain daily commits.
                    </div>
                  </div>
                )}
              </div>

              {/* Shift Mode Exam Freeze Button */}
              <button 
                className="btn" 
                onClick={handleToggleFreeze}
                style={{
                  borderColor: state.is_maintenance ? 'var(--amber)' : 'var(--border)',
                  color: state.is_maintenance ? 'var(--amber)' : 'var(--text2)',
                  background: state.is_maintenance ? 'var(--amber-dim)' : 'transparent',
                  padding: '8px 14px',
                  width: '100%',
                  fontSize: '0.78rem',
                  fontWeight: 600
                }}
              >
                {state.is_maintenance ? 'Deactivate Exam Freeze Mode' : 'Simulate College Exam Freeze'}
              </button>
            </div>
          </div>

          {/* Active Engineering Capability Scores */}
          <div className="card">
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px' }}>
              <Award size={18} style={{ color: 'var(--accent)' }} />
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>Active Capability Vectors</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {Object.entries(state.capability_scores).map(([key, value]) => (
                <div key={key} className="progress-container">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, textTransform: 'capitalize', color: 'var(--text2)' }}>
                      {key.replace('_', ' ')}
                    </span>
                    <span style={{ fontWeight: 700, color: 'var(--accent-light)' }}>{value}%</span>
                  </div>
                  <div style={{ height: '5px', background: 'var(--bg4)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        width: `${value}%`, 
                        height: '100%',
                        background: 'var(--accent)',
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Confidence levels grid */}
          <div className="card">
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '14px' }}>
              <BookOpen size={18} style={{ color: 'var(--accent)' }} />
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>Confidence Profiles</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {Object.entries(state.confidence_levels).map(([tech, lvl]) => (
                <div key={tech} style={{
                  background: 'var(--bg3)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text3)' }}>
                    {tech.replace('_', ' ')}
                  </span>
                  <span style={{ fontSize: '0.88rem', fontFamily: 'var(--mono)', color: lvl > 0 ? 'var(--green)' : 'var(--text3)', fontWeight: 700 }}>
                    {lvl}%
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
