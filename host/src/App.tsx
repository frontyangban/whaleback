import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Home } from '@/features/Home'
import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const FirstApp = lazy(() => import('first/App'))

function App() {
  return (
    <div>
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/first" element={<FirstApp />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default App
