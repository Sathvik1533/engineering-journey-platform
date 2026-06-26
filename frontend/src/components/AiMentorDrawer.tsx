import React, { useState, useRef, useEffect } from 'react';
import { useEngineeringState } from '../context/EngineeringStateContext';
import { X, Send, Bot, Check, AlertCircle } from 'lucide-react';

interface AiMentorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  actions?: any[];
}

export const AiMentorDrawer: React.FC<AiMentorDrawerProps> = ({ isOpen, onClose }) => {
  const { toggleTask, passAssessment, setDate, toggleFreeze, refetchState } = useEngineeringState();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi Sathwik! I am your AI Mentor. I review your codebase progress, check off curriculum daily tasks, and help manage exam freezes. What should we work on today?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!inputValue.trim() || isSending) return;

    const userText = inputValue;
    setInputValue('');
    setIsSending(true);

    const updatedMessages = [...messages, { role: 'user', content: userText } as Message];
    setMessages(updatedMessages);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        throw new Error('API server returned error status');
      }

      const data = await response.json();
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: data.response,
          actions: data.actions
        }
      ]);
    } catch (error) {
      console.error('Failed to chat with AI:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "⚠️ I had trouble connecting to the AI brain. Check your GROQ API key config or FastAPI server logs."
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleApplyAction = async (action: any, index: number) => {
    try {
      if (action.type === 'toggle_checklist') {
        await toggleTask(action.taskId, action.checked);
      } else if (action.type === 'pass_assessment') {
        await passAssessment(action.assessmentId);
      } else if (action.type === 'set_date') {
        await setDate(action.date);
      } else if (action.type === 'trigger_freeze') {
        await toggleFreeze(action.isFreeze);
      }
      
      // Update action status locally so the button disables/shows applied
      setMessages(prev => {
        const copy = [...prev];
        const msg = { ...copy[index] };
        if (msg.actions) {
          msg.actions = msg.actions.map(act => 
            act === action ? { ...act, applied: true } : act
          );
        }
        copy[index] = msg;
        return copy;
      });

      await refetchState();
    } catch (err) {
      console.error('Failed to execute proposed AI action:', err);
      alert('Failed to execute AI proposed action. Check API validators.');
    }
  };

  const getActionDescription = (action: any) => {
    switch (action.type) {
      case 'toggle_checklist':
        return `${action.checked ? 'Check' : 'Uncheck'} topic '${action.taskId}'`;
      case 'pass_assessment':
        return `Pass exit assessment '${action.assessmentId}'`;
      case 'set_date':
        return `Shift current calendar date to ${action.date}`;
      case 'trigger_freeze':
        return `${action.isFreeze ? 'Enable' : 'Disable'} Exam Freeze Mode`;
      default:
        return action.message || 'Custom state change proposal';
    }
  };

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
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(2px)',
          zIndex: 110
        }}
        onClick={onClose}
      />

      {/* Chat Drawer Side Panel */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '400px',
        maxWidth: '100%',
        height: '100vh',
        background: 'var(--bg2)',
        borderLeft: '1px solid var(--border)',
        zIndex: 120,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
        animation: 'slideInAi 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}>
        {/* Style tag for animations */}
        <style>{`
          @keyframes slideInAi {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>

        {/* Drawer Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bot size={20} style={{ color: 'var(--accent)' }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>AI Mentor Companion</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--green)' }}>Live OS Assistant</div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--text2)', 
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '50%',
              display: 'flex'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg4)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Message Thread */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            return (
              <div key={index} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isUser ? 'flex-end' : 'flex-start',
                width: '100%'
              }}>
                <div style={{
                  maxWidth: '85%',
                  background: isUser ? 'var(--accent-dim)' : 'var(--bg3)',
                  border: isUser ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid var(--border)',
                  color: 'var(--text)',
                  padding: '10px 14px',
                  borderRadius: isUser ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  fontSize: '0.85rem',
                  lineHeight: '1.4',
                  whiteSpace: 'pre-line'
                }}>
                  {msg.content}
                </div>

                {/* Proposed Actions Container */}
                {msg.actions && msg.actions.length > 0 && (
                  <div style={{
                    width: '85%',
                    marginTop: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}>
                    {msg.actions.map((act, aIdx) => (
                      <div key={aIdx} style={{
                        background: act.applied ? 'rgba(16, 185, 129, 0.03)' : 'var(--bg3)',
                        border: act.applied ? '1px solid var(--green)' : '1px solid var(--border)',
                        borderRadius: 'var(--radius)',
                        padding: '10px 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text3)' }}>
                          <AlertCircle size={12} style={{ color: act.applied ? 'var(--green)' : 'var(--accent)' }} />
                          <span>PROPOSED STATE MUTATION</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text)' }}>
                          {getActionDescription(act)}
                        </div>

                        {!act.applied ? (
                          <button
                            onClick={() => handleApplyAction(act, index)}
                            className="btn btn-sm btn-primary"
                            style={{ 
                              padding: '4px 10px', 
                              fontSize: '0.75rem', 
                              alignSelf: 'flex-start',
                              background: 'var(--accent)',
                              border: 'none'
                            }}
                          >
                            Approve & Execute
                          </button>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--green)', fontWeight: 600 }}>
                            <Check size={12} />
                            <span>Action Applied</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Footer */}
        <div style={{
          padding: '14px 20px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}>
          <input
            type="text"
            className="input"
            placeholder="Type 'complete day 1' or 'freeze'..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isSending}
            style={{ flex: 1, padding: '8px 12px', fontSize: '0.82rem' }}
          />
          <button
            onClick={handleSend}
            disabled={isSending || !inputValue.trim()}
            className="btn btn-primary"
            style={{ 
              padding: '8px', 
              borderRadius: 'var(--radius)', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--accent)',
              border: 'none',
              cursor: isSending || !inputValue.trim() ? 'not-allowed' : 'pointer'
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  );
};
