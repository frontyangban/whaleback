import { ReactNode } from 'react'
import { Navigation } from './Navigation'

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navigation />
      <main className="p-4">{children}</main>
      {/* <Footer /> */}
    </div>
  )
}
