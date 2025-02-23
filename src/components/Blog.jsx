import { useState } from 'react'

function Blog({ handleIncrementLikes, handleRemove, blog }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="blog-card-wrapper">   
      <div className="blog-card">
        <div className="blog-header">
          <span>{blog.title} by {blog.author}</span>
        </div>

        {visible && (
          <div className="extra-content-blog-card">
            <div>url: {blog.url}</div>
            <div className="likes-section">
              <span>likes: {blog.likes}</span>
              <button onClick={() => handleIncrementLikes(blog)}>
                like
              </button>
            </div>
            <button
              className="remove-button"
              onClick={() => {
                if (window.confirm(`Are you sure you want to remove ${blog.title}?`)) {
                  handleRemove(blog)
                }
              }}
            >
              remove
            </button>
          </div>
        )}
      </div>
      <button className="blog-visibility-button" onClick={() => setVisible(!visible)}>
        {visible ? 'show less' : 'show more'}
      </button>
    </div>
  );
}


export default Blog