import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { useParams } from 'react-router-dom'

const PostDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [content, setContent] = useState('')

  // 아 이거 애매하네.. 이 녀석의 오리진으로 가져와야대는디.
  useEffect(() => {
    if (id) {
      const filePath = `https://whaleback-posts.vercel.app/md/${id}`

      fetch(filePath)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.text()
        })
        .then(text => {
          setContent(text)
        })
    }
  }, [id])

  return (
    <div>
      <Markdown children={content} />
    </div>
  )
}

export default PostDetail
