import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';


if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  
const LogIn = () => {
    const [NewUser, setNewUser] = useState(false);
  const [user, setuser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password:'',
    photo: ''
  })

  const [loggedInUser, setloggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { email, photoURL, displayName } = res.user;
        const UserSignIn = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        }
        setuser(UserSignIn)
        console.log(email, photoURL)
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }
  const handleSingOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const SignOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          password: '',
          error: '',
          success: '',
          photo: ''
        }
        setuser(SignOutUser);

      })
      .catch(err => {

      })
  }
  const handleCheckEmail = (e) => {
    
    let isFormValid = true;
  
    if (e.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);

    }
    if (e.target.name === "password") {
      const isPasswordvalid = e.target.value.length > 6;
      const isPasswordNumber = /\d{1}/.test(e.target.value);
      isFormValid = isPasswordvalid && isPasswordNumber;
    }
    if (isFormValid) {
      const NewUserInfo = { ...user };
      NewUserInfo[e.target.name] = e.target.value;
      setuser(NewUserInfo);
    }
  }
   const handleSubmit = (e) =>{
      console.log(user.email, user.password);
      if (NewUser && user.email && user.password) {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res =>{
          const NewUserInfo ={...user};
          NewUserInfo.error = '';
          NewUserInfo.success = true;
          setuser(NewUserInfo);
          UpdateUserName(user.name)
          console.log(res)
        })
        .catch(error =>{
          // Handle Errors here.
          const NewUserInfo ={...user};
          NewUserInfo.success = false;
          NewUserInfo.error = error.message;
          
          setuser(NewUserInfo);
          // ...
        
        });
      }
      if (!NewUser && user.email && user.password) {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res =>{
          const NewUserInfo ={...user};
          NewUserInfo.error = '';
          NewUserInfo.success = true;
          setuser(NewUserInfo);
          setloggedInUser(NewUserInfo);
          history.replace(from)
          console.log(res)
        })
        .catch(function(error) {
          // Handle Errors here.
          const NewUserInfo ={...user};
          NewUserInfo.success = false;
          NewUserInfo.error = error.message;
          
          setuser(NewUserInfo);
          // ...
        });
      }
   e.preventDefault();
   }
   const UpdateUserName = (name) =>{
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
      
    }).then(function() {
      console.log("user name updated Successfully");
    }).catch(function(error) {
      console.log(error);
    });
   }

  return (
    <div className="App">

      {
        user.isSignedIn ? <button onClick={handleSingOut}>Sign Out</button> :
          <button onClick={handleSignIn}>Sign In</button>
      }
      {
        user.isSignedIn &&
        <div>
          <p>Welcome </p>

          <h3>{user.name}</h3>
          <h5>{user.email}</h5>
        </div> 
      }
      <h1>Our Authentication</h1>
      <input type="checkbox" name="NewUser" onClick={()=>setNewUser(!NewUser)} id=""/>
      <label htmlFor="NewUser">New User Sign up</label>
      <form action="">
        {NewUser && <input name="name" onBlur={handleCheckEmail} placeholder="Enter Your Name" type="text" />}
        <br/>
        <input type="email" name="email" placeholder="Your Email" required onBlur={handleCheckEmail}  />
        <br />
        <input type="password" name="password" placeholder="Your Password" required onBlur={handleCheckEmail}  />
        <br />
        <input type="submit" value={NewUser ? 'Sign Up' : 'Sign In'} onClick={handleSubmit} />
      </form>
    <p style={{color: 'red'}}>{user.error}</p>
    {
      user.success && <p style={{color: 'green'}}> User { NewUser ? "Create": "logIn"} successfully</p>
    }
    </div>
  );
};

export default LogIn;