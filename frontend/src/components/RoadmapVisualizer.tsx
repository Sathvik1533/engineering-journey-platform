import React, { useState, useRef, useEffect } from 'react';
import { roadmapNodes, roadmapEdges } from '../data/roadmapGraph';
import type { GraphNode } from '../data/roadmapGraph';
import { useEngineeringState } from '../context/EngineeringStateContext';
import { CheckCircle2, Lock, PlayCircle, Star, ZoomIn, ZoomOut, Maximize, Search, Compass } from 'lucide-react';

interface RoadmapVisualizerProps {
  onSelectNode: (nodeId: string) => void;
}

// Full specifications for every node's metadata (prerequisites, unlocks, effort, capability, relevance, projects)
const nodeMetadata: Record<string, {
  effort: string;
  relevance: string;
  capability: string;
  projects: string;
  connections: string;
}> = {
  'phase-0': {
    effort: "15-20 Hours",
    relevance: "Establishes a rock-solid coding baseline in Python. Hand-write all logic without AI tools.",
    capability: "OOP Design & Algorithmic scoping",
    projects: "CLI RPG battle simulator, Student Gradebook",
    connections: "Unlocks FastAPI backend routing and data schemas"
  },
  'week-1': {
    effort: "6 Hours",
    relevance: "Pure syntax familiarity, conditionals, looping constructs, scoping mechanics.",
    capability: "Basic logical structures composition",
    projects: "Library Catalog search, recursive fact solver",
    connections: "Unlocks Week 2 complex data structures"
  },
  'week-2': {
    effort: "10 Hours",
    relevance: "Encapsulation, inheritance, asynchronous concurrency, event loops.",
    capability: "Async cooperative multitasking",
    projects: "OOPRPG Monster battler, Async API crawler",
    connections: "Prerequisite for Phase 1 SQL databases"
  },
  'phase-1': {
    effort: "20-25 Hours",
    relevance: "Transitions from local program memory to relational persistent storage.",
    capability: "Relational database schema normalization (3NF)",
    projects: "Normalized E-Commerce database schema",
    connections: "Required for FastAPI ORM mappings and SQL integrations"
  },
  'week-3': {
    effort: "8 Hours",
    relevance: "Primary & foreign keys, constraint checking, inner/outer joins query plans.",
    capability: "Multi-table analytical queries writing",
    projects: "University enrollment database script",
    connections: "Unlocks Week 4 Advanced analytical windowing"
  },
  'week-4': {
    effort: "12 Hours",
    relevance: "ACID transaction guarantees, index query plan optimizations (EXPLAIN ANALYZE).",
    capability: "Optimized analytical joins indexing",
    projects: "Student score auditor metrics schema",
    connections: "Unlocks Phase 5 FastAPI REST services"
  },
  'phase-2': {
    effort: "15 Hours",
    relevance: "Build semantic browser layout systems and manage DOM script triggers.",
    capability: "Browser interfaces, responsive web grids layouts",
    projects: "Responsive Developer Portfolio Landing Page",
    connections: "Prerequisite for Phase 3 React components"
  },
  'week-5': {
    effort: "6 Hours",
    relevance: "Semantic HTML5 containers, CSS Custom variables, Grid and Flexbox alignments.",
    capability: "Responsive styling layouts layout grids",
    projects: "Multi-column article catalog",
    connections: "Unlocks Week 6 JS Dom node interactions"
  },
  'week-6': {
    effort: "9 Hours",
    relevance: "Asynchronous fetch network calls, Promise.all concurrency, and event delegation loops.",
    capability: "Async client-side scripting and data injection",
    projects: "Git public issues search page dashboard",
    connections: "Prerequisite for Phase 3 React library states"
  },
  'phase-3': {
    effort: "25 Hours",
    relevance: "Composing reactive component hierarchies. TypeScript type interfaces.",
    capability: "Type-safe reactive client architecture",
    projects: "Task stage columns planner UI",
    connections: "Unlocks React router Context routing"
  },
  'week-7': {
    effort: "12 Hours",
    relevance: "Lifting component states, unidirectional data binding, array states modifier.",
    capability: "Parent-child state synchronization components",
    projects: "Interactive interactive tasks boards",
    connections: "Unlocks Week 8 TypeScript integration"
  },
  'week-8': {
    effort: "13 Hours",
    relevance: "UseEffect hooks lifecycle sync, dependency cleanups, custom storage hooks.",
    capability: "Safe API integrations and side-effect management",
    projects: "Stock index tracker widget dashboard",
    connections: "Prerequisite for Phase 4 React Router & Context"
  },
  'phase-4': {
    effort: "20 Hours",
    relevance: "Single page routing layouts, global Context state providers, chart viz.",
    capability: "SPA dashboard routing & state container",
    projects: "Expense Tracker Pro capstone dashboard",
    connections: "Unlocks Phase 6 Full-Stack AI agent integration"
  },
  'week-9': {
    effort: "10 Hours",
    relevance: "Nested layout routing config, private authentication guards, theme Context API.",
    capability: "Global global state Context providers",
    projects: "Dashboard layout nested view panels",
    connections: "Unlocks Week 10 capstone UI"
  },
  'week-10': {
    effort: "10 Hours",
    relevance: "Consolidate React, TS, global context into a production-ready client interface.",
    capability: "Financial transaction math calculations",
    projects: "Expense Tracker Pro completed capstone",
    connections: "Unlocks Phase 6 Full-Stack integrations"
  },
  'phase-5': {
    effort: "25 Hours",
    relevance: "Asynchronous backend API routes, Pydantic inputs validation, Alembic versions.",
    capability: "Async RESTful backend server APIs",
    projects: "CRUD order tracking API endpoints",
    connections: "Unlocks Phase 6 SQL client integrations"
  },
  'week-11': {
    effort: "12 Hours",
    relevance: "FastAPI lifespans, ASGI asynchronous loops, Pydantic validation schemas.",
    capability: "Type-safe validation Pydantic schemas",
    projects: "Task tracker ASGI server app",
    connections: "Unlocks Week 12 SQLAlchemy database model mapping"
  },
  'week-12': {
    effort: "13 Hours",
    relevance: "SQLAlchemy async sessions, N+1 query problems resolution via joinedload.",
    capability: "Asynchronous ORM transaction routing",
    projects: "Order tracker database mappings",
    connections: "Unlocks Phase 6 Full-stack AI agents"
  },
  'phase-6': {
    effort: "35 Hours",
    relevance: "Connect React to FastAPI, embed pgvector databases, LangGraph agent pipelines.",
    capability: "AI-enabled full-stack engineering",
    projects: "AI Study Assistant, LangGraph Task agent",
    connections: "Prerequisite for Phase 7 System Design season"
  },
  'week-13': {
    effort: "10 Hours",
    relevance: "CORS middleware policies, JWT token cookies, React async status sync hooks.",
    capability: "Secure full-stack state synchronization",
    projects: "EJP V0.1 client-to-backend database bindings",
    connections: "Unlocks Week 14 RAG pipelines"
  },
  'week-14': {
    effort: "12 Hours",
    relevance: "Llama3 structured outputs parsing, text embeddings, pgvector query matching.",
    capability: "Retrieval-Augmented Generation loops",
    projects: "Vector DB grounded QA study chatbot",
    connections: "Unlocks Week 15 LangGraph agents"
  },
  'week-15': {
    effort: "13 Hours",
    relevance: "LangGraph state engines, tool execution loop routing, conversation history memory.",
    capability: "Multi-agent LangGraph orchestration pipelines",
    projects: "AI database updates tool calling graph",
    connections: "Prerequisite for Phase 7 Placement season"
  },
  'phase-7': {
    effort: "40 Hours",
    relevance: "System architecture, horizontal scaling cache policies, topological sort DSA.",
    capability: "Competitive coding, distributed systems design",
    projects: "Video transcoder blueprint, course scheduler solver",
    connections: "Unlocks Placements Mock interview boards"
  },
  'week-16': {
    effort: "15 Hours",
    relevance: "Consistent hashing, CDN pulls, Redis caching invalidation, rate limiters.",
    capability: "Distributed systems scale estimations",
    projects: "Scale timeline feeds architecture plan",
    connections: "Unlocks Week 17 DSA topological sort sprint"
  },
  'week-17': {
    effort: "15 Hours",
    relevance: "Medium-hard Leetcode arrays, graphs topological sorting, interval heaps.",
    capability: "Dynamic programming memorization recursion",
    projects: "Competitive DSA topological scheduler report",
    connections: "Unlocks Week 18 Mock interview funnels"
  },
  'week-18': {
    effort: "10 Hours",
    relevance: "STAR framework behavioral answers, candidate portfolio review, application tracks.",
    capability: "Technical whiteboard communication skills",
    projects: "Mock interview candidate funnels logs",
    connections: "Unlocks Phase 8 Onboarding OS"
  },
  'phase-8': {
    effort: "30 Hours",
    relevance: "Excel in professional onboarding, PR reviews, incident post-mortems.",
    capability: "Professional engineering leadership",
    projects: "Onboarding first 90 days log docs",
    connections: "Enters Placements active hiring cycles"
  },
  'week-19': {
    effort: "15 Hours",
    relevance: "First 90 days roadmap, production build systems mapping, codebase navigations.",
    capability: "Production build systems mappings",
    projects: "Onboarding checklist first 30 days log",
    connections: "Unlocks Week 20 post-mortem writeups"
  },
  'week-20': {
    effort: "15 Hours",
    relevance: "Incident timelines analysis, incident root causes post-mortems, peer code reviews.",
    capability: "Incident audit post-mortems documentation",
    projects: "Production Outage Incident post-mortem log",
    connections: "Concludes EJP Graduation roadmap"
  }
};

