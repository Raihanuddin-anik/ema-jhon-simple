import React from 'react';

const Cart = (props) => {
    const cart = props.addcart;
   console.log(cart);
// const total = cart.reduce( (total,prd) => total + prd.price , 0);

let total = 0;
for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    total = total + product.price;
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
const tax = Math.round(total/10);
const grandTotal = (total+shipping+tax);
    return (
        <div>
           <h4> Items Order:{cart.length}</h4>
           <p>product price: {total}</p>
           <p><small>shipping:{shipping}</small></p>
           <p><small> Tax:{tax}</small></p>
            <p>Total:{grandTotal}</p>
        </div>
    );
};

export default Cart;