import { useState } from 'react';
import { ArrowLeft, FileCode2, Save, Loader2, CheckCircle2, Activity, RotateCcw, Download } from 'lucide-react';
import { generateDashboardHTML } from '../utils/exportHtml';

export function Dashboard({ data, onReset }) {
  const { top_5, historyCompleto } = data;
  const [activeVersion, setActiveVersion] = useState(
    top_5 && top_5.length > 0 ? top_5[0] : null
  );

  // Form State
  const [studentName, setStudentName] = useState('');
  const [classNameUrl, setClassNameUrl] = useState('');
  const [evaluationName, setEvaluationName] = useState('');
  const [applicationDate, setApplicationDate] = useState(new Date().toISOString().split('T')[0]);
  const [uc, setUc] = useState('');
  const [professorName, setProfessorName] = useState('');
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSelectVersion = (v) => {
    setActiveVersion(v);
  };

  const handleDownloadHTML = () => {
    if (!studentName || !classNameUrl || !evaluationName || !applicationDate || !uc || !professorName) {
      alert("Preencha todos os campos da avaliação antes de baixar o relatório.");
      return;
    }

    setIsSaving(true);
    
    try {
      const meta = { studentName, classNameUrl, evaluationName, applicationDate, uc, professorName };
      const htmlContent = generateDashboardHTML(data, meta);

      // Trigger download
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `FlowCheck_${studentName.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'relatorio'}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error generating HTML:', error);
      alert('Erro ao gerar o arquivo HTML.');
    } finally {
      setIsSaving(false);
    }
  };

  const getBorderStyle = (v) => {
    const cps = v.cps || 0;
    const adicoes = v.adicoes || 0;
    
    if (cps > 10 || adicoes > 300) {
      return { border: '2px solid #ef4444' };
    }
    if (cps > 3 || adicoes > 50) {
      return { border: '2px solid #eab308' };
    }
    return {};
  };

  const activeId = activeVersion ? activeVersion.id : null;

  return (
    <div className="dashboard-container">
      {/* Sidebar Tools */}
      <div className="dashboard-sidebar">
        <div className="dashboard-sidebar-header">
          <h2 style={{ fontSize: '18px', margin: 0, fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity color="var(--primary)" size={18} /> FlowCheck
          </h2>
          <button onClick={onReset} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }} title="Página Inicial">
            <RotateCcw size={18} />
          </button>
        </div>

        <div className="dashboard-sidebar-content">
          
          {/* Save Panel Setup */}
          <div className="save-panel">
            <h3 className="save-panel-title">Baixar Relatório (HTML)</h3>
            <div className="save-panel-form">
              <input 
                type="text" 
                className="save-panel-input"
                placeholder="Nome da Avaliação (Ex: Prova 1)" 
                value={evaluationName}
                onChange={e => setEvaluationName(e.target.value)}
              />
              <div className="save-panel-row">
                <input 
                  type="date" 
                  className="save-panel-input"
                  value={applicationDate}
                  onChange={e => setApplicationDate(e.target.value)}
                />
                <input 
                  type="text" 
                  className="save-panel-input"
                  placeholder="UC (Disciplina)" 
                  value={uc}
                  onChange={e => setUc(e.target.value)}
                />
              </div>
              <input 
                type="text" 
                className="save-panel-input"
                placeholder="Professor" 
                value={professorName}
                onChange={e => setProfessorName(e.target.value)}
              />
              <div className="save-panel-row">
                <input 
                  type="text" 
                  className="save-panel-input"
                  placeholder="Nome do Aluno" 
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  style={{ flex: 2 }}
                />
                <input 
                  type="text" 
                  className="save-panel-input"
                  placeholder="Turma" 
                  value={classNameUrl}
                  onChange={e => setClassNameUrl(e.target.value)}
                  style={{ flex: 1 }}
                />
              </div>
              
              <button 
                onClick={handleDownloadHTML}
                disabled={isSaving}
                className="save-panel-btn"
                style={{
                  backgroundColor: saveSuccess ? 'var(--diff-add-bg)' : 'var(--primary)', 
                  color: saveSuccess ? 'var(--diff-add-text)' : '#000', 
                  cursor: isSaving ? 'wait' : 'pointer'
                }}
              >
                {isSaving ? <Loader2 size={16} className="spin" /> : saveSuccess ? <CheckCircle2 size={16} /> : <Download size={16} />}
                {isSaving ? 'Gerando...' : saveSuccess ? 'Baixado com sucesso!' : 'Fazer Download do HTML'}
              </button>
            </div>
          </div>

          {/* Top 10 Section */}
          {top_5 && top_5.length > 0 && (
            <>
              <div className="section-title">⭐ TOP 10 MAIORES ALTERAÇÕES</div>
              {top_5.map((v) => (
                <div 
                  key={`top_${v.id}`} 
                  className={`version-item top-item ${activeId === v.id ? 'active' : ''}`}
                  onClick={() => handleSelectVersion(v)}
                  style={getBorderStyle(v)}
                >
                  <div className="version-meta">
                    <span style={{fontWeight: 600, color: 'var(--primary)', wordBreak: 'break-all'}}>{v.nome_arquivo}</span>
                  </div>
                  <div className="version-meta">
                    <span className="version-time">{new Date(v.data).toLocaleTimeString()}</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span className="add">{(v.cps || 0).toFixed(2)} c/s</span>
                      <span className="add">+{v.adicoes} caracteres</span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Full History Section */}
          <div className="section-title" style={top_5?.length > 0 ? {marginTop: '24px'} : {}}>📁 HISTÓRICO COMPLETO</div>
          
          {historyCompleto && Object.entries(historyCompleto).map(([fileKey, fileData]) => (
            <div key={`file_${fileKey}`}>
              <div className="file-title">{fileData.nomeResumo}</div>
              {fileData.versoes.map(v => (
                <div 
                  key={`hist_${v.id}`}
                  className={`version-item ${activeId === v.id ? 'active' : ''}`}
                  onClick={() => handleSelectVersion(v)}
                  style={getBorderStyle(v)}
                >
                  <div className="version-meta">
                    <span className="version-time">{new Date(v.data).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})} ({new Date(v.data).toLocaleDateString()})</span>
                  </div>
                  {v.diff_content ? (
                    <div className="stats">
                      <span className="add">{(v.cps || 0).toFixed(2)} c/s</span>
                      <span className="add">+{v.adicoes}</span>
                      <span className="rem">-{v.remocoes}</span>
                    </div>
                  ) : (
                    <div className="stats"><span style={{color: 'var(--text-muted)'}}>Criação Original</span></div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content (Diff Viewer) */}
      <div className="dashboard-main">
        <div className="dashboard-main-header">
          {activeVersion ? (
            <>
              <h1 style={{ fontSize: '20px', marginBottom: '4px' }}>{activeVersion.nome_arquivo}</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Salvo em: {new Date(activeVersion.data).toLocaleString()}</p>
            </>
          ) : (
            <h1 style={{ fontSize: '20px' }}>Nenhuma versão selecionada</h1>
          )}
        </div>
        
        <div className="dashboard-diff-viewer">
          {activeVersion ? (
            activeVersion.diff_content ? (
              <pre className="diff-pre">
                {activeVersion.diff_content.map((part, index) => {
                  if (!part.value) return null;
                  
                  // Split the value by newlines, keeping empty lines so they render correctly
                  const lines = part.value.split('\n');
                  
                  // Remove the last empty string if it's just a trailing newline
                  if (lines[lines.length - 1] === '') {
                    lines.pop();
                  }

                  return lines.map((line, lineIndex) => {
                    let className = 'diff-line ';
                    let prefix = '  ';
                    
                    if (part.added) {
                      className += 'added';
                      prefix = '+ ';
                    } else if (part.removed) {
                      className += 'removed';
                      prefix = '- ';
                    }

                    return (
                      <span key={`${index}-${lineIndex}`} className={className}>
                        {prefix}{line}{'\n'}
                      </span>
                    );
                  });
                })}
              </pre>
            ) : (
              <pre className="diff-pre">
                {activeVersion.codigo}
              </pre>
            )
          ) : (
            <div className="diff-empty">
              <FileCode2 size={64} />
              <p>Selecione um item no menu lateral para visualizar o código.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
