import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {
  
    const handleAddProduct = () =>{
        fetch('https://boiling-taiga-26918.herokuapp.com/addProduct',{
            method:'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fakeData)
            
        })
    }

    return (

        <div>
            <button onClick={()=>handleAddProduct()}>Button</button>
        </div>
    );
}; 

    export default Inventory;