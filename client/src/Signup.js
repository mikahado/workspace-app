import React, { useState, useContext } from 'react'
import { UserContext } from "./context/user"
import { useNavigate } from 'react-router-dom'

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
     <main class="container">
        <article className="card">
       
        <form onSubmit={handleSubmit}>
            <label>Username: </label>
            <input 
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            /> < br/>< br/>

        <label>Password: </label>
        <input 
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        /> < br/>< br/>

        <label>Confirm Password: </label>
        <input 
        type="password"
        id="password_confirmation"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        /> <br />< br/>

        <button className="button1" type="submit">Submit</button>
        </form>
        <ul>
            {errorsList}
        </ul>
        </article>
        </main>
    </>
  )
}

export default Signup