import React from 'react'
import { Link } from "react-router"
import useAuth from '../hooks/useAuth'
import poster from "../../../assets/poster.jpg"
import "../styles/form.scss";
const Register = () => {

  const { handleRegister } = useAuth()

  return (
    <main id="register">
      <div className="register-left">
        <img src={poster} alt="" />
      </div>

      <div className="register-right">
        <h1>Create an account</h1>
        <form className="register-form">
          <label htmlFor="username"> Username </label>
          <input type="text" id='username' />
          <label htmlFor="email">Email</label>
          <input id='email' type="text" />
          <label htmlFor="password">Password</label>
          <input id='password' type="text" />

          <label htmlFor="gender">Gender</label>
          <div className="gender">
            <label htmlFor="male">Male
              <input type="radio" name="gender" id="male" /></label>
            <label htmlFor="female">Female
              <input type="radio" name="gender" id="female" /></label>
            <label htmlFor="other">don't prefer to say.
              <input type="radio" name="gender" id="other" /></label>
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
