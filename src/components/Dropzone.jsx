import { useState, useCallback, useRef } from 'react';
import { UploadCloud, Loader2 } from 'lucide-react';
import { parseHistoryFolder, parseHistoryZip } from '../utils/historyParser';

export function Dropzone({ onAnalyzeComplete }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    if (!isLoading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsLoading(true);
    try {
      if (file.type === 'application/zip' || file.name.endsWith('.zip')) {
        const result = await parseHistoryZip(file);
        onAnalyzeComplete(result);
      } else {
        alert("Por favor, selecione um arquivo .zip.");
      }
    } catch (error) {
      console.error("Erro ao analisar arquivo:", error);
      alert("Ocorreu um erro ao analisar o arquivo. Verifique o console.");
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const items = e.dataTransfer.items;
    if (!items || items.length === 0) return;

    let rootEntries = [];
    let zipFile = null;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (file && (file.type === 'application/zip' || file.name.endsWith('.zip'))) {
          zipFile = file;
          break;
        }
        
        const entry = item.webkitGetAsEntry();
        if (entry && entry.isDirectory) {
          rootEntries.push(entry);
        }
      }
    }

    if (!zipFile && rootEntries.length === 0) {
      alert("Por favor, solte uma pasta do projeto ou um arquivo .zip contendo o projeto.");
      return;
    }

    setIsLoading(true);
    try {
      let result;
      if (zipFile) {
        result = await parseHistoryZip(zipFile);
      } else {
        result = await parseHistoryFolder(rootEntries);
      }
      onAnalyzeComplete(result);
    } catch (error) {
      console.error("Erro ao analisar:", error);
      alert("Ocorreu um erro ao analisar os arquivos. Verifique o console.");
    } finally {
      setIsLoading(false);
    }
  }, [onAnalyzeComplete]);

  return (
    <div 
      className={`dropzone-container ${isDragActive ? 'drag-active' : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        accept=".zip,application/zip" 
        onChange={handleFileChange} 
      />
      {isLoading ? (
        <Loader2 className="dropzone-icon" width={64} height={64} style={{ animation: 'spin 2s linear infinite' }} />
      ) : (
        <UploadCloud className="dropzone-icon" width={64} height={64} />
      )}
      <h2 className="dropzone-title">
        {isLoading ? 'Analisando histórico local...' : 'Solte a pasta (.history) ou clique e selecione um .ZIP'}
      </h2>
      <p className="dropzone-subtitle">
        {isLoading ? 'Isso pode levar alguns segundos dependendo do tamanho do projeto.' : 'O sistema irá buscar todas as pastas .history, descompactar o ZIP automaticamente e gerar o relatório do FlowCheck.'}
      </p>
    </div>
  );
}
