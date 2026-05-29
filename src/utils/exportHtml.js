const cssContent = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;&display=swap');

:root {
  font-family: 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #121212;

  --bg-dark: #121212;
  --bg-card: #1e1e1e;
  --bg-hover: #2d2d2d;
  --bg-active: #37373d;
  
  --primary: #4fc1ff;
  --primary-hover: #007acc;
  --primary-transparent: rgba(79, 193, 255, 0.1);

  --accent: #ffd700;
  
  --text-main: rgba(255, 255, 255, 0.87);
  --text-muted: rgba(255, 255, 255, 0.6);

  --border: #333333;
  
  --diff-add-bg: rgba(46, 160, 67, 0.15);
  --diff-add-text: #3fb950;
  --diff-rm-bg: rgba(248, 81, 73, 0.15);
  --diff-rm-text: #f85149;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  display: flex;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: var(--bg-dark);
}

h1, h2, h3, h4 {
  font-weight: 600;
  color: #fff;
}

/* Scrollbar customization */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: var(--bg-dark); 
}
::-webkit-scrollbar-thumb {
  background: #555; 
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #777; 
}
#root {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-container {
  display: flex;
  height: 100%;
  width: 100%;
}

.app-main-wrapper {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.app-content-area {
  flex: 1;
  display: flex;
  overflow: hidden;
  height: 100%;
}

@media (max-width: 768px) {
  .app-main-wrapper {
    flex-direction: column;
  }
  
  .app-content-area {
    width: 100%;
    /* Remaining height after mobile nav */
    flex: 1;
  }
}

.dropzone-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  border: 2px dashed var(--border);
  border-radius: 12px;
  background-color: var(--bg-card);
  margin: 40px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.dropzone-container.drag-active {
  border-color: var(--primary);
  background-color: var(--primary-transparent);
}

.dropzone-icon {
  width: 64px;
  height: 64px;
  color: var(--primary);
  margin-bottom: 24px;
}

.dropzone-title {
  font-size: 24px;
  margin-bottom: 8px;
}

.dropzone-subtitle {
  color: var(--text-muted);
  font-size: 14px;
}

.dashboard-container {
  display: flex;
  width: 100%;
  height: 100%;
}

.sidebar {
  width: 380px;
  background-color: var(--bg-card);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid var(--border);
}

.sidebar-header h2 {
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
}

.section-title {
  color: var(--accent);
  font-weight: 600;
  border-bottom: 2px solid var(--accent);
  margin: 20px 0 10px 0;
  padding-bottom: 5px;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.5px;
}

.section-title:first-child {
  margin-top: 0;
}

.file-title {
  color: var(--primary);
  font-weight: 600;
  border-bottom: 1px solid var(--border);
  margin: 15px 0 8px 0;
  padding-bottom: 4px;
  font-size: 13px;
  word-break: break-all;
}

.version-item {
  padding: 10px 12px;
  cursor: pointer;
  font-size: 12px;
  background-color: var(--bg-dark);
  margin-bottom: 6px;
  border: 1px solid var(--border);
  border-radius: 6px;
  transition: all 0.15s ease;
}

.version-item:hover {
  background-color: var(--bg-hover);
  border-color: #555;
}

.version-item.active {
  background-color: var(--primary-transparent);
  border-color: var(--primary);
}

.version-item.top-item {
  border-left: 4px solid var(--accent);
  background-color: rgba(255, 215, 0, 0.05);
}

.version-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.version-time {
  font-weight: 500;
  color: var(--text-main);
}

.stats {
  font-size: 11px;
  display: flex;
  gap: 8px;
}

.stats .add {
  color: var(--diff-add-text);
  font-weight: 600;
}

.stats .rem {
  color: var(--diff-rm-text);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-dark);
  overflow: hidden;
}

.content-header {
  padding: 20px;
  border-bottom: 1px solid var(--border);
  background-color: var(--bg-card);
}

.content-header h1 {
  font-size: 20px;
  margin-bottom: 4px;
}

.content-header p {
  color: var(--text-muted);
  font-size: 13px;
}

.diff-viewer {
  flex: 1;
  overflow: auto;
  padding: 20px;
}

