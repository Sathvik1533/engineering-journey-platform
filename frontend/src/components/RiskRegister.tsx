import React, { useState } from 'react';
import { Plus, Trash2, Edit2, AlertOctagon, Save, X } from 'lucide-react';

interface Risk {
  id?: number;
  description: string;
  impact: string;
  probability: string;
  mitigation: string;
}

interface RiskRegisterProps {
  risks: Risk[];
  onAddRisk: (risk: Risk) => Promise<void>;
  onUpdateRisk: (risk: Risk) => Promise<void>;
  onDeleteRisk: (id: number) => Promise<void>;
}

export const RiskRegister: React.FC<RiskRegisterProps> = ({
  risks,
  onAddRisk,
  onUpdateRisk,
  onDeleteRisk
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // New Risk Form State
  const [newDesc, setNewDesc] = useState('');
  const [newImpact, setNewImpact] = useState('Medium');
  const [newProb, setNewProb] = useState('Medium');
  const [newMitigation, setNewMitigation] = useState('');

  // Editing Risk Form State
  const [editDesc, setEditDesc] = useState('');
  const [editImpact, setEditImpact] = useState('Medium');
  const [editProb, setEditProb] = useState('Medium');
  const [editMitigation, setEditMitigation] = useState('');

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc.trim()) return;
    await onAddRisk({
      description: newDesc,
      impact: newImpact,
      probability: newProb,
      mitigation: newMitigation
    });
    setNewDesc('');
    setNewMitigation('');
    setIsAdding(false);
  };

  const handleStartEdit = (risk: Risk) => {
    if (risk.id !== undefined) {
      setEditingId(risk.id);
      setEditDesc(risk.description);
      setEditImpact(risk.impact);
      setEditProb(risk.probability);
      setEditMitigation(risk.mitigation);
    }
  };

  const handleSaveEdit = async (id: number) => {
    await onUpdateRisk({
      id,
      description: editDesc,
      impact: editImpact,
      probability: editProb,
      mitigation: editMitigation
    });
    setEditingId(null);
  };

  const getBadgeColor = (val: string) => {
    if (val === 'High') return 'badge-red';
    if (val === 'Medium') return 'badge-amber';
    return 'badge-green';
  };

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
        <div>
          <div className="page-eyebrow">Mitigation Log</div>
          <h1 className="page-title">Risk Register</h1>
          <p className="page-sub">Identified threats to timeline completion and mitigation strategy.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsAdding(true)}>
          <Plus size={15} />
          Log Project Risk
        </button>
      </div>

      {/* Add Risk Modal Overlay */}
      {isAdding && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.15rem' }}>Log New Risk Threat</h3>
              <button onClick={() => setIsAdding(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text3)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text2)', marginBottom: '4px' }}>Risk Description</label>
                <input 
                  type="text" 
                  className="input" 
                  value={newDesc} 
                  onChange={(e) => setNewDesc(e.target.value)} 
                  placeholder="e.g. Server hosting cost spikes"
                  required 
                />
              </div>

              <div className="grid grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text2)', marginBottom: '4px' }}>Impact Level</label>
                  <select className="select" value={newImpact} onChange={(e) => setNewImpact(e.target.value)}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text2)', marginBottom: '4px' }}>Probability</label>
                  <select className="select" value={newProb} onChange={(e) => setNewProb(e.target.value)}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text2)', marginBottom: '4px' }}>Mitigation Plan Action</label>
                <textarea 
                  className="textarea" 
                  rows={3} 
                  value={newMitigation} 
                  onChange={(e) => setNewMitigation(e.target.value)} 
                  placeholder="Describe step-by-step resolution roadmap..."
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button type="button" className="btn" onClick={() => setIsAdding(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Risk</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Risks Table List */}
      <div className="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th style={{ width: '30%' }}>Risk Description</th>
              <th style={{ width: '12%' }}>Impact</th>
              <th style={{ width: '12%' }}>Probability</th>
              <th style={{ width: '34%' }}>Mitigation Action</th>
              <th style={{ width: '12%', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {risks.map((risk) => {
              const isEditing = editingId === risk.id;
              return (
                <tr key={risk.id}>
                  {isEditing ? (
                    <>
                      <td>
                        <input type="text" className="input" value={editDesc} onChange={(e) => setEditDesc(e.target.value)} />
                      </td>
                      <td>
                        <select className="select" value={editImpact} onChange={(e) => setEditImpact(e.target.value)}>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </td>
                      <td>
                        <select className="select" value={editProb} onChange={(e) => setEditProb(e.target.value)}>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </td>
                      <td>
                        <textarea className="textarea" rows={2} value={editMitigation} onChange={(e) => setEditMitigation(e.target.value)} />
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button className="btn btn-sm btn-primary" onClick={() => handleSaveEdit(risk.id!)}>
                            <Save size={12} />
                          </button>
                          <button className="btn btn-sm" onClick={() => setEditingId(null)}>
                            <X size={12} />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <AlertOctagon size={14} style={{ color: 'var(--red)', flexShrink: 0 }} />
                          <span style={{ fontWeight: 500 }}>{risk.description}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${getBadgeColor(risk.impact)}`}>{risk.impact}</span>
                      </td>
                      <td>
                        <span className={`badge ${getBadgeColor(risk.probability)}`}>{risk.probability}</span>
                      </td>
                      <td>
                        <span style={{ color: 'var(--text2)', fontSize: '0.85rem' }}>{risk.mitigation || 'No mitigation defined'}</span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button 
                            className="btn btn-sm" 
                            style={{ padding: '4px' }} 
                            onClick={() => handleStartEdit(risk)}
                            title="Edit Risk"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button 
                            className="btn btn-sm btn-danger" 
                            style={{ padding: '4px' }} 
                            onClick={() => onDeleteRisk(risk.id!)}
                            title="Delete Risk"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
            {risks.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text3)', padding: '24px' }}>
                  No active project risks logged.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
