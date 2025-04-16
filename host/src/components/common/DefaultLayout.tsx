import { ReactNode } from 'react'
import { Footer } from './Footer'
import { Navigation } from './Navigation'

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="p-4 flex-1">{children}</main>
      <Footer />
    </div>
  )
}
