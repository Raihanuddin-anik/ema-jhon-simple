import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ProductItem from '../ProductItem/ProductItem';

const Review = () => {

    const [cart, setCart]=useState([]);
    console.log(cart)

      const removeProduct = (productkey) =>{
      const newCart = cart.filter(pd=>pd.key !== productkey)
      setCart(newCart)
      removeFromDatabaseCart(productkey)
    }
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
     .then(data => setCart(data))
     
    // const cartProduct =productkey.map(key =>{
    //     const product = fakeData.find( pd => pd.key === key );
    //     product.quantity = savedCart[key]
    //     return product; 
    // })
    //   setCart(cartProduct);
     
    },[])
    const history = useHistory();

     const handlePlaceOrder = () =>{
        history.push("/Shipment")
     }
    return (
      <div  className='shop-container'>
        <div className='product-container'>
            <h3> Total Product:{cart.length}</h3>
            { 
              cart.map(pd=><ProductItem
              removeproduct ={removeProduct}
                 product={pd}></ProductItem>)
            }
        </div>
        <div>
            <Cart addcart={cart}>
              <button onClick={handlePlaceOrder}> placeed Order</button>
           </Cart>
        </div>
      </div>  
    );
};

export default Review;