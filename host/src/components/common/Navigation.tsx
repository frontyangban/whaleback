import { Link, useLocation } from 'react-router-dom'

interface NavLinkProps {
  to: string
  children: React.ReactNode
  className?: string
  activeClassName?: string
}

const NavLink = ({ to, children, className }: NavLinkProps) => {
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path
  return (
    <Link to={to} className={isActive(to) ? 'text-blue-600' : className}>
      {children}
    </Link>
  )
}

export const Navigation = () => {
  return (
    <header>
      <nav className="flex p-2 min-h-6 items-center">
        <div>
          <NavLink to="/">
            <img src="/images/yangban.png" className="max-w-16" />
          </NavLink>
        </div>
        <div className="flex-1 flex justify-center gap-x-6 text-lg font-semibold text-gray-700">
          <NavLink to="/about">About</NavLink>
          <NavLink to="/posts">Post</NavLink>
          <NavLink to="/lab">Lab</NavLink>
        </div>
        <div>
          {/* <Link to="/login">
            <LogInIcon className="w-6 h-6" />
          </Link> */}
        </div>
      </nav>
    </header>
  )
}
