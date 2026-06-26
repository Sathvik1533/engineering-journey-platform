import React from 'react';
import { X, Briefcase, GraduationCap, Cpu, Code2, Link2, ExternalLink } from 'lucide-react';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const stack = [
    "FastAPI", "LangGraph", "LangChain", "Groq AI", "Python", "Next.js 14",
    "Supabase", "PostgreSQL", "ChromaDB", "Redis", "Vercel", "Railway"
  ];

  const projects = [
    {
      name: "ClaimKit",
      former: "ArbitrAI",
      status: "IN BUILD",
      statusColor: "var(--accent-light)",
      statusBg: "var(--accent-dim)",
      desc: "AI payment dispute engine for Indian freelancers. Upload contract + WhatsApp chat → AI ranks evidence → generates demand letter → schedules follow-ups via a 7-node LangGraph pipeline.",
      stack: "FastAPI · LangGraph · ChromaDB · Redis · Supabase · Next.js 14"
    },
    {
      name: "FinSight",
      status: "LIVE / SHIPPED",
      statusColor: "var(--green)",
      statusBg: "rgba(16, 185, 129, 0.08)",
      desc: "GST intelligence tool. Ingests receipt OCR via Groq Vision → LLM categorisation → ITC eligibility verdict in under 3 seconds.",
      stack: "FastAPI · Groq Vision · Supabase · Next.js 14"
    },
    {
      name: "ContextFlow",
      status: "IN PROGRESS",
      statusColor: "var(--amber)",
      statusBg: "var(--amber-dim)",
      desc: "Developer productivity CLI eliminating context tax. 5-node LangGraph pipeline capture → observer → memory → guide → output.",
      stack: "Python · LangGraph · LangChain · Groq · ChromaDB"
    },
    {
      name: "MLRIT Performance Platform",
      status: "COMPLETE",
      statusColor: "var(--green)",
      statusBg: "rgba(16, 185, 129, 0.08)",
      desc: "Redis caching + CDN benchmarking platform. Achieved a 10x API latency reduction from 50ms to 5ms.",
      stack: "Next.js · Upstash Redis · Cloudinary · Prisma · SQLite"
    },
    {
      name: "Waymaker",
      status: "PAUSED",
      statusColor: "var(--text3)",
      statusBg: "var(--bg3)",
      desc: "On hold until active ClaimKit builds deploy and go live.",
      stack: "Python · CLI"
    }
  ];

  return (
    <>
      {/* Drawer Overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 150
        }}
        onClick={onClose}
      />

      {/* Profile Slide-out Panel */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '500px',
        maxWidth: '100%',
        height: '100vh',
        background: 'var(--bg2)',
        borderLeft: '1px solid var(--border)',
        zIndex: 160,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
        animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}>
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>

        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--accent)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.1rem'
            }}>
              KS
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)' }}>Kotagiri Sathvik</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text3)', fontWeight: 600 }}>AI Backend Engineer</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text2)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg4)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          {/* Identity Sentence */}
          <div style={{
            background: 'var(--accent-glow)',
            borderLeft: '4px solid var(--accent)',
            padding: '16px',
            borderRadius: '0 var(--radius) var(--radius) 0'
          }}>
            <p style={{
              fontStyle: 'italic',
              fontSize: '0.88rem',
              color: 'var(--text)',
              lineHeight: '1.5',
              margin: 0
            }}>
              "I build AI backends that go to production — not demos, not notebooks. 7-node LangGraph pipelines, guardrails layers, Redis event streaming, deployed and live."
            </p>
          </div>

          {/* Academic Profile */}
          <div>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.05em', fontWeight: 700 }}>
              <GraduationCap size={16} /> Academic Background
            </h4>
            <div style={{ background: 'var(--bg3)', padding: '16px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text2)' }}>Institution</span>
                <span style={{ fontWeight: 600, color: 'var(--text)' }}>MLR Institute of Technology, Hyd</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text2)' }}>Degree & Stream</span>
                <span style={{ fontWeight: 600, color: 'var(--text)' }}>B.Tech Computer Science (2nd Year)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text2)' }}>CGPA</span>
                <span style={{ fontWeight: 700, color: 'var(--green)' }}>8.83 / 10</span>
              </div>
            </div>
          </div>

          {/* Internship Target */}
          <div>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.05em', fontWeight: 700 }}>
              <Briefcase size={16} /> Placements & Internships
            </h4>
            <div style={{ background: 'var(--bg3)', padding: '16px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text2)' }}>Goal Target</span>
                <span style={{ fontWeight: 600, color: 'var(--accent-light)' }}>Paid AI / GenAI Internship</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text2)' }}>Target Date</span>
                <span style={{ fontWeight: 600, color: 'var(--text)' }}>August 2026 (Placements in 3-2)</span>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.05em', fontWeight: 700 }}>
              <Cpu size={16} /> Verified Skills Matrix
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {stack.map((item) => (
                <span 
                  key={item} 
                  style={{
                    background: 'var(--bg3)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    padding: '5px 10px',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--mono)',
                    color: 'var(--text2)'
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Core Projects Tracker */}
          <div>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.05em', fontWeight: 700 }}>
              <Code2 size={16} /> Projects & Build Pipeline
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {projects.map((proj) => (
                <div 
                  key={proj.name} 
                  style={{
                    background: 'var(--bg3)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.9rem' }}>{proj.name}</span>
                    <span 
                      style={{
                        background: proj.statusBg,
                        color: proj.statusColor,
                        borderRadius: '4px',
                        padding: '2px 8px',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        fontFamily: 'var(--mono)'
                      }}
                    >
                      {proj.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text2)', lineHeight: '1.4', margin: 0 }}>
                    {proj.desc}
                  </p>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text3)', fontFamily: 'var(--mono)', marginTop: '4px' }}>
                    <strong>Stack:</strong> {proj.stack}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div style={{ marginTop: '10px' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.05em', fontWeight: 700 }}>
              <Link2 size={16} /> Connections
            </h4>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a 
                href="https://github.com/Sathvik1533" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: 'var(--bg3)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '10px',
                  color: 'var(--text2)',
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text)';
                  e.currentTarget.style.background = 'var(--bg4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text2)';
                  e.currentTarget.style.background = 'var(--bg3)';
                }}
              >
                <GithubIcon />
                <span>GitHub</span>
                <ExternalLink size={12} />
              </a>
              <a 
                href="https://linkedin.com/in/kotagirisathvik" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: 'var(--bg3)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '10px',
                  color: 'var(--text2)',
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text)';
                  e.currentTarget.style.background = 'var(--bg4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text2)';
                  e.currentTarget.style.background = 'var(--bg3)';
                }}
              >
                <LinkedinIcon />
                <span>LinkedIn</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
