import React, { useContext } from 'react'
import profilePic from "../../../assets/userProfilePic.jpg"
import logo from "../../../assets/logo.png"
import "../styles/Navbar.scss"
import { Link } from 'react-router'
import useAuth from '../../auth/hooks/useAuth'

const Navbar = () => {
    const {handleLogout,user} = useAuth()
    return (
        <div className="navbar">
            <div className="navbar-left">
                <img src={logo} alt="" />
            </div>
            <div className="navbar-right">
                <img src={profilePic} alt="" />
                <div>
                    <p>{user.username}</p>
                    <Link onClick={handleLogout} to={"/login"}>Logout</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
