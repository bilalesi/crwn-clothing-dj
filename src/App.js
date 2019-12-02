import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css';

import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInSignUpPage from './pages/signingpage/signin-signup.component';
import Header from './components/header/header.component';

import {auth, createUserProfileDocument} from  './firebase/firebase.utils';

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
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      // this.setState({currentUser : user});
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id:snapshot.id,
              ...snapshot.data()
            }
          }, () =>{
            console.log('state 1: ', this.state.currentUser)
          }
          )
          
        }
        , (err) => {
          console.log('error',err);
        })

      }
      else
        this.setState({ currentUser : userAuth}, () => {
          console.log("state 2: ",this.state);
        })
    });
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
          {console.log('state 3 :', this.state.currentUser)}
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
