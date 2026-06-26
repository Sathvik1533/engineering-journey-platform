import React, { useState, useEffect } from 'react';
import { Play, Square, Award, AlertCircle } from 'lucide-react';

interface TimerCardProps {
  durationMinutes: number;
  assessmentId: string;
  assessmentTitle: string;
  onPass: () => Promise<void>;
  isPassed: boolean;
}

export const TimerCard: React.FC<TimerCardProps> = ({
  durationMinutes,
  assessmentTitle,
  onPass,
  isPassed
}) => {
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((s) => s - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
      setIsFailed(true);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  // Reset timer
  const handleStart = () => {
    setSecondsLeft(durationMinutes * 60);
    setIsActive(true);
    setIsFailed(false);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handlePassClick = async () => {
    setIsActive(false);
    await onPass();
  };

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isPassed) {
    return (
      <div style={{
        background: 'rgba(16, 185, 129, 0.05)',
        border: '1.5px solid var(--green)',
        borderRadius: 'var(--radius)',
        padding: '16px',
        marginTop: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <Award size={24} style={{ color: 'var(--green)' }} />
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>Exit Gate Mastered</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text2)' }}>You successfully unlocked the next milestones.</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'var(--bg3)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '16px',
      marginTop: '12px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{assessmentTitle}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>Time limit: {durationMinutes} minutes</div>
        </div>
        <div style={{
          fontFamily: 'var(--mono)',
          fontSize: '1.25rem',
          fontWeight: 700,
          color: isFailed ? 'var(--red)' : isActive ? 'var(--text)' : 'var(--text2)'
        }}>
          {formatTime(secondsLeft)}
        </div>
      </div>

      {isFailed && (
        <div style={{
          display: 'flex',
          gap: '8px',
          background: 'rgba(239, 68, 68, 0.05)',
          border: '1px solid var(--red)',
          borderRadius: 'var(--radius)',
          padding: '10px',
          marginBottom: '12px',
          alignItems: 'center',
          fontSize: '0.78rem',
          color: 'var(--red)'
        }}>
          <AlertCircle size={16} />
          <span>Timer expired. Practice again and rebuild speed before declaring success.</span>
        </div>
      )}

      <div style={{ display: 'flex', gap: '8px' }}>
        {!isActive ? (
          <button className="btn btn-sm btn-primary" onClick={handleStart} style={{ padding: '6px 12px' }}>
            <Play size={12} style={{ marginRight: '4px' }} />
            Start Timer
          </button>
        ) : (
          <button className="btn btn-sm" onClick={handleStop} style={{ padding: '6px 12px', borderColor: 'var(--border)' }}>
            <Square size={12} style={{ marginRight: '4px' }} />
            Pause
          </button>
        )}

        {isActive && (
          <button 
            className="btn btn-sm btn-success" 
            onClick={handlePassClick} 
            style={{ 
              marginLeft: 'auto', 
              padding: '6px 12px',
              background: 'var(--green)',
              color: '#fff',
              border: 'none'
            }}
          >
            Declare Success (Exit Met)
          </button>
        )}
      </div>
    </div>
  );
};
