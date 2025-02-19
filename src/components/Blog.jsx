const Blog = ({ blog }) => (
  <div className="blog-card">
    title: {blog.title} author: {blog.author} likes: {blog.likes} url: {blog.url}
  </div>
)

export default Blog