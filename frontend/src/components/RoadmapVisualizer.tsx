import React, { useState, useRef, useEffect } from 'react';
interface GraphNode {
  id: string;
  label: string;
  type: 'phase' | 'week';
  x: number;
  y: number;
  width: number;
  height: number;
  prerequisites: string[];
  unlocks?: string[];
  effort?: string;
  relevance?: string;
  capability?: string;
  projects?: string;
}
import { useEngineeringState } from '../context/EngineeringStateContext';
import { CheckCircle2, Lock, PlayCircle, Star, ZoomIn, ZoomOut, Maximize, Search, Compass } from 'lucide-react';

interface RoadmapVisualizerProps {
  onSelectNode: (nodeId: string) => void;
}

// Full specifications for every node's metadata (prerequisites, unlocks, effort, capability, relevance, projects)
export const RoadmapVisualizer: React.FC<RoadmapVisualizerProps> = ({ onSelectNode }) => {
  const { state, graph } = useEngineeringState();
  const roadmapNodes: GraphNode[] = graph?.nodes ?? [];
  const roadmapEdges = graph?.edges ?? [];
  
  // Zoom & Pan State
  const [zoom, setZoom] = useState<number>(0.75);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 80 });
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
    setZoom(0.75);
    setPanOffset({ x: 0, y: 80 });
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
    const viewportH = viewportRef.current?.clientHeight || 600;
    
    const targetZoom = 1.0;
    setZoom(targetZoom);
    
    const cx = node.x + node.width / 2;
    const cy = node.y + node.height / 2;
    
    setPanOffset({
      x: (410 - cx) * targetZoom,
      y: (viewportH / 2) - (cy + 30) * targetZoom
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
          <div style={{ pointerEvents: 'auto', background: '#ffffff', padding: '10px 14px', borderRadius: 'var(--radius)', border: '2px solid #0f172a', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: 'var(--shadow-sm)' }}>
            <div>
              <h1 style={{ fontSize: '0.92rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                Interactive Roadmap
              </h1>
              <p style={{ fontSize: '0.7rem', color: '#475569', margin: '2px 0 0' }}>
                Drag to pan. Scroll to zoom. Press <kbd style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '1px 4px', borderRadius: '3px', fontSize: '0.62rem', fontFamily: 'var(--mono)' }}>⌘K</kbd> to search.
              </p>
            </div>
            <button 
              className="btn btn-sm" 
              onClick={() => setSearchOpen(true)}
              style={{ padding: '6px 10px', background: '#f1f5f9', border: '2px solid #0f172a', borderRadius: '4px', display: 'flex', gap: '6px', alignItems: 'center', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
            >
              <Search size={12} />
              <span>Search</span>
            </button>
          </div>

          {/* Box 2: Today's Mission Target HUD */}
          {state && state.recommended_task_id !== 'graduation' && (
            <div style={{
              pointerEvents: 'auto',
              background: '#ffffff',
              padding: '10px 16px',
              borderRadius: 'var(--radius)',
              border: '2px solid #0f172a',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                background: '#fef3c7',
                border: '2px solid #d97706',
                borderRadius: '4px',
                padding: '2px 6px',
                fontSize: '0.65rem',
                fontFamily: 'var(--mono)',
                color: '#d97706',
                fontWeight: 800
              }}>
                TODAY'S MISSION
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>
                  {state.recommended_task_id.replace('-', ' ').toUpperCase()}
                </div>
                <div style={{ fontSize: '0.68rem', color: '#475569', marginTop: '2px' }}>
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
                  background: '#eab308', 
                  border: '2px solid #0f172a',
                  color: '#0f172a',
                  fontWeight: 800,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  boxShadow: '2px 2px 0 #0f172a'
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
          background: '#ffffff',
          border: '2px solid #0f172a',
          borderRadius: 'var(--radius)',
          padding: '10px 14px',
          fontSize: '0.7rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#ecfdf5', border: '2px solid #0f172a' }} />
            <span style={{ color: '#475569', fontWeight: 600 }}>Done</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#ffffff', border: '2px solid #0f172a' }} />
            <span style={{ color: '#475569', fontWeight: 600 }}>Active</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#fffbeb', border: '2px solid #0f172a' }} />
            <span style={{ color: '#475569', fontWeight: 600 }}>Next Target</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#f8fafc', border: '2px dashed #cbd5e1' }} />
            <span style={{ color: '#94a3b8', fontWeight: 600 }}>Locked</span>
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
        gap: '4px',
        background: '#ffffff',
        border: '2px solid #0f172a',
        borderRadius: 'var(--radius)',
        padding: '4px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <button className="btn btn-sm" onClick={handleZoomIn} style={{ padding: '6px', background: 'transparent', border: 'none', cursor: 'pointer' }} title="Zoom In">
          <ZoomIn size={16} color="#0f172a" />
        </button>
        <button className="btn btn-sm" onClick={handleZoomOut} style={{ padding: '6px', background: 'transparent', border: 'none', cursor: 'pointer' }} title="Zoom Out">
          <ZoomOut size={16} color="#0f172a" />
        </button>
        <button className="btn btn-sm" onClick={handleFitToScreen} style={{ padding: '6px', borderTop: '2px solid #0f172a', background: 'transparent', borderRadius: 0, cursor: 'pointer' }} title="Fit to Screen">
          <Maximize size={14} color="#0f172a" />
        </button>
        <button className="btn btn-sm" onClick={handleRecenterToTarget} style={{ padding: '6px', borderTop: '2px solid #0f172a', background: 'transparent', borderRadius: 0, cursor: 'pointer' }} title="Recenter on Active Target">
          <Compass size={14} style={{ color: '#d97706' }} />
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
            height="2800" 
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

              let strokeColor = '#cbd5e1';
              let strokeWidth = 2.0;
              let strokeDash = undefined;

              if (fromStatus === 'done' && toStatus === 'done') {
                strokeColor = '#10b981';
                strokeWidth = 2.5;
              } else if (fromStatus === 'done' || fromStatus === 'recommended' || fromStatus === 'active') {
                strokeColor = '#0f172a';
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
              
              let fill = '#ffffff';
              let border = '#0f172a';
              let borderStyle = 'solid';
              let filter = undefined;
              let titleColor = '#0f172a';
              let icon = null;

              if (status === 'done') {
                fill = '#ecfdf5';
                border = '#0f172a';
                titleColor = '#0f172a';
                icon = <CheckCircle2 size={13} style={{ color: '#059669' }} />;
              } else if (status === 'recommended') {
                fill = '#fffbeb';
                border = '#eab308';
                filter = 'url(#glow-recommended)';
                titleColor = '#0f172a';
                icon = <Star size={13} style={{ color: '#d97706', fill: '#d97706' }} />;
              } else if (status === 'active') {
                fill = '#ffffff';
                border = '#0f172a';
                titleColor = '#0f172a';
                icon = <PlayCircle size={13} style={{ color: '#eab308' }} />;
              } else {
                fill = '#f8fafc';
                border = '#cbd5e1';
                borderStyle = 'dashed';
                titleColor = '#94a3b8';
                icon = <Lock size={11} style={{ color: '#cbd5e1' }} />;
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
                    rx={isPhase ? 8 : 6}
                    ry={isPhase ? 8 : 6}
                    fill={fill}
                    stroke={border}
                    strokeWidth={status === 'recommended' ? 3 : 2}
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
                      fontFamily: 'var(--sans)',
                      fontSize: isPhase ? '0.85rem' : '0.78rem',
                      fontWeight: isPhase ? 800 : 600,
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
        background: '#ffffff',
        border: '2px solid #0f172a',
        borderRadius: 'var(--radius)',
        padding: '8px',
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10,
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ fontSize: '0.62rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px', borderBottom: '2px solid #0f172a', paddingBottom: '3px' }}>
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
              <span style={{ color: 'var(--text)', fontWeight: 600 }}>{hoveredNode.effort || 'Est. 1 week'}</span>
            </div>
            <div>
              <strong style={{ color: 'var(--text2)' }}>Est. Finish: </strong>
              <span style={{ color: 'var(--text)', fontWeight: 600 }}>{getEstCompletionDate(hoveredNode)}</span>
            </div>
            <div>
              <strong style={{ color: 'var(--text2)' }}>Capability Gained: </strong>
              <span style={{ color: 'var(--text)', fontWeight: 600 }}>{hoveredNode.capability || 'Logical structures'}</span>
            </div>
            <div>
              <strong style={{ color: 'var(--text2)' }}>Related Projects: </strong>
              <span style={{ color: 'var(--text)', fontWeight: 600 }}>{hoveredNode.projects || 'CLI scripts'}</span>
            </div>
            <div style={{ borderTop: '1px dashed var(--border)', paddingTop: '6px', color: 'var(--text3)', fontSize: '0.72rem', lineHeight: '1.4' }}>
              <strong>Relevance:</strong> {hoveredNode.relevance}
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
