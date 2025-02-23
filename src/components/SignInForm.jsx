import { useState, useEffect } from 'react'

function SignInForm({ handleSignIn, setErrorMessage, setConfirmationNotification }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  async function onSubmit(event) {
    event.preventDefault()
    if (await handleSignIn(username, password)){
      setUsername('')
      setPassword('')
    }
    

  }
  return (
    <form className="signin-form" onSubmit={onSubmit}>
      <fieldset>
        <legend>Log in to application</legend>
        <div className="entry-wrapper">username:
          <input type="string" value={username} onChange={({ target }) => setUsername(target.value)}></input>
        </div>
        <div className="entry-wrapper">password:
          <input type="password" value={password} onChange={({ target }) => setPassword(target.value)}></input>
        </div>
        <button type="submit">log in</button>
      </fieldset>
    </form>
  )
}

export default SignInForm