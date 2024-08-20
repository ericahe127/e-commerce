import React, { useState } from "react"
import {useNavigate} from "react-router-dom"
import "./Login.scss"
import newRequest from "../../utils/newRequest.js"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", {username, password})
      localStorage.setItem("currentUser", JSON.stringify(res.data)) //res.data is an object, can only put in strings in localStorage
      navigate("/")
    } catch (err) {
      setError(err)
      console.log(err.response.data)
    }
  
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input type="text" name="username" onChange={e=>setUsername(e.target.value)}/>

        <label htmlFor="">Password</label>
        <input type="password" name="password" onChange={e=>setPassword(e.target.value)}/>

        <button type="submit">Log in</button>
        {error  && error}
      </form>
    </div>
  )
}

export default Login