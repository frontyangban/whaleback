import { Link } from 'react-router-dom'

export const Navigation = () => {
  return (
    <header className="">
      <nav className="flex p-2 min-h-6 items-center">
        <div className="">
          <Link to="/">
            <img src="/images/yangban.png" className="max-w-16" />
          </Link>
        </div>
        <div className="flex-1 flex justify-center gap-x-4">
          <Link to="/about">About</Link>
          <Link to="/posts">Post</Link>
          <Link to="/lab">Lab</Link>
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
