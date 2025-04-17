import { FILE_LIST } from '@/constants'
import { Link } from 'react-router-dom'

const PostList = () => {
  return (
    <ul>
      {FILE_LIST.map(({ date, description, fileName, title }) => (
        <li key={fileName} className="border-b py-2">
          <Link
            to={`/posts/${fileName}`}
            className="text-blue-600 hover:underline"
          >
            <h2 className="text-xl font-bold">{title}</h2>
          </Link>
          <p className="text-gray-800">{description}</p>
          <p className="text-gray-600 text-sm">{date}</p>
        </li>
      ))}
    </ul>
  )
}

export default PostList
