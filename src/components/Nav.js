import React from "react";
import { Link,useNavigate } from 'react-router-dom';

const Nav = ()=>{
    const auth = localStorage.getItem('user');
    const authData = JSON.parse(auth);
    console.log(authData)
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.clear();
        navigate('/signup')
    }
    return (
        <div>
            <img className="logo" src="https://i.pinimg.com/736x/de/a0/f3/dea0f3b7f480b1151c08db4a402a43b9.jpg" alt="Website Logo" />
            {
                auth?
                <ul className="nav-ul">
                <li><Link to="/">Product</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/signup" onClick={logout}>Logout ({authData.user.name})</Link></li>
                </ul>
                :
                <ul className="nav-ul nav-right">
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }
        </div>
    )
} 

export default Nav;
