import { ReactNode } from 'react'
import { Footer } from './Footer'
import { Navigation } from './Navigation'

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen w-[calc(100vw-8px)]">
      <Navigation />
      <main className="p-4 flex-1 max-w-4xl mx-auto px-6 py-12">
        {children}
      </main>
      <Footer />
    </div>
  )
}
