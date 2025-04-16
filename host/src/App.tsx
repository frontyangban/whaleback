import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Home } from '@/features/Home'
import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { DefaultLayout } from './components/common/DefaultLayout'

const PostsApp = lazy(() => import('posts/App'))

function App() {
  return (
    <DefaultLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/*" element={<PostsApp />} />
        </Routes>
      </Suspense>
    </DefaultLayout>
  )
}

export default App
