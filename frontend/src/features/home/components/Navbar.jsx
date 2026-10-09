import React from 'react'
import profilePic from "../../../assets/userProfilePic.jpg"
import logo from "../../../assets/logo.png"
import "../styles/Navbar.scss"
import { Link } from 'react-router'

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <img src={logo} alt="" />
            </div>
            <div className="navbar-right">
                <img src={profilePic} alt="" />
                <div>
                    <p>username</p>
                    <Link to={"/login"}>Logout</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
