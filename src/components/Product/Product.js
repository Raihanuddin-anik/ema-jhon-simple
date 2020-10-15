import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import './Product.css';

const Product = (props) => {
    // console.log(props);
    const {name, img, seller, price, stock} = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-name">
                <h4>{name}</h4>
                <br/>
                <p><small>By: {seller}</small></p>
                <p className="price">${price}</p>
                <p className="stock">only {stock} left in stoke -Order Soon</p>
                <button onClick={()=>props.addproduct(props.product)}><FontAwesomeIcon icon={faShoppingCart}/>add to cart</button>
            </div>
        </div>
    );
};

export default Product;