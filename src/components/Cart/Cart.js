import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.addcart;
//    console.log(cart);
// const total = cart.reduce( (total,prd) => total + prd.price , 0);

let total = 0;
for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    total = total + product.price * product.quantity || 1;
    
}
 
let shipping = 0;
if (total > 50) {
    shipping = 0;
}
if (total > 20 && total < 50) {
    shipping = 6;
}
else if (total > 0 && total < 20) {
    shipping = 12
}
const Total2 = Math.round(total)
const tax = Math.round(Total2/10);
const grandTotal = (Total2+shipping+tax);
 const TotalPrice = Math.round(grandTotal)
    return (
        <div>
           <h4 className="text-primary"> Items Order:{cart.length}</h4>
           <p>product price: {Total2}</p>
           <p><small>shipping:{shipping}</small></p>
           <p><small> Tax:{tax}</small></p>
           <p>Total:{TotalPrice}</p>
           <br/>
          {props.children}
        </div>
    );
};

export default Cart;