.diff-pre {
  background-color: #0d1117;
  padding: 20px;
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  color: #c9d1d9;
  line-height: 1.6;
  white-space: pre;
  border: 1px solid var(--border);
  margin: 0;
}

.diff-line {
  display: block;
  padding: 0 4px;
}

.diff-line.added {
  background-color: var(--diff-add-bg);
  color: var(--diff-add-text);
}

.diff-line.removed {
  background-color: var(--diff-rm-bg);
  color: var(--diff-rm-text);
}

.diff-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-muted);
}

.diff-empty svg {
  margin-bottom: 16px;
  opacity: 0.5;
}

/* Dashboard Responsive Styles */
.dashboard-sidebar {
  width: 400px;
  background-color: var(--bg-card);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.dashboard-sidebar-header {
  padding: 20px;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-sidebar-content {
  padding: 20px;
  flex: 1;
  overflow-y: auto;
}

.dashboard-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-dark);
  overflow: hidden;
}

.dashboard-main-header {
  padding: 20px;
  border-bottom: 1px solid var(--border);
  background-color: var(--bg-card);
}

.dashboard-diff-viewer {
  flex: 1;
  overflow: auto;
  padding: 20px;
}

.save-panel {
  background-color: var(--bg-dark);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--border);
  margin-bottom: 24px;
}

.save-panel-title {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: var(--text-main);
}

.save-panel-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.save-panel-input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid var(--border);
  background-color: var(--bg-card);
  color: #fff;
  font-size: 13px;
  width: 100%;
}

.save-panel-row {
  display: flex;
  gap: 8px;
  width: 100%;
}

.save-panel-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  font-size: 13px;
  transition: all 0.2s;
  margin-top: 4px;
}

@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
  }
  
  .dashboard-sidebar {
    width: 100%;
    height: 40vh; /* Takes top portion of the screen */
    border-right: none;
    border-bottom: 2px solid var(--primary);
  }
  
  .dashboard-main {
    height: 60vh; /* Takes bottom portion */
  }
  
  .save-panel-row {
    flex-direction: column;
  }
  
  .evaluations-grid {
    grid-template-columns: 1fr;
  }
}

.evaluations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 16px;
}
/* Sidebar Responsive Styles */
.app-sidebar {
  width: 260px;
  height: 100vh;
  background-color: var(--bg-card);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 24px 24px 40px 24px;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
}

.sidebar-nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  text-decoration: none;
  color: var(--text-main);
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  margin-bottom: 8px;
}

.sidebar-nav-item.active {
  color: var(--primary);
  background-color: var(--primary-transparent);
  font-weight: 600;
}

.sidebar-nav-item:hover:not(.active) {
  background-color: var(--bg-hover);
}

