import { useState } from 'react'
import { Dropzone } from '../components/Dropzone'
import { Dashboard } from '../components/Dashboard'

export function Analyzer() {
  const [analysisData, setAnalysisData] = useState(null);

  const handleAnalyzeComplete = (data) => {
    setAnalysisData(data);
  };

  const handleReset = () => {
    setAnalysisData(null);
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex' }}>
      {!analysisData ? (
        <Dropzone onAnalyzeComplete={handleAnalyzeComplete} />
      ) : (
        <Dashboard data={analysisData} onReset={handleReset} />
      )}
    </div>
  )
}
