import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const Productdetail = () => {
    const {productkey}= useParams();
    const[product, setproduct] = useState({})
   
    useEffect(()=>  {
        fetch('https://boiling-taiga-26918.herokuapp.com/product/'+ productkey)
        .then(res =>res.json())
        .then(data => setproduct(data))
    }, [productkey])

    // const product = fakeData.find(pd =>pd.key === productkey);
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