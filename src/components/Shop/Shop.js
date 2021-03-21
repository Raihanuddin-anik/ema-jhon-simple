import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
const Shop = () => {
    // const first10 = fakeData.slice(0,10);
    const [products, setProducts]= useState([]);
    const [cart, setcart] = useState([]);
    console.log(cart)

    useEffect(()=>{
        fetch('https://boiling-taiga-26918.herokuapp.com/products') 
        .then(res =>res.json())
        .then(data =>setProducts(data))
    })
      
    useEffect(()=>{
        const savedCart = getDatabaseCart(); 
         const productkey = Object.keys(savedCart);
         fetch('https://boiling-taiga-26918.herokuapp.com/productsByKeys',{
            method: 'POST',
            headers: {
               'Content-Type' : 'application/json'
            },
            body: JSON.stringify(productkey)
          })
          .then(res =>res.json())
          .then(data => setcart(data))
         
    },[])
    const handleAddProduct = (product)=>{
        const productAdded = product.key;
        const sameProduct = cart.find(pd=>pd.key === productAdded);
        let count = 1;
        let newCart;
        if(sameProduct){
             count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others =cart.filter(pd =>pd.key !== productAdded)
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        
        setcart(newCart);
       
        addToDatabaseCart(product.key, count)
    }
    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    products.map(product => <Product addproduct ={handleAddProduct}
                        key = {product.key}
                         product={product}
                         showAddToCart={true}>
                           
                         </Product>)
                }  
            </div>
            <div className='curt-container'>
                 <Cart addcart={cart}>
                    <Link to="/review"> <button>product review</button></Link>
                 </Cart>
            </div>
        </div>
    );
};

export default Shop;