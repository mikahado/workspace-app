import React, { useState, useContext } from 'react'
import { UserContext } from "./context/user"
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Signup = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [errorsList, setErrorsList] = useState("")

    const navigate = useNavigate()

    const { signup } = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('/api/signup', {
            // CONFIG OBJECT
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password,
                password_confirmation: passwordConfirmation
            })
        })
        .then(res => res.json())
        .then(user => {
            if (!user.errors) {
                signup(user)
                navigate('/')
            } else {
                setUsername("")
                const errorLis = user.errors.map(e => <li>{e}</li>)
                setErrorsList(errorLis)
            }
        })
        
    }


  return (
    <>
        <article className="card">
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit}>
        <TextField id="outlined-basic" label="Create Username" variant="outlined" type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
{/*             
            <label>Username: </label>
            <input 
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            /> < br/>< br/> */}
            <br/><br/>
             <TextField id="outlined-basic" label="Password" variant="outlined" type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />

        {/* <label>Password: </label>
        <input 
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        /> < br/>< br/> */}
        <br/><br/>

            <TextField id="outlined-basic" label="Confirm Password" variant="outlined" type="text"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)} />

        {/* <label>Confirm Password: </label>
        <input 
        type="password"
        id="password_confirmation"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        /> <br />< br/> */}
        <br/><br/>
        <Button variant="contained" className="button1" type="submit">Submit</Button>
        </form>
        <ul>
            {errorsList}
        </ul>
        </article>
    </>
  )
}

export default Signup