import { ShieldAlert, FileSearch, HelpCircle, BookOpen } from 'lucide-react';

export function Sidebar({ activeTab, setActiveTab }) {
  const handleReload = () => {
    if (activeTab === 'analyzer') {
      window.location.reload();
    } else {
      setActiveTab('analyzer');
    }
  };

  return (
    <div className="app-sidebar">
      <div className="sidebar-logo">
        <ShieldAlert color="var(--primary)" size={28} />
        <h2 style={{ fontSize: '18px', margin: 0, color: 'var(--text-main)' }}>FlowCheck</h2>
      </div>

      <nav className="sidebar-nav">
        <div 
          className={`sidebar-nav-item ${activeTab === 'analyzer' ? 'active' : ''}`} 
          style={{ cursor: 'pointer' }} 
          onClick={handleReload}
        >
          <FileSearch size={18} /> Nova Revisão
        </div>
        <div 
          className={`sidebar-nav-item ${activeTab === 'instructions' ? 'active' : ''}`} 
          style={{ cursor: 'pointer' }} 
          onClick={() => setActiveTab('instructions')}
        >
          <HelpCircle size={18} /> Como Usar (Professor)
        </div>
        <div 
          className={`sidebar-nav-item ${activeTab === 'student-instructions' ? 'active' : ''}`} 
          style={{ cursor: 'pointer' }} 
          onClick={() => setActiveTab('student-instructions')}
        >
          <BookOpen size={18} /> Avisos aos Alunos
        </div>
      </nav>

      <div className="sidebar-footer" style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>
          Desenvolvido por<br />Kristian Erdmann e Vinícius M. J. Trindade
        </p>
      </div>
    </div>
  );
}
