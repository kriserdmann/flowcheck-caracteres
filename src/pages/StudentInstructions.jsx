import { AlertTriangle, Download, FolderArchive, SaveAll } from 'lucide-react';

export function StudentInstructions() {
  return (
    <div style={{ flex: 1, height: '100%', overflowY: 'auto', background: 'var(--bg-dark)', padding: '40px 48px' }}>
    <div className="instructions-container">
      <div className="instructions-header">
        <h1>Modelo: Orientações para os Alunos</h1>
        <p>Utilize este material como base para anexar aos editais e regras das suas avaliações. Ele contém os pré-requisitos exatos para que a plataforma funcione.</p>
      </div>

      <div className="instructions-content">
        
        <div className="alert-box critical">
          <div className="alert-icon"><AlertTriangle size={24} /></div>
          <div>
            <h3>⚠️ INSTRUÇÕES OBRIGATÓRIAS DE ENTREGA ⚠️</h3>
            <p>
              Instale a extensão <strong>Local History</strong> (publicada por xyz) no seu VS Code. 
              Certifique-se de habilitar a opção de <strong>Salvamento Automático (Auto Save)</strong> do VS Code. 
              Ao submeter a sua avaliação, você deve enviar o arquivo <strong>.zip</strong> do projeto contendo obrigatoriamente a pasta <strong>.history</strong> (gerada automaticamente pela extensão).
            </p>
            <p className="alert-highlight">
              <strong>Atenção:</strong> Caso não siga estas instruções ou entregue o arquivo .zip sem a pasta .history, será considerado entrega fora do padrão exigido, acarretando em nota zero.
            </p>
          </div>
        </div>

        <div className="instructions-card">
          <div className="card-header">
            <SaveAll size={20} color="var(--primary)" />
            <h2>Passo 1: Preparação no VS Code</h2>
          </div>
          <div className="card-body">
            <ol>
              <li>Abra o VS Code e vá na aba de <strong>Extensões</strong> ou pressione <code>Ctrl+Shift+X</code>.</li>
              <li>Pesquise pela extensão e clique em instalar <strong>Local History</strong>.</li>
              <li>Vá no menu superior esquerdo em <strong>Arquivo (File)</strong> &gt; <strong>Auto Save (Salvar Automaticamente)</strong> e certifique-se de que ele está ativado (marcado com um ✓).</li>
            </ol>
            <p className="card-note">Isso garantirá que cada pequena alteração de código que você escreva fique cronologicamente arquivada na linha do tempo oculta do seu projeto, sem que você precise sequer salvar manualmente.</p>
          </div>
        </div>

        <div className="instructions-card">
          <div className="card-header">
            <FolderArchive size={20} color="var(--primary)" />
            <h2>Passo 2: Entrega Técnica Formato (.ZIP)</h2>
          </div>
          <div className="card-body">
            <p>
              Quando você terminar o seu trabalho e testar que seu aplicativo funciona localmente, você deverá compactar o projeto <strong>inteiro</strong> em uma pasta enviável. A sua entrega deve conter incondicionalmente o arquivo oculto de versionamento.
            </p>
            <div className="format-box">
              <span style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Formato Final de Envio:</span><br/>
              Arquivo <code>.zip</code> completo (contendo todos os arquivos do código fonte do site <strong>E</strong> a pasta <code>.history</code> na raiz).
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