.sidebar-footer {
  margin-top: auto;
  border-top: 1px solid var(--border);
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sidebar-logout {
  display: flex;
  align-items: center;
  gap: 12px;
  background: none;
  border: none;
  color: var(--diff-rm-text);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  padding: 12px 16px;
  border-radius: 8px;
  text-align: left;
  transition: background 0.2s;
  width: 100%;
}

.sidebar-logout:hover {
  background-color: rgba(248, 81, 73, 0.1);
}

@media (max-width: 768px) {
  .app-sidebar {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
  
  .sidebar-logo {
    padding: 16px;
    margin-bottom: 0;
  }
  
  .sidebar-nav {
    flex-direction: row;
    overflow-x: auto;
    padding: 0 16px 16px 16px;
    gap: 8px;
    /* Hide scrollbar for a cleaner look */
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .sidebar-nav::-webkit-scrollbar {
    display: none;
  }
  
  .sidebar-nav-item {
    margin-bottom: 0;
    white-space: nowrap;
  }
  
  .sidebar-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
  }
  
  .sidebar-logout {
    width: auto;
    padding: 8px 12px;
  }
}
`;

export function generateDashboardHTML(data, meta) {
  const { top_5, historyCompleto } = data;
  const { studentName, classNameUrl, evaluationName, applicationDate, uc, professorName } = meta;

  const escapeHtml = (unsafe) => {
    if (!unsafe) return '';
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };

  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FlowCheck - ${escapeHtml(studentName)}</title>
  <style>
    ${cssContent}
    html, body { margin: 0 !important; padding: 0 !important; width: 100vw; height: 100%; overflow: hidden !important; background-color: var(--bg-dark); }
    .dashboard-container { position: fixed !important; top: 0; left: 0; right: 0; bottom: 0; width: 100vw; height: 100%; display: flex !important; flex-direction: row !important; overflow: hidden !important; }
    .dashboard-sidebar { width: 350px !important; min-width: 350px !important; height: 100% !important; display: flex !important; flex-direction: column !important; overflow: hidden !important; background: var(--bg-card); z-index: 10; }
    .dashboard-sidebar-content { flex: 1 !important; overflow-y: auto !important; overflow-x: hidden !important; padding: 15px; }
    .dashboard-main { flex: 1 !important; height: 100% !important; display: flex !important; flex-direction: column !important; overflow: hidden !important; background: var(--bg-dark); }
    .dashboard-diff-viewer { flex: 1 !important; overflow-y: auto !important; padding: 20px; }
    .save-panel { padding: 15px; margin-bottom: 20px; background: var(--bg-card); border-radius: 8px; border: 1px solid var(--border); flex-shrink: 0; }
    .meta-item { display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 13px; color: var(--text-main); border-bottom: 1px solid var(--border); padding-bottom: 4px; }
    .meta-label { font-weight: 600; color: var(--primary); }
    .diff-empty svg { opacity: 0.5; stroke: currentColor; }
  </style>
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <div class="dashboard-sidebar">
      <div class="dashboard-sidebar-header">
        <h2 style="font-size: 18px; margin: 0; font-weight: 600; color: var(--text-main); display: flex; align-items: center; gap: 8px;">
          <i data-lucide="activity" style="color: var(--primary); width: 18px; height: 18px;"></i> FlowCheck
        </h2>
      </div>
      <div class="dashboard-sidebar-content">
        <div class="save-panel">
          <h3 style="margin-top: 0; margin-bottom: 10px; font-size: 14px; text-transform: uppercase; color: var(--text-muted);">Informações</h3>
          <div class="meta-item"><span class="meta-label">Aluno</span> <span>${escapeHtml(studentName)}</span></div>
          <div class="meta-item"><span class="meta-label">Data</span> <span>${escapeHtml(applicationDate)}</span></div>
          <div class="meta-item"><span class="meta-label">Avaliação</span> <span>${escapeHtml(evaluationName)}</span></div>
          <div class="meta-item"><span class="meta-label">Turma</span> <span>${escapeHtml(classNameUrl)}</span></div>
          <div class="meta-item"><span class="meta-label">UC</span> <span>${escapeHtml(uc)}</span></div>
          <div class="meta-item"><span class="meta-label" style="border-bottom: none;">Professor</span> <span>${escapeHtml(professorName)}</span></div>
        </div>

        <div id="sidebar-lists"></div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="dashboard-main">
      <div class="dashboard-main-header" id="main-header">
        <h1 style="font-size: 20px; margin-bottom: 4px;">Nenhuma versão selecionada</h1>
        <p style="color: var(--text-muted); font-size: 13px; margin: 0;"></p>
      </div>
      
      <div class="dashboard-diff-viewer" id="main-diff">
        <div class="diff-empty">
          <i data-lucide="file-code-2" style="width: 64px; height: 64px;"></i>
          <p>Selecione um item no menu lateral para visualizar o código.</p>
        </div>
      </div>
    </div>
  </div>

  <script type="application/json" id="embedded-data">
    ${JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e')}
  </script>

  <script>
    // Load Injected Data
    const rawData = document.getElementById('embedded-data').textContent;
    const data = JSON.parse(rawData);
    const { top_5, historyCompleto } = data;

    // Elements
    const listsContainer = document.getElementById('sidebar-lists');
    const mainHeader = document.getElementById('main-header');
    const mainDiff = document.getElementById('main-diff');
    let activeId = null;
    let allVersionsMap = {};

    // Build map for quick access
    if (top_5) {
      top_5.forEach(v => allVersionsMap[v.id] = v);
    }
    if (historyCompleto) {
      Object.entries(historyCompleto).forEach(([key, fileData]) => {
        fileData.versoes.forEach(v => allVersionsMap[v.id] = v);
      });
    }

    // Render Sidebar
    let sidebarHtml = '';

    // Top 10
    if (top_5 && top_5.length > 0) {
      sidebarHtml += '<div class="section-title">⭐ TOP 10 MAIORES ALTERAÇÕES</div>';
      top_5.forEach(v => {
        const timeStr = new Date(v.data).toLocaleTimeString();
        sidebarHtml += \`
          <div class="version-item top-item \${activeId === v.id ? 'active' : ''}" onclick="window.selectVersion('\${v.id}')" id="sb-\${v.id}">
            <div class="version-meta">
              <span style="font-weight: 600; color: var(--primary); word-break: break-all;">\${escapeHtml(v.nome_arquivo)}</span>
            </div>
            <div class="version-meta">
              <span class="version-time">\${timeStr}</span>
              <span class="add">+\${v.adicoes} caracteres</span>
            </div>
          </div>
        \`;
      });
    }

    // History
    if (historyCompleto) {
      sidebarHtml += '<div class="section-title" style="margin-top: 24px;">📁 HISTÓRICO COMPLETO</div>';
      Object.entries(historyCompleto).forEach(([key, fileData]) => {
        sidebarHtml += \`<div class="file-title">\${escapeHtml(fileData.nomeResumo)}</div>\`;
        fileData.versoes.forEach(v => {
          const timeStr = new Date(v.data).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
          const dateStr = new Date(v.data).toLocaleDateString();
          const statsHtml = v.diff_content 
            ? \`<div class="stats"><span class="add">+\${v.adicoes}</span><span class="rem">-\${v.remocoes}</span></div>\`
            : \`<div class="stats"><span style="color: var(--text-muted)">Criação Original</span></div>\`;

          sidebarHtml += \`
            <div class="version-item \${activeId === v.id ? 'active' : ''}" onclick="window.selectVersion('\${v.id}')" id="sb-\${v.id}">
              <div class="version-meta">
                <span class="version-time">\${timeStr} (\${dateStr})</span>
              </div>
              \${statsHtml}
            </div>
          \`;
        });
      });
    }
    listsContainer.innerHTML = sidebarHtml;

    // Render Diff Function
    window.selectVersion = function(id) {
      // update active class
      if (activeId) {
        const oldActive = document.querySelectorAll('#sb-' + activeId);
        oldActive.forEach(el => el.classList.remove('active'));
      }
      activeId = id;
      const newActive = document.querySelectorAll('#sb-' + id);
      newActive.forEach(el => el.classList.add('active'));

      const v = allVersionsMap[id];
      if (!v) return;

      // Update header
      mainHeader.innerHTML = \`
        <h1 style="font-size: 20px; margin-bottom: 4px;">\${escapeHtml(v.nome_arquivo)}</h1>
        <p style="color: var(--text-muted); font-size: 13px; margin: 0;">Salvo em: \${new Date(v.data).toLocaleString()}</p>
      \`;

      // Update diff viewer
      if (v.diff_content) {
        let diffHtml = '';
        v.diff_content.forEach(part => {
          if (!part.value) return;
          const lines = part.value.split('\\n');
          if (lines[lines.length - 1] === '') lines.pop(); // remove trailing

          lines.forEach(line => {
            let className = 'diff-line ';
            let prefix = '  ';
            if (part.added) { className += 'added'; prefix = '+ '; }
            else if (part.removed) { className += 'removed'; prefix = '- '; }

            diffHtml += \`<span class="\${className}">\${prefix}\${escapeHtml(line)}\\n</span>\`;
          });
        });
        mainDiff.innerHTML = \`<pre class="diff-pre">\${diffHtml}</pre>\`;
      } else {
        mainDiff.innerHTML = \`<pre class="diff-pre">\${escapeHtml(v.codigo)}</pre>\`;
      }
    };

    function escapeHtml(unsafe) {
      if (!unsafe) return '';
      return String(unsafe).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    // initialize icons
    lucide.createIcons();

    // select first automatically
    if (top_5 && top_5.length > 0) {
      window.selectVersion(top_5[0].id);
    }
  </script>
</body>
</html>
`;
  return html;
}