export const RoadmapVisualizer: React.FC<RoadmapVisualizerProps> = ({ onSelectNode }) => {
  const { state } = useEngineeringState();
  
  // Zoom & Pan State
  const [zoom, setZoom] = useState<number>(0.9);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 10 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  
  // Hover & Tooltip State
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Search State (⌘+K shortcut)
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const viewportRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut listener for ⌘+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!state) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ color: 'var(--text3)' }}>Loading roadmap graph...</p>
      </div>
    );
  }

  const { completed_topics, next_unlock } = state;

  // Determine status of a node
  const getNodeStatus = (node: GraphNode): 'done' | 'active' | 'locked' | 'recommended' => {
    if (completed_topics.includes(node.id)) {
      return 'done';
    }

    const isRec = 
      state.recommended_task_id === node.id || 
      (state.recommended_task_id.startsWith('day-') && node.id === `week-${Math.ceil(parseInt(state.recommended_task_id.split('-')[1]) / 2)}`) ||
      (state.recommended_task_id.includes(node.id));

    if (isRec) {
      return 'recommended';
    }

    if (node.id === next_unlock) {
      return 'active';
    }

    if (node.prerequisites.length === 0) {
      return 'active';
    }

    const allPrereqsDone = node.prerequisites.every(p => completed_topics.includes(p));
    if (allPrereqsDone) {
      return 'active';
    }

    return 'locked';
  };

  // Zoom Helpers
  const handleZoomIn = () => setZoom(z => Math.min(z + 0.15, 2.0));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.15, 0.4));

  
  // Fit to screen (centers roadmap tree)
  const handleFitToScreen = () => {
    setZoom(0.55);
    setPanOffset({ x: 0, y: 50 });
  };

  const handleRecenterToTarget = () => {
    if (!state) return;
    const targetId = state.recommended_task_id;
    const cleanTargetId = targetId.endsWith('-assessment') ? targetId.replace('-assessment', '') : targetId;
    const targetNode = roadmapNodes.find(n => n.id === cleanTargetId);
    if (targetNode) {
      focusOnNode(targetNode);
    } else {
      handleFitToScreen();
    }
  };

  // Mouse Drag to Pan
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('.roadmap-node-g') || target.tagName === 'button' || target.closest('.search-box')) {
      return;
    }
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Wheel Zoom
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const zoomFactor = 1.05;
    if (e.deltaY < 0) {
      setZoom(z => Math.min(z * zoomFactor, 2.0));
    } else {
      setZoom(z => Math.max(z / zoomFactor, 0.4));
    }
  };

  // Hover triggers tooltip
  const handleNodeMouseEnter = (e: React.MouseEvent<SVGGElement>, node: GraphNode) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const viewportRect = viewportRef.current?.getBoundingClientRect();
    
    if (viewportRect) {
      setTooltipPos({
        x: rect.left - viewportRect.left + node.width + 12,
        y: rect.top - viewportRect.top
      });
    }
    setHoveredNode(node);
  };

  const handleNodeMouseLeave = () => {
    setHoveredNode(null);
  };

  // Auto focus node (centers graph on search target)
  const focusOnNode = (node: GraphNode) => {
    // Center of viewport coords
    const viewportW = viewportRef.current?.clientWidth || 800;
    const viewportH = viewportRef.current?.clientHeight || 600;
    
    // Calculate required offset to place node in viewport center
    setZoom(1.1);
    setPanOffset({
      x: (viewportW / 2) - (node.x + node.width / 2) * 1.1,
      y: (viewportH / 4) - (node.y + node.height / 2) * 1.1
    });
    
    onSelectNode(node.id);
    setSearchOpen(false);
  };

  // Filtered search list
  const filteredNodes = roadmapNodes.filter(node => 
    node.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
    node.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate dynamic estimated date helper
  const getEstCompletionDate = (node: GraphNode): string => {
    const START_DATE = new Date(state.current_date);
    let daysOffset = 0;
    if (node.id.startsWith('phase')) {
      const pNum = parseInt(node.id.split('-')[1]);
      daysOffset = pNum * 14;
    } else {
      const wNum = parseInt(node.id.split('-')[1]);
      daysOffset = wNum * 7;
    }
    const est = new Date(START_DATE.getTime() + daysOffset * 24 * 3600 * 1000);
    return est.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - var(--topbar-h) - 40px)', position: 'relative' }}>
      
      {/* Header bar overlaid on the top of the canvas */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        right: '20px',
        zIndex: 10,
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Box 1: Interactive controls info */}
          <div style={{ pointerEvents: 'auto', background: 'rgba(3,3,3,0.85)', backdropFilter: 'blur(8px)', padding: '10px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div>
              <h1 style={{ fontSize: '0.92rem', fontWeight: 800, margin: 0 }}>
                Interactive Roadmap
              </h1>
              <p style={{ fontSize: '0.7rem', color: 'var(--text3)', margin: '2px 0 0' }}>
                Drag to pan. Scroll to zoom. Press <kbd style={{ background: 'var(--bg4)', border: '1px solid var(--border)', padding: '1px 4px', borderRadius: '3px', fontSize: '0.62rem', fontFamily: 'var(--mono)' }}>⌘K</kbd> to search.
              </p>
            </div>
            <button 
              className="btn btn-sm" 
              onClick={() => setSearchOpen(true)}
              style={{ padding: '6px 10px', background: 'var(--bg3)', display: 'flex', gap: '6px', alignItems: 'center', fontSize: '0.75rem' }}
            >
              <Search size={12} />
              <span>Search</span>
            </button>
          </div>

          {/* Box 2: Today's Mission Target HUD */}
          {state && state.recommended_task_id !== 'graduation' && (
            <div style={{
              pointerEvents: 'auto',
              background: 'rgba(3,3,3,0.85)',
              backdropFilter: 'blur(8px)',
              padding: '10px 16px',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              boxShadow: '0 0 15px rgba(99, 102, 241, 0.08)'
            }}>
              <div style={{
                background: 'var(--amber-dim)',
                border: '1px solid var(--amber)',
                borderRadius: '4px',
                padding: '2px 6px',
                fontSize: '0.65rem',
                fontFamily: 'var(--mono)',
                color: 'var(--amber)',
                fontWeight: 700
              }}>
                TODAY'S MISSION
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)' }}>
                  {state.recommended_task_id.replace('-', ' ').toUpperCase()}
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text2)', marginTop: '2px' }}>
                  {state.current_technology} · {state.current_semester}
                </div>
              </div>
              <button 
                className="btn btn-sm"
                onClick={() => {
                  const activeNodeId = state.recommended_task_id;
                  const targetNodeId = activeNodeId.endsWith('-assessment') ? activeNodeId.replace('-assessment', '') : activeNodeId;
                  onSelectNode(targetNodeId);
                }}
                style={{ 
                  padding: '6px 12px', 
                  fontSize: '0.75rem', 
                  background: 'var(--accent)', 
                  borderColor: 'var(--accent)',
                  color: '#fff',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Open Workspace
              </button>
            </div>
          )}
        </div>

        {/* Legend */}
        <div style={{
          pointerEvents: 'auto',
          display: 'flex',
          gap: '12px',
          background: 'rgba(3,3,3,0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '10px 14px',
          fontSize: '0.7rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--green)' }} />
            <span style={{ color: 'var(--text2)' }}>Done</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--accent-dim)', border: '1px solid var(--accent)' }} />
            <span style={{ color: 'var(--text2)' }}>Active</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid var(--amber)', boxShadow: '0 0 6px rgba(245, 158, 11, 0.3)' }} />
            <span style={{ color: 'var(--text2)' }}>Next Target</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'transparent', border: '1px dashed var(--text3)' }} />
            <span style={{ color: 'var(--text3)' }}>Locked</span>
          </div>
        </div>
      </div>

      {/* Floating controls in the bottom-right corner */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        right: '24px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        background: 'var(--bg3)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '4px'
      }}>
        <button className="btn btn-sm" onClick={handleZoomIn} style={{ padding: '6px', background: 'transparent', border: 'none' }} title="Zoom In">
          <ZoomIn size={16} />
        </button>
        <button className="btn btn-sm" onClick={handleZoomOut} style={{ padding: '6px', background: 'transparent', border: 'none' }} title="Zoom Out">
          <ZoomOut size={16} />
        </button>
        <button className="btn btn-sm" onClick={handleFitToScreen} style={{ padding: '6px', borderTop: '1px solid var(--border)', background: 'transparent', borderRadius: 0 }} title="Fit to Screen">
          <Maximize size={14} />
        </button>
        <button className="btn btn-sm" onClick={handleRecenterToTarget} style={{ padding: '6px', borderTop: '1px solid var(--border)', background: 'transparent', borderRadius: 0 }} title="Recenter on Active Target">
          <Compass size={14} style={{ color: 'var(--amber)' }} />
        </button>
      </div>

      {/* Interactive Graph Canvas */}
      <div 
        ref={viewportRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{
          flex: 1,
          overflow: 'hidden',
          background: 'var(--bg)',
          backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          position: 'relative',
          cursor: isDragging ? 'grabbing' : 'grab',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)'
        }}
      >
        {/* Transform Group */}
        <div style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
          transformOrigin: 'top center',
          transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: '30px',
          left: 0
        }}>
          <svg 
            width="820" 
            height="1500" 
            style={{ overflow: 'visible', display: 'block', margin: '0 auto' }}
          >
            <defs>
              <filter id="glow-active" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glow-recommended" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComponentTransfer in="blur" result="glow1">
                  <feFuncA type="linear" slope="0.4"/>
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode in="glow1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="edge-grad-locked" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--border)" />
                <stop offset="100%" stopColor="var(--border)" />
              </linearGradient>
              <linearGradient id="edge-grad-active" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.7" />
                <stop offset="100%" stopColor="var(--accent-light)" stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id="edge-grad-done" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--green)" stopOpacity="0.7" />
                <stop offset="100%" stopColor="var(--green)" stopOpacity="0.7" />
              </linearGradient>
            </defs>

            {/* Render Edges */}
            {roadmapEdges.map((edge, idx) => {
              const fromNode = roadmapNodes.find(n => n.id === edge.from);
              const toNode = roadmapNodes.find(n => n.id === edge.to);

              if (!fromNode || !toNode) return null;

              const fromX = fromNode.x + fromNode.width / 2;
              const fromY = fromNode.y + fromNode.height;
              const toX = toNode.x + toNode.width / 2;
              const toY = toNode.y;

              const controlY1 = fromY + (toY - fromY) / 2;
              const controlY2 = fromY + (toY - fromY) / 2;

              const fromStatus = getNodeStatus(fromNode);
              const toStatus = getNodeStatus(toNode);

              let strokeColor = 'url(#edge-grad-locked)';
              let strokeWidth = 2.0;
              let strokeDash = undefined;

              if (fromStatus === 'done' && toStatus === 'done') {
                strokeColor = 'url(#edge-grad-done)';
                strokeWidth = 2.5;
              } else if (fromStatus === 'done' || fromStatus === 'recommended') {
                strokeColor = 'url(#edge-grad-active)';
                strokeWidth = 2.5;
              } else {
                strokeDash = '4,4';
              }

              return (
                <path
                  key={`edge-${idx}`}
                  d={`M ${fromX} ${fromY} C ${fromX} ${controlY1}, ${toX} ${controlY2}, ${toX} ${toY}`}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDash}
                  style={{ transition: 'stroke 0.2s ease, stroke-width 0.2s ease' }}
                />
              );
            })}

            {/* Render Nodes */}
            {roadmapNodes.map((node) => {
              const status = getNodeStatus(node);
              const isPhase = node.type === 'phase';
              
              let fill = 'var(--bg2)';
              let border = 'var(--border)';
              let borderStyle = 'solid';
              let filter = undefined;
              let titleColor = 'var(--text)';
              let icon = null;

              if (status === 'done') {
                fill = 'rgba(16, 185, 129, 0.02)';
                border = 'var(--green)';
                titleColor = 'var(--text)';
                icon = <CheckCircle2 size={13} style={{ color: 'var(--green)' }} />;
              } else if (status === 'recommended') {
                fill = 'var(--bg3)';
                border = 'var(--amber)';
                filter = 'url(#glow-recommended)';
                titleColor = 'var(--text)';
                icon = <Star size={13} style={{ color: 'var(--amber)', fill: 'var(--amber)' }} />;
              } else if (status === 'active') {
                fill = 'var(--accent-dim)';
                border = 'var(--accent)';
                filter = 'url(#glow-active)';
                titleColor = 'var(--text)';
                icon = <PlayCircle size={13} style={{ color: 'var(--accent)' }} />;
              } else {
                fill = 'rgba(10, 10, 12, 0.6)';
                border = 'var(--text3)';
                borderStyle = 'dashed';
                titleColor = 'var(--text3)';
                icon = <Lock size={11} style={{ color: 'var(--text3)' }} />;
              }

              return (
                <g 
                  key={node.id} 
                  className="roadmap-node-g"
                  onClick={() => status !== 'locked' && onSelectNode(node.id)}
                  onDoubleClick={() => status !== 'locked' && focusOnNode(node)}
                  onMouseEnter={(e) => handleNodeMouseEnter(e, node)}
                  onMouseLeave={handleNodeMouseLeave}
                  style={{ cursor: status === 'locked' ? 'not-allowed' : 'pointer' }}
                >
                  <rect
                    x={node.x}
                    y={node.y}
                    width={node.width}
                    height={node.height}
                    rx={isPhase ? 10 : 6}
                    ry={isPhase ? 10 : 6}
                    fill={fill}
                    stroke={border}
                    strokeWidth={isPhase ? 2 : 1.5}
                    strokeDasharray={borderStyle === 'dashed' ? '4,4' : undefined}
                    filter={filter}
                    style={{
                      transition: 'border-color 0.2s ease, fill 0.2s ease, transform 0.2s ease',
                      transformBox: 'fill-box',
                      transformOrigin: 'center'
                    }}
                    className="roadmap-node-rect"
                  />

                  <foreignObject
                    x={node.x + 10}
                    y={node.y + 6}
                    width={node.width - 20}
                    height={node.height - 12}
                    style={{ pointerEvents: 'none' }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      width: '100%',
                      height: '100%',
                      fontFamily: isPhase ? 'var(--sans)' : 'var(--mono)',
                      fontSize: isPhase ? '0.85rem' : '0.78rem',
                      fontWeight: isPhase ? 700 : 500,
                      color: titleColor,
                      textAlign: 'center',
                      lineHeight: '1.2'
                    }}>
                      {icon}
                      <span style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {node.label}
                      </span>
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* 🎯 Interactive Canvas Minimap Overlay (bottom-left corner) */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        left: '24px',
        width: '120px',
        height: '180px',
        background: 'rgba(10,10,12,0.85)',
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '8px',
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10
      }}>
        <div style={{ fontSize: '0.62rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', borderBottom: '1px solid var(--border)', paddingBottom: '3px' }}>
          Minimap
        </div>
        <svg width="100%" height="100%" viewBox="0 0 820 1500" style={{ overflow: 'visible' }}>
          {roadmapNodes.map(node => {
            const status = getNodeStatus(node);
            let miniFill = 'var(--text3)';
            if (status === 'done') miniFill = 'var(--green)';
            if (status === 'recommended') miniFill = 'var(--amber)';
            if (status === 'active') miniFill = 'var(--accent)';
            return (
              <rect
                key={`mini-${node.id}`}
                x={node.x}
                y={node.y}
                width={node.width}
                height={node.height}
                rx={15}
                ry={15}
                fill={miniFill}
                opacity={status === 'locked' ? 0.25 : 0.85}
              />
            );
          })}
        </svg>
      </div>

      {/* 🎯 Hover Intelligence Tooltip popover */}
      {hoveredNode && (
        <div style={{
          position: 'absolute',
          left: `${tooltipPos.x}px`,
          top: `${tooltipPos.y}px`,
          width: '280px',
          background: 'rgba(10,10,12,0.95)',
          backdropFilter: 'blur(12px)',
          border: '1.5px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '16px',
          boxShadow: 'var(--shadow)',
          zIndex: 100,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          animation: 'fadeIn 0.15s ease'
        }}>
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(4px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
            <span style={{ fontSize: '0.62rem', fontFamily: 'var(--mono)', color: 'var(--accent-light)', fontWeight: 700, textTransform: 'uppercase' }}>
              {hoveredNode.type.toUpperCase()} SPEC
            </span>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text)', marginTop: '2px' }}>{hoveredNode.label}</h4>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.75rem' }}>
            <div>
              <strong style={{ color: 'var(--text2)' }}>Estimated Effort: </strong>
              <span style={{ color: 'var(--text)', fontWeight: 600 }}>{nodeMetadata[hoveredNode.id]?.effort || 'Est. 1 week'}</span>
            </div>
            <div>
              <strong style={{ color: 'var(--text2)' }}>Est. Finish: </strong>
              <span style={{ color: 'var(--text)', fontWeight: 600 }}>{getEstCompletionDate(hoveredNode)}</span>
            </div>
            <div>
              <strong style={{ color: 'var(--text2)' }}>Capability Gained: </strong>
              <span style={{ color: 'var(--text)', fontWeight: 600 }}>{nodeMetadata[hoveredNode.id]?.capability || 'Logical structures'}</span>
            </div>
            <div>
              <strong style={{ color: 'var(--text2)' }}>Related Projects: </strong>
              <span style={{ color: 'var(--text)', fontWeight: 600 }}>{nodeMetadata[hoveredNode.id]?.projects || 'CLI scripts'}</span>
            </div>
            <div style={{ borderTop: '1px dashed var(--border)', paddingTop: '6px', color: 'var(--text3)', fontSize: '0.72rem', lineHeight: '1.4' }}>
              <strong>Relevance:</strong> {nodeMetadata[hoveredNode.id]?.relevance}
            </div>
          </div>
        </div>
      )}

      {/* 🎯 Search Modal dialog (⌘+K trigger) */}
      {searchOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(4px)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} onClick={() => setSearchOpen(false)}>
          <div 
            className="search-box"
            style={{
              width: '420px',
              background: 'var(--bg2)',
              border: '1.5px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: 'var(--shadow)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg3)', padding: '10px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <Search size={16} style={{ color: 'var(--text3)' }} />
              <input
                type="text"
                autoFocus
                placeholder="Search roadmap topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text)',
                  fontSize: '0.88rem',
                  width: '100%'
                }}
              />
            </div>
            
            <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {filteredNodes.length > 0 ? (
                filteredNodes.map(node => {
                  const status = getNodeStatus(node);
                  return (
                    <button
                      key={node.id}
                      onClick={() => focusOnNode(node)}
                      disabled={status === 'locked'}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '6px',
                        color: status === 'locked' ? 'var(--text3)' : 'var(--text2)',
                        fontSize: '0.82rem',
                        textAlign: 'left',
                        cursor: status === 'locked' ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (status !== 'locked') {
                          e.currentTarget.style.background = 'var(--bg4)';
                          e.currentTarget.style.color = 'var(--text)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (status !== 'locked') {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = 'var(--text2)';
                        }
                      }}
                    >
                      <span>{node.label}</span>
                      <span style={{ fontSize: '0.68rem', opacity: 0.6, fontFamily: 'var(--mono)' }}>
                        {status.toUpperCase()}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div style={{ textAlign: 'center', padding: '16px', color: 'var(--text3)', fontSize: '0.8rem' }}>
                  No matching topics found.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
