import React ,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
const Signup = ()=>{
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    });

    const collectData = async ()=>{
       // console.log(name,password,email);
       const data = { name: name, email:email, password:password };
       fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                //console.log('Success:', data);
                if(data.auth){
                    localStorage.setItem('user',JSON.stringify(data));
                    localStorage.setItem('token',data.auth);
                }
                navigate("/");
            })
            .catch((error) => {
            console.error('Error:', error);
        });
    }
    return(
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text" 
            value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter name" />
            
            <input className="inputBox" type="text"
            value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" />
            
            <input className="inputBox" type="password" 
            value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password" />

            <button onClick={collectData} className="appButton" type="button">Signup</button>
        </div>
    )
}

export default Signup;