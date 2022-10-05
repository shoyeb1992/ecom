import React, { useState }  from "react";
import { useNavigate } from "react-router-dom";

const Product = ()=>{
    const [name, setName]= useState('');
    const [price, setPrice]= useState('');
    const [category, setCategory]= useState('');
    const [company, setCompany]= useState('');
    const [error, setError]= useState(false);
    const navigate = useNavigate();

    const addProduct = async ()=>{
        //console.log(name,price,category,company);
        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }
        let userId = JSON.parse(localStorage.getItem('user'));
        // console.log(userId);
        userId = userId._id;
        const current = new Date();
        const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
       const pdata = {name:name,price:price,category:category,company:company,userId:userId,created_at:date};
       console.log(pdata);
       fetch("http://localhost:5000/addproduct",{
           method: "POST",
           headers:{
               'Content-Type':'application/json',
               authorization: `bearer ${localStorage.getItem('token')}`
           },
           body:JSON.stringify(pdata)
       })
       .then(responce => responce.json())
       .then(data => {
           //console.log(data)
           navigate('/')
       })
       .catch((error) => {
        console.error('Error:', error);
    });
    }
    return (
        <div className="product">
            <h1>Add Product</h1>
            <input type="text" onChange={(e)=>{setName(e.target.value)}} value={name} placeholder="Enter Product Name" className="inputBox"/>
            {error && !name && <span className="error-msg">Enter valid Name</span>}
            <input type="text" onChange={(e)=>{setPrice(e.target.value)}} value={price} placeholder="Enter Product Price" className="inputBox"/>
            {error && !price && <span className="error-msg">Enter valid Price</span>}
            <input type="text" onChange={(e)=>{setCategory(e.target.value)}} value={category} placeholder="Enter Product Category" className="inputBox"/>
            {error && !category && <span className="error-msg">Enter valid Category</span>}
            <input type="text" onChange={(e)=>{setCompany(e.target.value)}} value={company} placeholder="Enter Product Company" className="inputBox"/>
            {error && !company && <span className="error-msg">Enter valid Company</span>}
            <button className="appButton" onClick={addProduct}>Add Product</button>
        </div>
    )
};

export default Product;