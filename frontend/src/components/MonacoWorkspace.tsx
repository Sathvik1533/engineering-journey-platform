import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, HelpCircle } from 'lucide-react';

interface MonacoWorkspaceProps {
  topicId: string;
  language: string;
  codeTemplate: string;
  onSubmitComplete: () => void;
}

export const MonacoWorkspace: React.FC<MonacoWorkspaceProps> = ({
  topicId,
  language,
  codeTemplate,
  onSubmitComplete
}) => {
  const [code, setCode] = useState<string>(codeTemplate || '');
  const [stdout, setStdout] = useState<string>('');
  const [stderr, setStderr] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [isDebugging, setIsDebugging] = useState<boolean>(false);
  
  // AI Debug states
  const [aiFeedback, setAiFeedback] = useState<{
    hint: string;
    explanation: string;
    suggestedFix: string;
  } | null>(null);

  // Sync template when it changes on node swap
  useEffect(() => {
    setCode(codeTemplate || '');
    setStdout('');
    setStderr('');
    setAiFeedback(null);
  }, [codeTemplate, topicId]);

  const handleRunCode = async () => {
    setIsExecuting(true);
    setStdout('');
    setStderr('');
    setAiFeedback(null);
    
    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: language === 'sql' ? 'sql' : 'python',
          code: code
        })
      });
      if (res.ok) {
        const data = await res.json();
        setStdout(data.stdout || '');
        setStderr(data.stderr || '');
      } else {
        setStderr('Failed to communicate with the Code Execution backend.');
      }
    } catch (err: any) {
      setStderr(`Execution error: ${err.message}`);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleAiDebug = async () => {
    setIsDebugging(true);
    try {
      const res = await fetch('/api/ai/debug', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code,
          language: language,
          stdout: stdout,
          stderr: stderr || 'No runtime errors, checking logic.',
          topicId: topicId
        })
      });
      if (res.ok) {
        const data = await res.json();
        setAiFeedback({
          hint: data.hint,
          explanation: data.explanation,
          suggestedFix: data.suggested_fix
        });
      } else {
        alert('AI helper was unable to evaluate this code.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDebugging(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset code template to starter baseline? Your edits will be lost.')) {
      setCode(codeTemplate || '');
      setStdout('');
      setStderr('');
      setAiFeedback(null);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', height: '100%', minHeight: '480px' }}>
      
      {/* Column 1: Monaco Code Editor Canvas */}
      <div style={{ display: 'flex', flexDirection: 'column', border: '2px solid #0f172a', borderRadius: '8px', overflow: 'hidden', background: '#ffffff' }}>
        <div style={{ background: '#f8fafc', borderBottom: '2px solid #0f172a', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.62rem', fontFamily: 'var(--mono)', textTransform: 'uppercase', background: '#0f172a', color: '#ffffff', padding: '3px 8px', borderRadius: '4px', fontWeight: 800 }}>
              {language.toUpperCase()} PLAYGROUND
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={handleReset} 
              className="btn btn-sm"
              title="Reset Starter Template"
              style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 10px', background: '#ffffff', color: '#64748b', border: '2px solid #cbd5e1' }}
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
            <button 
              onClick={handleRunCode} 
              disabled={isExecuting}
              className="btn btn-primary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', background: '#eab308', color: '#0f172a', border: '2px solid #0f172a', fontWeight: 800 }}
            >
              <Play size={12} fill="#0f172a" />
              <span>{isExecuting ? 'Running...' : 'Run Code'}</span>
            </button>
          </div>
        </div>

        <div style={{ flex: 1, minHeight: '380px' }}>
          <Editor
            height="100%"
            language={language === 'sql' ? 'sql' : 'python'}
            value={code}
            onChange={(val) => setCode(val || '')}
            options={{
              fontSize: 13,
              fontFamily: 'var(--mono)',
              minimap: { enabled: false },
              automaticLayout: true,
              scrollBeyondLastLine: false,
              lineNumbers: 'on',
              tabSize: 4
            }}
          />
        </div>
      </div>

      {/* Column 2: Code Output Terminal & AI Mentor Assistant */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
        
        {/* Terminal output container */}
        <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', border: '2px solid #0f172a', borderRadius: '8px', overflow: 'hidden', background: '#0f172a', color: '#f8fafc', fontFamily: 'var(--mono)' }}>
          <div style={{ background: '#1e293b', borderBottom: '2px solid #0f172a', padding: '6px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#94a3b8' }}>CONSOLES OUTPUT</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={handleAiDebug}
                disabled={isDebugging}
                className="btn btn-sm"
                style={{ padding: '2px 8px', background: '#3b82f6', color: '#ffffff', border: 'none', borderRadius: '4px', fontSize: '0.62rem', fontWeight: 700 }}
              >
                {isDebugging ? 'Analyzing...' : '💡 Ask AI Debugger'}
              </button>
            </div>
          </div>
          <div style={{ flex: 1, padding: '12px', overflowY: 'auto', fontSize: '0.78rem', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
            {stdout && (
              <div style={{ color: '#4ade80' }}>
                <strong>STDOUT:</strong><br />
                {stdout}
              </div>
            )}
            {stderr && (
              <div style={{ color: '#f87171', marginTop: stdout ? '8px' : '0' }}>
                <strong>STDERR:</strong><br />
                {stderr}
              </div>
            )}
            {!stdout && !stderr && (
              <span style={{ color: '#64748b' }}>Console output will appear here after clicking "Run Code"...</span>
            )}
          </div>
        </div>

        {/* AI feedback panel */}
        {aiFeedback && (
          <div style={{ border: '2px solid #3b82f6', background: '#eff6ff', borderRadius: '8px', padding: '14px', color: '#1e3a8a', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderBottom: '1px solid #bfdbfe', paddingBottom: '6px', fontWeight: 800 }}>
              <HelpCircle size={14} style={{ color: '#3b82f6' }} />
              <span>AI DEBUG DIAGNOSIS</span>
            </div>
            <div>
              <strong>Logical Explanation:</strong>
              <p style={{ margin: '3px 0 0', color: '#1e40af' }}>{aiFeedback.explanation}</p>
            </div>
            <div style={{ marginTop: '4px' }}>
              <strong>Hint:</strong>
              <p style={{ margin: '3px 0 0', color: '#1e40af', fontWeight: 600 }}>{aiFeedback.hint}</p>
            </div>
            <div style={{ marginTop: '4px' }}>
              <strong>Suggested Correction Guidelines:</strong>
              <p style={{ margin: '3px 0 0', color: '#1e40af', fontStyle: 'italic' }}>{aiFeedback.suggestedFix}</p>
            </div>
          </div>
        )}

        {/* Actions panel */}
        <div style={{ background: '#ffffff', border: '2px solid #0f172a', borderRadius: '8px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h5 style={{ margin: 0, fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>Done with the implementation?</h5>
            <p style={{ margin: '2px 0 0', fontSize: '0.68rem', color: '#64748b' }}>Submit code to mark this daily topic complete.</p>
          </div>
          <button
            onClick={onSubmitComplete}
            className="btn"
            style={{
              background: '#22c55e',
              color: '#ffffff',
              border: '2px solid #0f172a',
              boxShadow: '2px 2px 0px #0f172a',
              fontWeight: 800,
              fontSize: '0.78rem',
              padding: '8px 16px',
              borderRadius: '6px'
            }}
          >
            Submit & Complete Topic
          </button>
        </div>

      </div>

    </div>
  );
};
