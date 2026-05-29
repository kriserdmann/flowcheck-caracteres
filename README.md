# FlowCheck - Analisador de Histórico de Código Local

O **FlowCheck** é uma ferramenta de auditoria e métrica de código projetada especificamente para fins acadêmicos e educacionais. Ele nasceu da necessidade de professores analisarem a verdadeira jornada de desenvolvimento de um aluno ao longo de um projeto, evitando que códigos apenas copiados e colados passem despercebidos.

Em sua versão mais recente (Local Analyzer), o projeto é um ambiente **100% Client-Side e Serverless**, focado inteiramente na privacidade. Nenhum código de aluno, arquivo sensível ou histórico trafega para servidores externos ou banco de dados.


## 🚀 Como Funciona

Em vez de depender de integrações complexas do Git, o aplicativo aproveita os arquivos de backup gerados automaticamente por extensões editoriais comuns (como a pasta oculta **`.history`** frequentemente presente em workspaces modernos). O professor ou avaliador simplesmente arrasta a pasta inteira ou o `.zip` do projeto para dentro do Dashboard.

Em frações de segundo, todos os arquivos são vasculhados e o aplicativo reconstrói **exatamente** o que o aluno digitou, apagou, e quando o fez, rankeando o nível de esforço intelectual.


## 🌟 Principais Funcionalidades

- **Processamento 100% Local**: O app processa tudo na memória do navegador. 
- **Filtro de Descarte de Ruído (Normalização Álgebrica)**: O histórico dos alunos frequentemente é poluído quando o Prettier ou editor auto-formata o projeto. O FlowCheck foi projetado para descartar automaticamente qualquer etapa de histórico que seja configurada apenas por **espaços, recuos (indentação)** ou **inclusão/remoção de linhas vazias**, contando estatísticas exatas apenas sobre o código de verdade.
- **Debounce de Versões (Filtro de 30 Segundos)**: Como o VSCode pode salvar arquivos a cada tecla pressionada, a biblioteca do FlowCheck junta todas essas rajadas de eventos e só registra a evolução em janelas de 30 segundos, gerando um relatório limpo dos picos de codificação e evitando travamentos por milhares de arquivos minúsculos.
- **Top 5 Arquivos (Ranking de Esforço)**: Ele cataloga todos os arquivos e faz um rank automático dos que mais tiveram inclusão e exclusão de texto, poupando o professor de navegar em arquivos estáticos que não precisaram de revisão.
- **Leitura em Massa (.ZIP e Drag-And-Drop)**: Você pode soltar arquivos individuais, pastas brutas com subdiretórios ou um arquivo compactado zipado gigante de um aluno. A ferramenta descompacta tudo nativamente dentro da RAM graças à tecnologia JSZip.
- **Exportação (Download de Relatório HTML Standalone)**: Após validar as edições e dar uma nota, o Dashboard possui um botão letal de exportação. Ele gera um super arquivo HTML injetando toda a métrica processada, os arrays Json, o motor em modo JavaScript vanilla e toda a estrutura CSS encapsulada de CSS-em-JS num único item de kilobtyes! O professor pode anexar isso diretamente no SIGA/Ambiente Virtual da faculdade. Ele continua dinâmico mesmo hospedado offline.

## 🛠 Bibliotecas e Stacks Utilizadas

- **[Vite](https://vitejs.dev/) + React:** Estrutura rápida de desenvolvimento para Web.
- **[Diff](https://github.com/kpdecker/jsdiff):** O núcleo de processamento do repositório! Utilizado com flags restritas (`ignoreWhitespace`) para comparar dois estados de arquivo string do aluno com a mesma precisão de diffing real do Git, renderizado linha a linha.
- **[JSZip](https://stuk.github.io/jszip/):** Usado para injetar pastas Zip diretamente na camada da memória da aplicação do usuário, convertendo streams gigantes no mapa de objetos History sem gastar IO do File System original.
- **[Lucide-React](https://lucide.dev/):** Iconografia.

## 💻 Como Rodar o Projeto

Ter o [Node.js](https://nodejs.org/) instalado na máquina.

1. Clone o repositório:
```bash
git clone https://github.com/kriserdmann/flowcheck-local-analyzer.git
```

2. Acesse a pasta:
```bash
cd flowcheck-local-analyzer
```

3. Instale as dependências:
```bash
npm install
```

4. Suba o servidor de desenvolvimento:
```bash
npm run dev
```

5. O Navegador padrão vai abrir a plataforma pelo modo Servidor. Teste você primeiro, jogue um `.zip` do seu próprio código para acompanhar sua evolução de programação! 🎉
