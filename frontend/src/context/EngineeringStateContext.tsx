import React, { createContext, useContext, useState, useEffect } from 'react';

export interface EngineeringState {
  id: number;
  current_date: string;
  current_semester: string;
  current_week: number;
  current_phase: number;
  current_technology: string;
  current_topic: string;
  current_project: string;
  completed_topics: string[];
  pending_assessments: string[];
  active_milestones: string[];
  confidence_levels: Record<string, number>;
  capability_scores: Record<string, number>;
  next_unlock: string;
  recommended_task_id: string;
  recommendation_justification: string;
  remaining_buffer: number;
  slippage_days: number;
  schedule_status: string;
  daily_streak: number;
  weekly_progress: number;
  is_maintenance: boolean;
}

export interface DayMission {
  dayNum: number;
  title: string;
  mission: string;
  practice: string[];
  miniBuild: string;
  exitCriteria: string;
}

export interface TimedAssessment {
  title: string;
  durationMinutes: number;
  prompt: string;
}

export interface SyllabusNode {
  id: string;
  title: string;
  phaseNum: number;
  objective: string;
  technology: string;
  aiStage: string;
  milestones: string[];
  capabilitiesUnlocked: string[];
  exitCriteria: string[];
  dayMissions: DayMission[];
  timedAssessment?: TimedAssessment;
}

export type SyllabusData = Record<string, SyllabusNode>;

interface EngineeringStateContextProps {
  state: EngineeringState | null;
  syllabus: SyllabusData | null;
  loading: boolean;
  error: string | null;
  isBackendConnected: boolean;
  triggerEvent: (eventType: string, payload: Record<string, any>) => Promise<void>;
  toggleTask: (taskId: string, isChecked: boolean) => Promise<void>;
  passAssessment: (assessmentId: string) => Promise<void>;
  setDate: (dateStr: string) => Promise<void>;
  toggleFreeze: (isFreeze: boolean) => Promise<void>;
  refetchState: () => Promise<void>;
}

const EngineeringStateContext = createContext<EngineeringStateContextProps | undefined>(undefined);

export const EngineeringStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<EngineeringState | null>(null);
  const [syllabus, setSyllabus] = useState<SyllabusData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);

  const fetchState = async () => {
    try {
      const response = await fetch('/api/state/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setState(data);
      setIsBackendConnected(true);
    } catch (err: any) {
      console.error('Failed to fetch Engineering State:', err);
      setError(err.message || 'Failed to fetch Engineering State');
      setIsBackendConnected(false);
    }
  };

  const fetchSyllabus = async () => {
    try {
      const response = await fetch('/api/syllabus/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSyllabus(data);
    } catch (err: any) {
      console.error('Failed to fetch Syllabus:', err);
      setError(err.message || 'Failed to fetch Syllabus Data');
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await Promise.all([fetchState(), fetchSyllabus()]);
      setLoading(false);
    };
    initializeData();
  }, []);

  const triggerEvent = async (eventType: string, payload: Record<string, any>) => {
    try {
      const response = await fetch('/api/state/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventType, payload }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedState = await response.json();
      setState(updatedState);
      setIsBackendConnected(true);
    } catch (err: any) {
      console.error(`Failed to trigger event ${eventType}:`, err);
      setIsBackendConnected(false);
      throw err;
    }
  };

  const toggleTask = async (taskId: string, isChecked: boolean) => {
    await triggerEvent('TOGGLE_TASK', { taskId, isChecked });
  };

  const passAssessment = async (assessmentId: string) => {
    await triggerEvent('PASS_ASSESSMENT', { assessmentId });
  };

  const setDate = async (dateStr: string) => {
    await triggerEvent('SET_DATE', { date: dateStr });
  };

  const toggleFreeze = async (isFreeze: boolean) => {
    await triggerEvent('TRIGGER_FREEZE', { isFreeze });
  };

  return (
    <EngineeringStateContext.Provider
      value={{
        state,
        syllabus,
        loading,
        error,
        isBackendConnected,
        triggerEvent,
        toggleTask,
        passAssessment,
        setDate,
        toggleFreeze,
        refetchState: fetchState,
      }}
    >
      {children}
    </EngineeringStateContext.Provider>
  );
};

export const useEngineeringState = () => {
  const context = useContext(EngineeringStateContext);
  if (context === undefined) {
    throw new Error('useEngineeringState must be used within an EngineeringStateProvider');
  }
  return context;
};
