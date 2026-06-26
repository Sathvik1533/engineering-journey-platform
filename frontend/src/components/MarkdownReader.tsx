import React, { useState, useEffect } from 'react';
import { BookOpen, FileText, ChevronRight, Loader2, AlertCircle } from 'lucide-react';

interface MarkdownReaderProps {
  initialDoc?: string;
}

const docList = [
  { id: '00-PERDS.md', label: 'Platform Diagnostic System (PERDS)' },
  { id: '01-Foundation.md', label: 'Volume 1: Executive Foundation' },
  { id: '02-Semester-3-1.md', label: 'Volume 2: Semester 3-1 Core' },
  { id: '03-Semester-3-2.md', label: 'Volume 3: Semester 3-2 AI & FS' },
  { id: '04-Placement-Advanced.md', label: 'Volume 4: Placements & DSA' },
  { id: '05-Professional-Growth.md', label: 'Volume 5: Career Trajectory' },
  { id: '06-Technical-Blueprint.md', label: 'Volume 6: Platform Blueprint' }
];

export const MarkdownReader: React.FC<MarkdownReaderProps> = ({ initialDoc }) => {
  const [selectedDoc, setSelectedDoc] = useState<string>(initialDoc || docList[1].id);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoc = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/syllabus/docs/${selectedDoc}`);
        if (!response.ok) {
          throw new Error(`Failed to load document: ${response.statusText}`);
        }
        const text = await response.text();
        setContent(text);
      } catch (err: any) {
        console.error('Failed to load markdown volume:', err);
        setError(err.message || 'Failed to fetch the document');
      } finally {
        setLoading(false);
      }
    };
    fetchDoc();
  }, [selectedDoc]);

  // Simple, highly effective parser that converts markdown string to React elements
  const renderMarkdown = (mdText: string) => {
    const lines = mdText.split('\n');
    const elements: React.ReactNode[] = [];
    let inList = false;
    let listItems: React.ReactNode[] = [];
    let inTable = false;
    let tableHeaders: string[] = [];
    let tableRows: string[][] = [];

    const flushList = (key: string) => {
      if (inList && listItems.length > 0) {
        elements.push(
          <ul key={key} style={{ paddingLeft: '24px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px', color: 'var(--text2)', fontSize: '0.9rem' }}>
            {listItems}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    const flushTable = (key: string) => {
      if (inTable) {
        elements.push(
          <div key={key} className="tbl-wrap" style={{ overflowX: 'auto', marginBottom: '20px', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead style={{ background: 'var(--bg3)', borderBottom: '1px solid var(--border)' }}>
                <tr>
                  {tableHeaders.map((h, i) => (
                    <th key={i} style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: idx !== tableRows.length - 1 ? '1px solid var(--border)' : 'none', background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                    {row.map((cell, i) => (
                      <td key={i} style={{ padding: '12px 16px', color: 'var(--text2)' }}>{parseInlineMarkdown(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableHeaders = [];
        tableRows = [];
        inTable = false;
      }
    };

    const parseInlineMarkdown = (text: string): React.ReactNode => {
      // Basic bold and code tag parser
      let currentText = text;
      
      // Simple regex parser
      const regex = /(\*\*.*?\*\*|`.*?`)/g;
      const splitted = currentText.split(regex);
      
      return splitted.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} style={{ color: 'var(--text)', fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
        } else if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={index} style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', background: 'var(--bg3)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border)', color: 'var(--accent-light)' }}>{part.slice(1, -1)}</code>;
        }
        return part;
      });
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const key = `md-${i}`;

      // 1. Blockquotes / Alerts
      if (line.startsWith('>')) {
        flushList(key + '-l');
        flushTable(key + '-t');
        const quoteContent = line.slice(1).trim();
        elements.push(
          <div key={key} style={{
            background: 'var(--accent-dim)',
            borderLeft: '4px solid var(--accent)',
            padding: '12px 16px',
            borderRadius: '0 8px 8px 0',
            marginBottom: '20px',
            color: 'var(--text2)',
            fontSize: '0.88rem',
            lineHeight: '1.5'
          }}>
            {parseInlineMarkdown(quoteContent)}
          </div>
        );
        continue;
      }

      // 2. Headers
      if (line.startsWith('#')) {
        flushList(key + '-l');
        flushTable(key + '-t');
        
        let level = 0;
        while (line[level] === '#') {
          level++;
        }
        const titleText = line.slice(level).trim();
        
        if (level === 1) {
          elements.push(<h1 key={key} style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)', marginTop: '24px', marginBottom: '14px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>{parseInlineMarkdown(titleText)}</h1>);
        } else if (level === 2) {
          elements.push(<h2 key={key} style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text)', marginTop: '20px', marginBottom: '10px' }}>{parseInlineMarkdown(titleText)}</h2>);
        } else {
          elements.push(<h3 key={key} style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text)', marginTop: '16px', marginBottom: '8px' }}>{parseInlineMarkdown(titleText)}</h3>);
        }
        continue;
      }

      // 3. Lists
      if (line.startsWith('-') || line.startsWith('*')) {
        flushTable(key + '-t');
        inList = true;
        const itemContent = line.slice(1).trim();
        listItems.push(
          <li key={key} style={{ lineHeight: '1.5' }}>
            {parseInlineMarkdown(itemContent)}
          </li>
        );
        continue;
      }

      // 4. Tables
      if (line.startsWith('|')) {
        flushList(key + '-l');
        // Check if divider line
        if (line.includes('---')) {
          continue; // skip divider
        }
        const cells = line.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        if (!inTable) {
          inTable = true;
          tableHeaders = cells;
        } else {
          tableRows.push(cells);
        }
        continue;
      }

      // 5. Horizontal rules
      if (line === '---') {
        flushList(key + '-l');
        flushTable(key + '-t');
        elements.push(<hr key={key} style={{ border: 'none', borderBottom: '1px solid var(--border)', margin: '24px 0' }} />);
        continue;
      }

      // 6. Regular paragraphs
      if (line !== '') {
        flushList(key + '-l');
        flushTable(key + '-t');
        elements.push(
          <p key={key} style={{ marginBottom: '16px', color: 'var(--text2)', fontSize: '0.9rem', lineHeight: '1.6' }}>
            {parseInlineMarkdown(line)}
          </p>
        );
      } else {
        // Empty line flushes active containers
        flushList(key + '-l');
        flushTable(key + '-t');
      }
    }

    // Catch remaining open blocks
    flushList('last-l');
    flushTable('last-t');

    return elements;
  };

  return (
    <div style={{ display: 'flex', gap: '24px', minHeight: 'calc(100vh - var(--topbar-h) - 80px)' }}>
      {/* Document Selector Sidebar */}
      <div style={{
        width: '260px',
        flexShrink: 0,
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        height: 'fit-content',
        position: 'sticky',
        top: '84px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', paddingBottom: '8px', borderBottom: '1px solid var(--border)' }}>
          <BookOpen size={16} style={{ color: 'var(--accent)' }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text3)' }}>Syllabus Volumes</span>
        </div>
        {docList.map((doc) => {
          const isSelected = selectedDoc === doc.id;
          return (
            <button
              key={doc.id}
              onClick={() => setSelectedDoc(doc.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                background: isSelected ? 'var(--accent-dim)' : 'transparent',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '6px',
                color: isSelected ? 'var(--accent-light)' : 'var(--text2)',
                fontSize: '0.8rem',
                fontWeight: isSelected ? 700 : 500,
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = 'var(--bg4)';
                  e.currentTarget.style.color = 'var(--text)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text2)';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                <FileText size={14} style={{ flexShrink: 0 }} />
                <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{doc.label}</span>
              </div>
              {isSelected && <ChevronRight size={14} />}
            </button>
          );
        })}
      </div>

      {/* Main Document Reading Panel */}
      <div style={{
        flex: 1,
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '32px 40px',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '80px 0', gap: '16px' }}>
            <Loader2 size={32} style={{ color: 'var(--accent)', animation: 'spin 1s linear infinite' }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--text3)' }}>Loading curriculum document...</span>
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : error ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '60px 24px', gap: '12px', textAlign: 'center' }}>
            <AlertCircle size={28} style={{ color: 'var(--red)' }} />
            <h4 style={{ color: 'var(--text)', fontWeight: 700 }}>Failed to Load Document</h4>
            <p style={{ color: 'var(--text3)', fontSize: '0.8rem', maxWidth: '300px' }}>{error}</p>
          </div>
        ) : (
          <article className="markdown-body" style={{ color: 'var(--text)', fontFamily: 'var(--sans)', lineHeight: '1.6' }}>
            {renderMarkdown(content)}
          </article>
        )}
      </div>
    </div>
  );
};
