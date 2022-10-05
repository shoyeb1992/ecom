import React, { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom';
const Login = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    });
    const handelLogin = ()=>{
        //console.log(email, password)
        const data = { email:email, password:password };
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
        .then(response=>response.json())
        .then(data=>{
            //console.log(data);
            if(data.auth){
                localStorage.setItem('user',JSON.stringify(data));
                localStorage.setItem('token',data.auth);
            }
           
            navigate('/')
        })
        .catch((error) => {
            console.error('Error:', error);
        })
        
    }
    return(
        <div className="login">
        <h1>Login Page</h1>
        <input className="inputBox" type="text"
            onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Enter email" />
            <input className="inputBox" type="password" onChange={(e)=>setPassword(e.target.value)}
            value={password} placeholder="Enter Password" />

            <button className="appButton" onClick={handelLogin} type="button">Login</button>
        </div>
    )
}

export default Login;