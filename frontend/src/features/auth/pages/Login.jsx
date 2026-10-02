import React, { useState } from 'react'
import { Link, useNavigate } from "react-router"
import useAuth from '../hooks/useAuth'
import poster from "../../../assets/poster.jpg"
import "../styles/form.scss";
const Login = () => {

    const { handleLogin, loading ,user } = useAuth()
    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginvia, setLoginvia] = useState("username")


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

    const onSubmit = async (e) => {
        e.preventDefault();
        await handleLogin({ username, email, password })
        navigate("/register")
    }


    if (loading) {
        return <h1>Login....</h1>
    }

    return (
        <main id="login">
            <div className="login-left">
                <img src={poster} alt="" />
            </div>

            <div className="login-right">
                <h1>Login to your Account</h1>
                <form onSubmit={(e) => { onSubmit(e) }} className="form">
                    {loginvia === "username" ? <>
                        <label htmlFor="username"> Username </label>
                        <input onChange={(e) => { handleChange(e) }} type="text" id='username' name='username' value={username} required={true} />
                    </> : <>
                        <label htmlFor="email">Email</label>
                        <input onChange={(e) => { handleChange(e) }} id='email' type="text" name='email' value={email} required={true} />
                    </>}


                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => { handleChange(e) }} id='password' type="text" name='password' value={password} required={true} />

                    <div onClick={() => setLoginvia((prev) => (prev === "email" ? "username" : "email"))} className="via">Login via {loginvia === "username" ? "email" : "username"}</div>

                    <button>Login</button>
                </form>
                <div className="message">
                    <p className='message'>Create a new Account ?</p>
                    <Link to={"/"} >Sigup</Link>
                </div>

            </div>
        </main>
    )
}

export default Login
