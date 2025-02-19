import { useState, useEffect } from 'react'


function PostBlog({ handleBlog }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  function onSubmit(event) {
    event.preventDefault()
    handleBlog({ title, author, url, likes })
  }
  return (
    <form className="post-form" onSubmit={onSubmit}>
      <fieldset>
        <legend>Post a blog</legend>
        <div className="entry-wrapper">
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="entry-wrapper">
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className="entry-wrapper">
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div className="entry-wrapper">
          <input
            type="number"
            value={likes}
            onChange={({ target }) => setLikes(Number(target.value))}
          />
        </div>
        <button type="submit">post blog</button>
      </fieldset>
    </form>
  )
}

export default PostBlog