import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"
import "./App.css"


function ErrorNotification({message}) {
    if (message === null) {
      return null;
    }
    return (
      <div className="errorNotification">
        {message}
      </div>
    )

  }

function ConfirmationNotification({message}) {
    if (message === null) {
      return null;
    }
    return (
      <div className="notification">
        {message}
      </div>
    )

}
function PostBlog({handleBlog}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);

  function onSubmit(event) {
    event.preventDefault();
    handleBlog({title, author, url, likes});
  }
  return (
  <form className="post-form" onSubmit={onSubmit}>
    <fieldset>
    <legend>Post a blog</legend>
    <input 
        type="text" 
        value={title} 
        onChange={({target}) => setTitle(target.value)}
      />
      <input 
        type="text" 
        value={author} 
        onChange={({target}) => setAuthor(target.value)}
      />
      <input 
        type="text" 
        value={url} 
        onChange={({target}) => setUrl(target.value)}
      />
      <input 
        type="number" 
        value={likes} 
        onChange={({target}) => setLikes(Number(target.value))}
      />
    <button type="submit">post blog</button>
    </fieldset>
  </form>
  )

}
function SignInForm({handleSignIn}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function onSubmit(event) {
    event.preventDefault();
    try {
      await handleSignIn(username, password);
      setUsername("");
      setPassword("");
    }
    catch(e) {

    }
    
  }
  return (
    <form className="signin-form" onSubmit={onSubmit}>
    <fieldset>
    <legend>Log in to application</legend>
      <input type="string" value={username} onChange={({target})=> setUsername(target.value)}></input>
      <input type="password" value={password} onChange={({target}) => setPassword(target.value)}></input>
      <button type="submit">log in</button>
      </fieldset>
    </form>
  )
}

function LogOutButton({setUser}) {
  return <button onClick={() => {
    window.localStorage.removeItem("signedInUser");
    setUser(null);

  }}>log out</button>
}
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmationNotification, setConfirmationNotification] = useState(null)
  const [justPosted, setJustPosted] = useState(0);
 
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [justPosted])

  useEffect(() => {
    const signedInUser = window.localStorage.getItem("signedInUser");
    if (signedInUser) {
      setUser(JSON.parse(signedInUser));
    }
   
  }, [])

  async function handleSignIn(username, password) {
    try {
      const loginResponse = await loginService.login({username, password});
      const loginBody = loginResponse.data;
      setUser(loginBody);
      window.localStorage.setItem(
        "signedInUser", JSON.stringify(loginBody)
      )
      setConfirmationNotification("Logged in");
      setTimeout(() => {
        setConfirmationNotification(null)
      }, 5000);
    }
    catch(error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      throw error; // so i can skip the clear username and password in the SignInForm component.

    }
  }

  async function handleBlog(blogData) {
    try{
      if (user === null) {
        throw new Error("Not logged in")
      }
      await blogService.postBlog(blogData, user.token);
      setConfirmationNotification("Posted successfully");
      setJustPosted(justPosted+1);
      setTimeout(() => {
        setConfirmationNotification(null)
      }, 5000);
    }
    catch(error) {
      console.log(error);
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    
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
      <PostBlog handleBlog={handleBlog}></PostBlog>
      <LogOutButton setUser={setUser}></LogOutButton>
      <div>
        {errorMessage&&<ErrorNotification message={errorMessage}>
        </ErrorNotification>}
        {confirmationNotification&& <ConfirmationNotification message={confirmationNotification}>
        </ConfirmationNotification>}
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      </>
    )

    
   

}

export default App