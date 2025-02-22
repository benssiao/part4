import { useState } from 'react'

function Blog({ handleIncrementLikes, handleRemove,  blog }) {
  const [visible, setVisible] = useState(false);
  if (!visible) {
    return (
      <div className="blog-card">
        title: {blog.title} author: {blog.author} <button onClick={() => setVisible(!visible)}>show more</button>
      </div>
    )
  }
  return (
    <div className="blog-card">
      title: {blog.title} author: {blog.author} <button onClick={() => setVisible(!visible)}>show less</button>
      <div>url: {blog.url}</div>
      <div>likes: {blog.likes }
        <button
          onClick={() => handleIncrementLikes(blog)}
        >
          increase likes
        </button>
      </div>
      <button
        onClick={() => {
          if (window.confirm(`Are you sure you want to remove ${blog.title}?`)) {
            handleRemove(blog)
          }
        }}
      >
        remove
      </button>
    </div>
  )
}


export default Blog