import { Eye, FileSearch, Filter, ShieldCheck, Download } from 'lucide-react';

export function Instructions() {
  return (
    <div style={{ flex: 1, height: '100%', overflowY: 'auto', background: 'var(--bg-dark)', padding: '40px 48px' }}>
    <div className="instructions-container">
      <div className="instructions-header">
        <h1>Manual do Professor (FlowCheck)</h1>
        <p>Um guia sobre as configurações automáticas e de como analisar o verdadeiro esforço dos alunos usando a plataforma.</p>
      </div>

      <div className="instructions-content">
        
        <div className="alert-box">
          <div className="alert-icon"><ShieldCheck size={24} /></div>
          <div>
            <h3>Auditoria Serverless Segura</h3>
            <p>
              O FlowCheck roda 100% diretamente no seu navegador. Quando você arrasta uma pasta ou um arquivo <code>.zip</code>, o código fonte dos seus alunos nunca é enviado a um servidor remoto. Todo o processamento algorítmico, limpeza de dados e exportação ocorrem offline e usando a memória RAM da sua máquina.
            </p>
          </div>
        </div>

        <div className="instructions-card">
          <div className="card-header">
            <Filter size={20} color="var(--primary)" />
            <h2>O Filtro Algébrico (Inteligência contra Ruído)</h2>
          </div>
          <div className="card-body">
            <p>
              Não se preocupe se o aluno utilizar formatadores automáticos de código (como o Prettier). 
              A plataforma possui um sistema de detecção semântica invisível.
            </p>
            <ul>
              <li>O comparador descarta matematicamente qualquer etapa que contenha apenas mudanças de:</li>
              <li><strong>Indentação e espaços em branco.</strong></li>
              <li><strong>Adição ou remoção de linhas completamente vazias.</strong></li>
            </ul>
            <p className="card-note">Se o aluno gerar centenas de saves apenas quebrando as linhas no meio do texto ou salvando arquivos com espaços inúteis, o FlowCheck simplesmente excluirá essas tentativas e elas nem sequer aparecerão no Histórico final de avaliação ou nas pontuações do Dashboard.</p>
          </div>
        </div>

        <div className="instructions-card">
          <div className="card-header">
            <Eye size={20} color="var(--primary)" />
            <h2>Debounce (O Filtro de Tempo)</h2>
          </div>
          <div className="card-body">
            <p>
              O Autosave do VS Code pode salvar um passo literalmente para cada caractere "A, B, C" que o aluno digita.
            </p>
            <p style={{ marginTop: '8px' }}>
              Para impedir que você precise validar milhares de arquivos no Painel contendo apenas a adição de 1 única letra, nós agrupamos as mudanças. O FlowCheck une, comprime e consolida eventos que tenham menos de <strong>30 segundos</strong> de diferença em apenas uma aba robusta de diff, poupando seu tempo de validação e mostrando a verdadeira evolução funcional.
            </p>
          </div>
        </div>

        <div className="instructions-card">
          <div className="card-header">
            <FileSearch size={20} color="var(--primary)" />
            <h2>Como Analisar (Top 10 e Diff)</h2>
          </div>
          <div className="card-body">
            <p>
              Assim que o painel abrir, não olhe imediatamente todos os arquivos. Foque no menu <strong>TOP 10 MAIORES ALTERAÇÕES (⭐)</strong>. O software ranqueia automaticamente quais arquivos tiveram o maior volume de alterações em um curto espaço de tempo.
            </p>
            <p style={{ marginTop: '8px' }}>
              No visualizador (Diff Viewer) do painel principal, as cores significam o fluxo puro: 
              <span style={{ color: 'var(--diff-add-text)', fontWeight: 600 }}>Verde (+)</span> é o exato código construído do zero ou modificado com lógica matemática, enquanto <span style={{ color: 'var(--diff-rm-text)', fontWeight: 600 }}>Vermelho (-)</span> é um trecho logicamente superado, deletado ou substituído, ignorando formatações estéticas.
            </p>
          </div>
        </div>

        <div className="instructions-card">
          <div className="card-header">
            <Download size={20} color="var(--primary)" />
            <h2>Relatório Oficial e Exportação HTML</h2>
          </div>
          <div className="card-body">
            <p>
              Ao encerrar sua auditoria do código, você não deve salvar o zip local no seu computador.
            </p>
            <p style={{ marginTop: '8px' }}>
              Preencha o canto superior esquerdo com o nome, data e disciplina da avaliação. No fim, exporte clicando em <strong>Fazer Download do HTML</strong>. O FlowCheck empacotará magicamente todos os cálculos, cores e linhas auditadas deste aluno num arquivo html leve e executável em qualquer navegador. 
            </p>
          </div>
        </div>

      </div>
    </div>
    </div>
  )
}
