import { Route, Routes, useLocation } from 'react-router-dom'
import { PostList } from './features/PostList'
import { PostDetail } from './features/PostDetail'

function App() {
  const location = useLocation()
  console.log('Current Path In Remote:', location.pathname)
  return (
    <div>
      <Routes>
        <Route path="/" element={<PostList />} />
        {/* dynamic route for post detail */}
        <Route path="/:id" element={<PostDetail />} />
      </Routes>
    </div>
  )
}

export default App
