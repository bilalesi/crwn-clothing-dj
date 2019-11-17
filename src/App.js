import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css';

import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInSignUpPage from './pages/signingpage/signin-signup.component';
import Header from './components/header/header.component';

import {auth} from  './firebase/firebase.utils';

const HatsPage = () =>{
  return(
    <div>
      <h1>HATS PAGE</h1>
    </div>
  );
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser : null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user =>{
      this.setState({currentUser : user});
      console.log(user);
    })
  }


  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  

  render (){
    return(
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route  path='/hats' component={HatsPage}/>
          <Route  path='/shop' component={ShopPage}/>
          {
            this.state.currentUser ? 
              <Redirect  to='/' component={Homepage}/> :
              <Route  path='/signin' component={SignInSignUpPage}/>
          }
        </Switch>
      </div>
    )
  } 
}

export default App;
