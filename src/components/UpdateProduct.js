import React, { useEffect, useState }  from "react";
import {useNavigate, useParams} from "react-router-dom";
const UpdateProduct = ()=>{
    const [name, setName]= useState('');
    const [price, setPrice]= useState('');
    const [category, setCategory]= useState('');
    const [company, setCompany]= useState('');
    const [error, setError]= useState(false);
    const params = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        console.log(params);
        getProductDetails();
    },[]);

    const getProductDetails = async()=>{
        fetch(`http://localhost:5000/product/${params.id}`,{
            method:"get",
            headers:{
                "Content-Type":"application/json",
                authorization: `bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response=> response.json())
        .then(data => {
                //console.log(data)
                setName(data.name);
                setPrice(data.price);
                setCategory(data.category);
                setCompany(data.company);
        })
        .catch((error)=>{
            console.error("error",error);
        })
    }
    const UpdateProduct = async ()=>{
        //console.log(name,price,category,company);
        //let updateData = {name:params.name, price:params.price, category:params.category, company:params.company};
        fetch(`http://localhost:5000/product/${params.id}`,{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                authorization: `bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify({name,price,category,company})
        })
        .then(response => response.json())
        .then(data=>{
           // console.log(data)
           navigate('/');
        })
        .catch((errors)=>{
            console.error("error",errors)
        })

        
    }
    return (
        <div className="product">
            <h1>Add Product</h1>
            <input type="text" onChange={(e)=>{setName(e.target.value)}} value={name} placeholder="Enter Product Name" className="inputBox"/>
           
            <input type="text" onChange={(e)=>{setPrice(e.target.value)}} value={price} placeholder="Enter Product Price" className="inputBox"/>
           
            <input type="text" onChange={(e)=>{setCategory(e.target.value)}} value={category} placeholder="Enter Product Category" className="inputBox"/>
            
            <input type="text" onChange={(e)=>{setCompany(e.target.value)}} value={company} placeholder="Enter Product Company" className="inputBox"/>
            
            <button className="appButton" onClick={UpdateProduct}>Update Product</button>
        </div>
    )
};

export default UpdateProduct;