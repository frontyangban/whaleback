import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Home } from '@/features/Home'
import { Suspense, lazy } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { DefaultLayout } from './components/common/DefaultLayout'

const FirstApp = lazy(() => import('first/App'))

function App() {
  const location = useLocation()
  console.log('Current Path In Host:', location.pathname)
  return (
    <DefaultLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/first/*" element={<FirstApp />} />
        </Routes>
      </Suspense>
    </DefaultLayout>
  )
}

export default App
