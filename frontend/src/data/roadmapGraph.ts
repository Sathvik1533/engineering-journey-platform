export interface GraphNode {
  id: string;
  label: string;
  type: 'phase' | 'week';
  x: number;
  y: number;
  width: number;
  height: number;
  prerequisites: string[];
}

export interface GraphEdge {
  from: string;
  to: string;
}

export const roadmapNodes: GraphNode[] = [
  // Phase 0: Python Core & Fundamentals
  { id: 'phase-0', label: 'Phase 0: Python Core', type: 'phase', x: 400, y: 60, width: 220, height: 50, prerequisites: [] },
  { id: 'week-1', label: 'Week 1: Syntax & Loops', type: 'week', x: 300, y: 160, width: 160, height: 40, prerequisites: ['phase-0'] },
  { id: 'week-2', label: 'Week 2: DS & OOP', type: 'week', x: 500, y: 160, width: 160, height: 40, prerequisites: ['week-1'] },

  // Phase 1: SQL Strengthening (Left Branch)
  { id: 'phase-1', label: 'Phase 1: SQL Strengthening', type: 'phase', x: 220, y: 270, width: 220, height: 50, prerequisites: ['week-2'] },
  { id: 'week-3', label: 'Week 3: Queries & Joins', type: 'week', x: 130, y: 370, width: 160, height: 40, prerequisites: ['phase-1'] },
  { id: 'week-4', label: 'Week 4: Windows & Trans', type: 'week', x: 310, y: 370, width: 160, height: 40, prerequisites: ['week-3'] },

  // Phase 2: Frontend Layouts (Right Branch)
  { id: 'phase-2', label: 'Phase 2: Frontend Basics', type: 'phase', x: 580, y: 270, width: 220, height: 50, prerequisites: ['week-2'] },
  { id: 'week-5', label: 'Week 5: Grid & Layouts', type: 'week', x: 490, y: 370, width: 160, height: 40, prerequisites: ['phase-2'] },
  { id: 'week-6', label: 'Week 6: DOM & Async JS', type: 'week', x: 670, y: 370, width: 160, height: 40, prerequisites: ['week-5'] },

  // Phase 3: React Core (Continues Frontend Branch)
  { id: 'phase-3', label: 'Phase 3: React Basics', type: 'phase', x: 580, y: 480, width: 220, height: 50, prerequisites: ['week-6'] },
  { id: 'week-7', label: 'Week 7: React Elements', type: 'week', x: 490, y: 580, width: 160, height: 40, prerequisites: ['phase-3'] },
  { id: 'week-8', label: 'Week 8: Hooks & TS', type: 'week', x: 670, y: 580, width: 160, height: 40, prerequisites: ['week-7'] },

  // Phase 4: React Complex (Continues React Branch)
  { id: 'phase-4', label: 'Phase 4: React Complex', type: 'phase', x: 580, y: 690, width: 220, height: 50, prerequisites: ['week-8'] },
  { id: 'week-9', label: 'Week 9: Router & Context', type: 'week', x: 490, y: 790, width: 160, height: 40, prerequisites: ['phase-4'] },
  { id: 'week-10', label: 'Week 10: Capstone UI', type: 'week', x: 670, y: 790, width: 160, height: 40, prerequisites: ['week-9'] },

  // Phase 5: FastAPI Backend (Continues SQL Branch)
  { id: 'phase-5', label: 'Phase 5: FastAPI APIs', type: 'phase', x: 220, y: 480, width: 220, height: 50, prerequisites: ['week-4'] },
  { id: 'week-11', label: 'Week 11: Routers & Deps', type: 'week', x: 130, y: 580, width: 160, height: 40, prerequisites: ['phase-5'] },
  { id: 'week-12', label: 'Week 12: SQLAlchemy ORM', type: 'week', x: 310, y: 580, width: 160, height: 40, prerequisites: ['week-11'] },

  // Phase 6: Full-Stack & AI Integration (Merged Branch)
  { id: 'phase-6', label: 'Phase 6: Full-Stack & AI', type: 'phase', x: 400, y: 900, width: 220, height: 50, prerequisites: ['week-10', 'week-12'] },
  { id: 'week-13', label: 'Week 13: FS Integration', type: 'week', x: 220, y: 1000, width: 160, height: 40, prerequisites: ['phase-6'] },
  { id: 'week-14', label: 'Week 14: LLM APIs & RAG', type: 'week', x: 400, y: 1000, width: 160, height: 40, prerequisites: ['phase-6'] },
  { id: 'week-15', label: 'Week 15: Agentic LangGraph', type: 'week', x: 580, y: 1000, width: 160, height: 40, prerequisites: ['phase-6'] },

  // Phase 7: Placement Preparation & System Design
  { id: 'phase-7', label: 'Phase 7: Placement Season', type: 'phase', x: 400, y: 1110, width: 220, height: 50, prerequisites: ['week-13', 'week-14', 'week-15'] },
  { id: 'week-16', label: 'Week 16: System Design', type: 'week', x: 220, y: 1210, width: 160, height: 40, prerequisites: ['phase-7'] },
  { id: 'week-17', label: 'Week 17: LeetCode Sprint', type: 'week', x: 400, y: 1210, width: 160, height: 40, prerequisites: ['phase-7'] },
  { id: 'week-18', label: 'Week 18: Mock & Funnel', type: 'week', x: 580, y: 1210, width: 160, height: 40, prerequisites: ['phase-7'] },

  // Phase 8: Professional Growth & Compounding
  { id: 'phase-8', label: 'Phase 8: Career Engine', type: 'phase', x: 400, y: 1320, width: 220, height: 50, prerequisites: ['week-16', 'week-17', 'week-18'] },
  { id: 'week-19', label: 'Week 19: Onboarding OS', type: 'week', x: 300, y: 1420, width: 160, height: 40, prerequisites: ['phase-8'] },
  { id: 'week-20', label: 'Week 20: Collaboration', type: 'week', x: 500, y: 1420, width: 160, height: 40, prerequisites: ['week-19'] }
];

