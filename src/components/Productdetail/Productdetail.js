import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const Productdetail = () => {
    const {productkey}= useParams();
    const product = fakeData.find(pd =>pd.key === productkey);
    // console.log(product)
    return ( 
        <div>
            <h3>{productkey} detail comming soooooooooooooon</h3>
            {
                <Product ShowAddToCart ={false} product={product}></Product>
            }
        </div>
    );
};

export default Productdetail;