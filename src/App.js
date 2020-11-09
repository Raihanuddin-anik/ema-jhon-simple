import React, { createContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import Inventory from './components/Iventory/Inventory';
import Notfound from './components/Notfound/Notfound';
import Productdetail from './components/Productdetail/Productdetail';
import Shipment from './components/Shipment/Shipment';
import LogIn from './components/LogIn/LogIn';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {

   const [LoggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[LoggedInUser, setLoggedInUser]}>
      <h3>Email: {LoggedInUser.email}</h3>
      
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/Shop">
            <Shop></Shop> 
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/inventory">
             <Inventory></Inventory>
          </PrivateRoute>
          <PrivateRoute path="/Shipment">
             <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/LogIn">
             <LogIn></LogIn>
          </Route>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productkey">
            <Productdetail></Productdetail>
          </Route>
          <Route path="/*">
              <Notfound></Notfound>
          </Route>
        </Switch>
      </Router>
    
     
    </UserContext.Provider>
  );
}

export default App;
