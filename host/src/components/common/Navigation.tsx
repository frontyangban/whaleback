import { Link } from 'react-router-dom'

export const Navigation = () => {
  return (
    <header className="bg-gray-200 text-gray-800">
      <nav className="flex justify-center gap-x-2 p-2">
        <Link to="/">H</Link>
        <Link to="/first">First</Link>
      </nav>
    </header>
  )
}
