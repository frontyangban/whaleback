import { Route, Routes } from 'react-router-dom'
import { FirstHome } from '@/features/Home'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<FirstHome />} />
      </Routes>
    </div>
  )
}

export default App
