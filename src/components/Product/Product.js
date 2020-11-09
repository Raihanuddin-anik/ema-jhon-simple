import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    
    // console.log(props);
    const {name, img, seller, price, stock,key} = props.product;
    return (
        <div className="product"> 
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-name">
                <h5><Link to={"/product/"+key} >{name}</Link></h5>
                <br/>
                <p><small>By: {seller}</small></p>
                <p className="price">${price}</p>
                <p className="stock">only {stock} left in stoke -Order Soon</p>
               { props.showAddToCart == true && <button  onClick={()=>props.addproduct(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart}/>add to cart</button>}
            </div>
        </div>
    );
};

export default Product;