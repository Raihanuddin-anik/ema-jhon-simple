import React, { useContext } from 'react';
import { useForm,  } from 'react-hook-form';
import   './shipment.css';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
  const [loggedInUser, setloggedInUser] = useContext(UserContext)
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data =>{
    const savedCart = getDatabaseCart();
    const productdetails = {...loggedInUser, product: savedCart, shipment: data, orderTime: new Date()}
     fetch('https://boiling-taiga-26918.herokuapp.com/addOrder',{
       method: 'POST',
       headers: {
         'Content-Type' : 'application/json'
       },
       body: JSON.stringify(productdetails)
     })
     .then(res =>res.json())
     .then( data =>{
       if(data){
         processOrder()
         alert('Successfully ordered')
       }
     })
  } 

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
   
      <input name="name"  defaultValue={loggedInUser.name} ref={register({ required: true }) } placeholder='Your Name' />
      {errors.name && <span className="error">This field is required</span>}

      <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder='Your Email' />
      {errors.email && <span className="error">This field is required</span>}

      <input name="Adress"  ref={register({ required: true })} placeholder='Your Adress'/>
      {errors.Adress && <span className="error">This field is required</span>}

      <input name="Phone" ref={register({ required: true })} placeholder='Your Phone'/>
      {errors.Phone && <span className="error">This field is required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;