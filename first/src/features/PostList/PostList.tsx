import { FILE_LIST } from '@/constants'
import { Link } from 'react-router-dom'

const PostList = () => {
  return (
    <ul>
      {FILE_LIST.map(file => (
        <Link key={file} to={`/first/${file}`}>
          {file}
        </Link>
      ))}
    </ul>
  )
}

export default PostList
