import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = (props) => {

    const {name,price, seller,key,quantity}=props.product;
    return (
        <div className="product-name">
        <h5><Link to={"/product"} >{name}</Link></h5>
        <br/>
        <p><small>Quantity: {quantity}</small></p> 
        <p className="price">${price}</p>
        {/* <p className="stock">only {stock} left in stoke -Order Soon</p> */}
        <button onClick={()=>props.removeproduct(key)}>Remove</button>
    </div>
    );
};

export default ProductItem;