export const roadmapEdges: GraphEdge[] = [
  // Phase 0
  { from: 'phase-0', to: 'week-1' },
  { from: 'week-1', to: 'week-2' },
  { from: 'week-2', to: 'phase-1' },
  { from: 'week-2', to: 'phase-2' },

  // Phase 1 (SQL Branch)
  { from: 'phase-1', to: 'week-3' },
  { from: 'week-3', to: 'week-4' },
  { from: 'week-4', to: 'phase-5' },

  // Phase 2 (Frontend Branch)
  { from: 'phase-2', to: 'week-5' },
  { from: 'week-5', to: 'week-6' },
  { from: 'week-6', to: 'phase-3' },

  // Phase 3
  { from: 'phase-3', to: 'week-7' },
  { from: 'week-7', to: 'week-8' },
  { from: 'week-8', to: 'phase-4' },

  // Phase 4
  { from: 'phase-4', to: 'week-9' },
  { from: 'week-9', to: 'week-10' },
  { from: 'week-10', to: 'phase-6' },

  // Phase 5
  { from: 'phase-5', to: 'week-11' },
  { from: 'week-11', to: 'week-12' },
  { from: 'week-12', to: 'phase-6' },

  // Phase 6
  { from: 'phase-6', to: 'week-13' },
  { from: 'phase-6', to: 'week-14' },
  { from: 'phase-6', to: 'week-15' },
  { from: 'week-13', to: 'phase-7' },
  { from: 'week-14', to: 'phase-7' },
  { from: 'week-15', to: 'phase-7' },

  // Phase 7
  { from: 'phase-7', to: 'week-16' },
  { from: 'phase-7', to: 'week-17' },
  { from: 'phase-7', to: 'week-18' },
  { from: 'week-16', to: 'phase-8' },
  { from: 'week-17', to: 'phase-8' },
  { from: 'week-18', to: 'phase-8' },

  // Phase 8
  { from: 'phase-8', to: 'week-19' },
  { from: 'week-19', to: 'week-20' }
];
