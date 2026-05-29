import * as Diff from 'diff';
import JSZip from 'jszip';
const readAllEntries = async (dirReader) => {
  let entries = [];
  let readResult = await new Promise((resolve) => dirReader.readEntries(resolve));
  while (readResult.length > 0) {
    entries.push(...readResult);
    readResult = await new Promise((resolve) => dirReader.readEntries(resolve));
  }
  return entries;
};

const traverseDirectory = async (entry, path = '') => {
  const result = [];
  if (entry.isFile) {
    result.push({ entry, path: path + entry.name, directory: path });
  } else if (entry.isDirectory) {
    const dirReader = entry.createReader();
    const entries = await readAllEntries(dirReader);
    for (const child of entries) {
      result.push(...await traverseDirectory(child, path + entry.name + '/'));
    }
  }
  return result;
};

const readFileAsText = (fileEntry) => {
  return new Promise((resolve, reject) => {
    fileEntry.file((file) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  });
};

export const parseHistoryFolder = async (folderEntries) => {
  const entriesArray = Array.isArray(folderEntries) ? folderEntries : [folderEntries];
  let allFiles = [];
  for (const entry of entriesArray) {
    allFiles = allFiles.concat(await traverseDirectory(entry, entry.name + '/'));
  }
  
  const jsonFiles = allFiles.filter(f => f.entry.name === 'entries.json');
  
  const filesMap = {};

  for (const jsonItem of jsonFiles) {
    try {
      const content = await readFileAsText(jsonItem.entry);
      const data = JSON.parse(content);
      
      const resourceName = data.resource || 'Desconhecido';
      // Format a nice display name from the resource (e.g. src/app.js)
      const decodedResource = decodeURIComponent(resourceName.replace('file:///', ''));
      const parts = decodedResource.split('/');
      const nomeResumo = parts.slice(Math.max(parts.length - 3, 0)).join('/');
      
      const fileKey = jsonItem.path; // Unique path guarantees we don't mix different students' files
      
      if (!filesMap[fileKey]) {
        filesMap[fileKey] = {
           nomeResumo: nomeResumo,
           versoes: []
        };
      }

      // Find sibling files in the same directory
      const directoryFiles = allFiles.filter(f => f.directory === jsonItem.directory);

      for (const entry of data.entries || []) {
        const backupFile = directoryFiles.find(f => f.entry.name === entry.id || f.entry.name === entry.id + '.js' || f.entry.name === entry.id + '.html');
        if (backupFile) {
          const codeBody = await readFileAsText(backupFile.entry);
          filesMap[fileKey].versoes.push({
            data: new Date(entry.timestamp),
            codigo: codeBody,
            id: entry.id,
            nome_arquivo: nomeResumo,
            fileKey: fileKey
          });
        }
      }
    } catch (e) {
      console.error('Error parsing entries.json in', jsonItem.path, e);
    }
  }

  // Handle format generated directly as filename_YYYYMMDDHHMMSS.ext
  const regexType2 = /^(.+)_(\d{14})(?:\.([^.]+))?$/;
  
  for (const f of allFiles) {
    if (f.entry.name === 'entries.json') continue;
    
    const match = f.entry.name.match(regexType2);
    if (match) {
      const baseName = match[1];
      const timestampStr = match[2];
      const extStr = match[3];
      const ext = extStr ? `.${extStr}` : '';
      const originalName = `${baseName}${ext}`;

      const rawDir = f.directory || '';
      const cleanDir = rawDir.replace(/[/\\]$/, '');
      
      let nomeResumo = originalName;
      if (cleanDir) {
         const parts = cleanDir.split('/');
         // Avoid just showing .history if possible
         if (parts.length > 1 && parts[parts.length - 1] === '.history') {
             nomeResumo = `${parts[parts.length - 2]}/${originalName}`;
         } else {
             nomeResumo = `${cleanDir}/${originalName}`;
         }
      }
      
      const fileKey = `type2_${cleanDir}/${originalName}`;
      
      if (!filesMap[fileKey]) {
        filesMap[fileKey] = {
           nomeResumo: nomeResumo,
           versoes: []
        };
      }

      const year = parseInt(timestampStr.substring(0, 4), 10);
      const month = parseInt(timestampStr.substring(4, 6), 10) - 1;
      const day = parseInt(timestampStr.substring(6, 8), 10);
      const hour = parseInt(timestampStr.substring(8, 10), 10);
      const minute = parseInt(timestampStr.substring(10, 12), 10);
      const second = parseInt(timestampStr.substring(12, 14), 10);
      const dateObj = new Date(year, month, day, hour, minute, second);

      try {
        const codeBody = await readFileAsText(f.entry);
        filesMap[fileKey].versoes.push({
          data: dateObj,
          codigo: codeBody,
          id: f.entry.name,
          nome_arquivo: nomeResumo,
          fileKey: fileKey
        });
      } catch (e) {
        console.error('Error reading history file', f.path, e);
      }
    }
  }

  return processFilesMap(filesMap);
};

export const parseHistoryZip = async (zipFile) => {
  const zip = new JSZip();
  const loadedZip = await zip.loadAsync(zipFile);
  const filesMap = {};
  
  const allFiles = Object.values(loadedZip.files).filter(f => !f.dir);
  const jsonFiles = allFiles.filter(f => f.name.endsWith('entries.json') && f.name.includes('.history'));
  
  const regexType2 = /^(.+)_(\d{14})(?:\.([^.]+))?$/;
  
  // 1. Process entries.json files
  for (const jsonItem of jsonFiles) {
    try {
      const content = await jsonItem.async('text');
      const data = JSON.parse(content);
      
      const resourceName = data.resource || 'Desconhecido';
      const decodedResource = decodeURIComponent(resourceName.replace('file:///', ''));
      const parts = decodedResource.split('/');
      const nomeResumo = parts.slice(Math.max(parts.length - 3, 0)).join('/');
      
      const fileKey = jsonItem.name;
      
      if (!filesMap[fileKey]) {
        filesMap[fileKey] = {
           nomeResumo: nomeResumo,
           versoes: []
        };
      }

      // Find directory of the json file
      const directoryPath = jsonItem.name.substring(0, jsonItem.name.lastIndexOf('/') + 1);

      for (const entry of data.entries || []) {
         const backupFileName = entry.id;
         const possibleNames = [
             directoryPath + backupFileName,
             directoryPath + backupFileName + '.js',
             directoryPath + backupFileName + '.html'
         ];
         
         let backupFile = null;
         for (const name of possibleNames) {
             if (loadedZip.files[name]) {
                 backupFile = loadedZip.files[name];
                 break;
             }
         }
         
        if (backupFile) {
          const codeBody = await backupFile.async('text');
          filesMap[fileKey].versoes.push({
            data: new Date(entry.timestamp),
            codigo: codeBody,
            id: entry.id,
            nome_arquivo: nomeResumo,
            fileKey: fileKey
          });
        }
      }
    } catch (e) {
      console.error('Error parsing entries.json in zip', jsonItem.name, e);
    }
  }
  
  // 2. Process format generated directly as filename_YYYYMMDDHHMMSS.ext
  for (const f of allFiles) {
    if (!f.name.includes('.history')) continue;
    if (f.name.endsWith('entries.json')) continue;
    
    // Get just the filename
    const filename = f.name.split('/').pop();
    const directoryPath = f.name.substring(0, f.name.lastIndexOf('/'));
    
    const match = filename.match(regexType2);
    if (match) {
      const baseName = match[1];
      const timestampStr = match[2];
      const extStr = match[3];
      const ext = extStr ? `.${extStr}` : '';
      const originalName = `${baseName}${ext}`;

      const cleanDir = directoryPath.replace(/[/\\]$/, '');
      
      let nomeResumo = originalName;
      if (cleanDir) {
         const parts = cleanDir.split('/');
         if (parts.length > 1 && parts[parts.length - 1] === '.history') {
             nomeResumo = `${parts[parts.length - 2]}/${originalName}`;
         } else {
             nomeResumo = `${cleanDir}/${originalName}`;
         }
      }
      
      const fileKey = `type2_${cleanDir}/${originalName}`;
      
      if (!filesMap[fileKey]) {
        filesMap[fileKey] = {
           nomeResumo: nomeResumo,
           versoes: []
        };
      }

      const year = parseInt(timestampStr.substring(0, 4), 10);
      const month = parseInt(timestampStr.substring(4, 6), 10) - 1;
      const day = parseInt(timestampStr.substring(6, 8), 10);
      const hour = parseInt(timestampStr.substring(8, 10), 10);
      const minute = parseInt(timestampStr.substring(10, 12), 10);
      const second = parseInt(timestampStr.substring(12, 14), 10);
      const dateObj = new Date(year, month, day, hour, minute, second);

      try {
        const codeBody = await f.async('text');
        filesMap[fileKey].versoes.push({
          data: dateObj,
          codigo: codeBody,
          id: filename,
          nome_arquivo: nomeResumo,
          fileKey: fileKey
        });
      } catch (e) {
        console.error('Error reading history zip file', f.name, e);
      }
    }
  }
  
  return processFilesMap(filesMap);
};
export const processFilesMap = (filesMap) => {
  const todasVersoesRank = [];

  // Process diffs
  for (const fileData of Object.values(filesMap)) {
    let versoes = fileData.versoes;
    versoes.sort((a, b) => a.data - b.data);

    const normalizeCode = (s) => {
      if (!s) return '';
      return s.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join('\n');
    };

    const filteredVersoes = [];
    let lastKeptTime = 0;

    for (let i = 0; i < versoes.length; i++) {
      const v = versoes[i];
      const time = v.data.getTime();
      const currentNormalized = normalizeCode(v.codigo);
      
      if (filteredVersoes.length === 0) {
        v.normalized = currentNormalized;
        filteredVersoes.push(v);
        lastKeptTime = time;
        continue;
      }
      
      const lastKept = filteredVersoes[filteredVersoes.length - 1];
      const isDifferent = currentNormalized !== lastKept.normalized;
      
      if (isDifferent) {
        v.normalized = currentNormalized;
        
        // Se a alteração for significativa, mantemos o fluxo
        if (time - lastKeptTime >= 1000 || i === versoes.length - 1) {
          filteredVersoes.push(v);
          lastKeptTime = time;
        } else {
          // É diferente mas passou menos de 30s. Substiui o último se não for a versão base
          if (filteredVersoes.length > 1) {
            filteredVersoes[filteredVersoes.length - 1] = v;
          } else {
            filteredVersoes.push(v);
          }
        }
      } else if (i === versoes.length - 1 && filteredVersoes.length > 0) {
        // Se for a última versão do arquivo e for basicamente igual a última salva,
        // apenas atualizamos o código exato final para garantir as quebras de linha/identação exatas no Diff
        filteredVersoes[filteredVersoes.length - 1].codigo = v.codigo;
        filteredVersoes[filteredVersoes.length - 1].data = v.data;
      }
    }

    fileData.versoes = filteredVersoes;
    versoes = filteredVersoes;
    
    const finalVersoes = [];
    
    for (let i = 0; i < versoes.length; i++) {
        const v = versoes[i];
        let adicoes = 0;
        let remocoes = 0;

        if (finalVersoes.length > 0) {
            const lastKept = finalVersoes[finalVersoes.length - 1];
            const lines1 = lastKept.codigo;
            const lines2 = v.codigo;
            
            // Generate diff using standard git-like diff from the 'diff' library for visualization
            const diffArray = Diff.diffLines(lines1, lines2, { ignoreWhitespace: true });
            v.diff_content = diffArray;
            
            // Calculate exact character differences for stats, ignoring whitespace
            const clean1 = lines1.replace(/\s/g, '');
            const clean2 = lines2.replace(/\s/g, '');
            const charDiff = Diff.diffChars(clean1, clean2);
            
            charDiff.forEach(part => {
                if (part.added) adicoes += part.value.length;
                if (part.removed) remocoes += part.value.length;
            });
            
            v.adicoes = adicoes;
            v.remocoes = remocoes;

            // Omitir totalmente se não houver modificações reais
            if (adicoes === 0 && remocoes === 0) {
                continue;
            }
            
            const tempo_segundos = (v.data.getTime() - lastKept.data.getTime()) / 1000;
            v.cps = tempo_segundos > 0 ? (adicoes / tempo_segundos) : 0;
        } else {
            v.diff_content = null;
            v.adicoes = 0;
            v.remocoes = 0;
            v.cps = 0;
        }

        finalVersoes.push(v);

        if (v.adicoes > 0) {
            todasVersoesRank.push(v);
        }
    }

    fileData.versoes = finalVersoes;
  }

  // Top 10 rank by additions
  const top_5 = [...todasVersoesRank].sort((a, b) => b.adicoes - a.adicoes).slice(0, 10);
  
  // Sort files for the sidebar (alphabetical)
  const sortedFileKeys = Object.keys(filesMap).sort();
  const historyCompleto = {};
  for(const k of sortedFileKeys) {
      // filesMap[k] is { nomeResumo, versoes }
      historyCompleto[k] = {
        nomeResumo: filesMap[k].nomeResumo,
        versoes: [...filesMap[k].versoes].sort((a,b) => b.data - a.data)
      }
  }

  return { top_5, historyCompleto };
};
