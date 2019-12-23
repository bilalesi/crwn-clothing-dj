import React, {Component, useState, useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/user.selectors';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';

import SignInSignUpPage from './pages/signingpage/signin-signup.component';
import Header from './components/header/header.component';
import {checkUserSession} from './redux/user/user.actions'


const App = ({checkUserSession, currentUser}) =>{
    const [currentUserInside, setCurrentUser] = useState('');

    useEffect(() =>{
        checkUserSession();
    },[checkUserSession])
    return(
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route  path='/shop' component={ShopPage}/>          
          <Route exact path='/checkout' component={CheckoutPage}/>          
          {/* <Route  path='/signin' component={SignInSignUpPage}/> */}
          <Route 
            exact 
            path='/signin' 
            render= {
              () => 
                // eslint-disable-next-line no-unused-expressions
                currentUser ? 
                (<Redirect to='/'/>)
                :
                (<SignInSignUpPage/>)              
            }/>          
        </Switch>
      </div>
    )
}


const mapStatsToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) =>({
  checkUserSession : () => dispatch(checkUserSession())
}) 

export default connect(mapStatsToProps, mapDispatchToProps) (App);
