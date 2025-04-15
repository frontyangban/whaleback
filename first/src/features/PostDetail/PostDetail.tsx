import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { useParams } from 'react-router-dom'

const PostDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [content, setContent] = useState('')

  // id 가 docker-kubernetes-250402.md 라면
  // /md/docker-kubernetes-250402.md 파일이 있을 것!
  // 이것을 Markdown의 children으로 넣어주면 된다.
  useEffect(() => {
    if (id) {
      const filePath = `/first/md/${id}`

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
      <Markdown>{content}</Markdown>
    </div>
  )
}

export default PostDetail
