import React, { useState, useContext } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { UserContext } from "./context/user"
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const { login } = useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/api/login', {
      method: 'POST',
      headers:  { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(res => res.json())
      .then((user) => {
        if (!user.error) {
          login(user)
          navigate('/')
        } else { 
          setUsername("")
          setPassword("")
          const errorLi = <li>{user.error}</li>
          setError(errorLi)
        }      
      })
  }

  return (
    <div>
 
      <article className="card">
        <h3>Account Login:</h3>
        
        <form onSubmit={handleSubmit}>
          <TextField id="outlined-basic" label="Your Username" variant="outlined" type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
          <br/><br/>
           <TextField id="outlined-basic" label="Password" variant="outlined" type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <br/><br/>
          <Button className="button1" variant="contained" type="submit">LOGIN</Button>
   
        </form>

        <ul>
          {error}
        </ul>
        </article>

    </div>
  )
}

export default Login