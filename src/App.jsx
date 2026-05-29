import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { Analyzer } from './pages/Analyzer'
import { Instructions } from './pages/Instructions'
import { StudentInstructions } from './pages/StudentInstructions'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('analyzer')

  return (
    <div className="app-main-wrapper">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="app-content-area">
        {activeTab === 'analyzer' && <Analyzer />}
        {activeTab === 'instructions' && <Instructions />}
        {activeTab === 'student-instructions' && <StudentInstructions />}
      </div>
    </div>
  )
}

export default App
