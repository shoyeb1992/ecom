import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = ()=>{

    const [product, setProduct] = useState([]);

    useEffect(()=>{
        getProducts();
    },[]);

    const getProducts = async ()=>{
        const myHeaders = new Headers();
        myHeaders.append('authorization', localStorage.getItem('token'));

        fetch("http://localhost:5000/products",{
            headers: {
                authorization: `bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            setProduct(data)
        })
        .catch((error)=>{
            console.error('error',error);
        })
    }

    const deleteProduct = async (id)=>{
        //console.log(id);
        fetch(`http://localhost:5000/product/${id}`,{
            method:'Delete',
            headers: {
                authorization: `bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response=>response.json())
        .then(data=>{
            //console.log(data);
            alert('Product deleted successfully!')
            getProducts();
        })
        .catch((error)=>{
            console.error("error",error);
        })
    } 

    const searchHandle = async (event)=>{
        let key = event.target.value;
        if(key){
            fetch(`http://localhost:5000/search/${key}`,{
                headers: {
                    authorization: `bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => response.json())
            .then(data =>{
                //console.log(data)
                setProduct(data);
            })
            .catch((errors)=>{
                console.error("error", errors);
            })
        }else{
            getProducts();
        }
        
    }
    return(
        <div className="product-list">
        <h3>Product list</h3>
            <input type="text" onChange={searchHandle} placeholder="Search Product" />
            <ul>
                <li>Sr. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Cotegory</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                product.length>0? product.map((item,index)=>
                    <ul key={index+1}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>$ {item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick={()=>deleteProduct(item._id)}>Delete</button>
                            <Link to={`/update/${item._id}`}>Edit</Link>
                        </li>
                    </ul>
                )
                : <h1>No result found.</h1>
            }
        </div>
    )
}

export default ProductList;