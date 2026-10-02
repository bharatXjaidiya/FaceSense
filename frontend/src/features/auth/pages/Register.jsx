import React, { useState } from 'react'
import { Link, useNavigate } from "react-router"
import useAuth from '../hooks/useAuth'
import poster from "../../../assets/poster.jpg"
import "../styles/form.scss";
const Register = () => {

  const {handleRegister , loading} = useAuth()
  const navigate = useNavigate();

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [gender, setGender] = useState("prefer_not_to_say")


  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value)
    }
    else if (e.target.name === "email") {
      setEmail(e.target.value)
    }
    else if (e.target.name === "password") {
      setPassword(e.target.value)
    }

  }

  const onSubmit = async(e) => {
   e.preventDefault();
   await handleRegister({username,email,password,gender})
   navigate("/login")
  }

  if(loading){
    return <h1>Registring you....</h1>
  }

  return (
    <main id="register">
      <div className="register-left">
        <img src={poster} alt="" />
      </div>

      <div className="register-right">
        <h1>Create an account</h1>
        <form onSubmit={(e)=>{onSubmit(e)}} className="register-form">
          <label htmlFor="username"> Username </label>
          <input onChange={(e) => { handleChange(e) }} type="text" id='username' name='username' value={username} required={true} />
          <label htmlFor="email">Email</label>
          <input onChange={(e) => { handleChange(e) }} id='email' type="text" name='email' value={email} required={true} />
          <label htmlFor="password">Password</label>
          <input onChange={(e) => { handleChange(e) }} id='password' type="text" name='password' value={password} required={true} />

          <div className="gender">
            <label htmlFor="male">
              Male
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
            </label>

            <label htmlFor="female">
              Female
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
            </label>

            <label htmlFor="other">
              Prefer not to say
              <input
                type="radio"
                name="gender"
                id="other"
                value="prefer_not_to_say"
                checked={gender === "prefer_not_to_say"}
                onChange={(e) => setGender(e.target.value)}
              />
            </label>
          </div>
          <button>Register</button>
        </form>
        <div className="message">
          <p className='message'>Already Registered ?</p>
          <Link to={"/login"} >login</Link>
        </div>

      </div>
    </main>
  )
}

export default Register
