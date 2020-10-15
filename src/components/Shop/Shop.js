import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products, setProducts]= useState(first10);
    const [cart, setcart] = useState([]);

    const handleAddProduct = (product)=>{
        console.log('prodet', product);
        const newCart = [...cart, product];
        setcart(newCart);
    }
    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    products.map(product => <Product addproduct ={handleAddProduct}
                         product={product}></Product>)
                }  
            </div>
            <div className='curt-container'>
                 <Cart addcart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;