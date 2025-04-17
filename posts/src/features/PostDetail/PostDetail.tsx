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
      <Markdown
        components={{
          a: ({ node, ...props }) => (
            <a {...props} className="underline cursor-pointer text-[#0000EE]" />
          ),
          h1: ({ node, ...props }) => (
            <h1 {...props} className="text-3xl font-bold mt-8 mb-4" />
          ),
          h2: ({ node, ...props }) => (
            <h2 {...props} className="text-2xl font-bold mt-8 mb-4" />
          ),
          h3: ({ node, ...props }) => (
            <h3 {...props} className="text-xl font-bold mt-8 mb-4" />
          ),
          h4: ({ node, ...props }) => (
            <h4 {...props} className="text-lg font-bold mt-8 mb-4" />
          ),
          h5: ({ node, ...props }) => (
            <h5 {...props} className="text-base font-bold mt-8 mb-4" />
          ),
          h6: ({ node, ...props }) => (
            <h6 {...props} className="text-sm font-bold mt-8 mb-4" />
          ),
          p: ({ node, ...props }) => (
            <p {...props} className="text-base font-normal mt-4 mb-2" />
          ),
          ul: ({ node, ...props }) => (
            <ul
              {...props}
              style={{
                display: 'block',
                marginBlockStart: '1em',
                marginBlockEnd: '1em',
                paddingInlineStart: '40px',
                listStyleType: 'disc',
              }}
            />
          ),
          li: ({ node, ...props }) => <li {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote
              {...props}
              className="text-base font-normal mt-4 mb-2 border-l-4 pl-4"
            />
          ),
          code: ({ node, ...props }) => (
            <code
              {...props}
              className="bg-gray-100 text-sm font-mono p-1 rounded"
            />
          ),
          pre: ({ node, ...props }) => (
            <pre
              {...props}
              className="bg-gray-100 text-sm font-mono p-4 rounded mb-4"
            />
          ),
          img: ({ node, ...props }) => (
            <img
              {...props}
              className="max-w-full h-auto mb-4"
              style={{ maxWidth: '100%', height: 'auto' }} // Ensure images are responsive
            />
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  )
}

export default PostDetail
