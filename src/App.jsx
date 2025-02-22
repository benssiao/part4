import { useState, useEffect , useRef } from 'react'
// components
import Blog from './components/Blog'
import PostBlog from './components/PostBlog'
import { ErrorNotification, ConfirmationNotification } from './components/Notifications'
import SignInForm from './components/SignInForm'
import Toggleable from './components/Toggleable'
//services
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'


function LogOutButton({ setUser }) {
  return <button onClick={() => {
    window.localStorage.removeItem('signedInUser')
    setUser(null)

  }}>log out</button>
}
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [confirmationNotification, setConfirmationNotification] = useState(null)
  const [justPosted, setJustPosted] = useState(0)
 
  const blogPostRef = useRef(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [justPosted])

  useEffect(() => {
    const signedInUser = window.localStorage.getItem('signedInUser')
    if (signedInUser) {
      setUser(JSON.parse(signedInUser))
    }
  }, [])


  async function handleSignIn(username, password) {
    try {
      const loginResponse = await loginService.login({ username, password })
      const loginBody = loginResponse.data
      setUser(loginBody)
      window.localStorage.setItem(
        'signedInUser', JSON.stringify(loginBody)
      )
      setConfirmationNotification('Logged in')
      setTimeout(() => {
        setConfirmationNotification(null)
      }, 5000)
    }
    catch(error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      throw error // so i can skip the clear username and password in the SignInForm component.

    }
  }

  async function handleBlog(blogData) {
    try{
      if (user === null) {
        throw new Error('Not logged in')
      }
      await blogService.postBlog(blogData, user.token)
      setConfirmationNotification('Posted successfully')
      setJustPosted(justPosted+1)
      blogPostRef.current.toggleVisibility()
      setTimeout(() => {
        setConfirmationNotification(null)
      }, 5000)
    }
    catch(error) {
      console.log(error)
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  async function handleIncrementLikes(blog) {
    try{
      await blogService.updateBlog({ ...blog, likes: blog.likes+1 }, user.token)
      setJustPosted(justPosted+1)

    }
    catch(error) {
      console.error(error)
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  async function handleRemove(blog) {
    try {
      await blogService.removeBlog(blog, user.token)
      setJustPosted(justPosted+1)
      setConfirmationNotification(`Removed ${blog.title} successfully`)
      setTimeout(() => {
        setConfirmationNotification(null)
      }, 5000)
    }

    catch(error) {
      console.error(error)
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  function sortByLikes() {
    setBlogs([...blogs].sort((blog1, blog2) => {
      return blog2.likes - blog1.likes
    }))
  }

  if (user === null) {
    return (
      <>
        <SignInForm handleSignIn={handleSignIn}>
        </SignInForm>
      </>
    )
  }

  return (
    <>
      <LogOutButton setUser={setUser} />
      <div>
        {errorMessage && (
          <ErrorNotification message={errorMessage} />
        )}
        {confirmationNotification && (
          <ConfirmationNotification message={confirmationNotification} />
        )}
        <h2>blogs</h2>
        <Toggleable
          ref={ blogPostRef }
          showLabel="create new blogs"
          hideLabel="cancel"
        >
          <PostBlog handleBlog={handleBlog} username={user.username}/>
        </Toggleable>
        <button onClick={sortByLikes}>
          sort by likes
        </button>
        <div className="blog-card-area">
          {blogs.map(blog => (
            <Blog
              key={blog.url}
              blog={blog}
              handleIncrementLikes={handleIncrementLikes}
              handleRemove={handleRemove}
              signedInUsername={user.username}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default App