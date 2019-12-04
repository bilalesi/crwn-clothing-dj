import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css';
import {connect} from 'react-redux';

import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInSignUpPage from './pages/signingpage/signin-signup.component';
import Header from './components/header/header.component';

import {auth, createUserProfileDocument} from  './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions';

const HatsPage = () =>{
  return(
    <div>
      <h1>HATS PAGE</h1>
    </div>
  );
}

class App extends Component {
  constructor(){
    super();
    this.state= {
      currentUserInside : ''
    }
  }
  
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;
    
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      // this.setState({currentUser : user});
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id:snapshot.id,
            ...snapshot.data()
          });                    
        }
        , (err) => {
          console.log('error',err);
        })

      }
      else
        setCurrentUser(userAuth)
        
    });
  }


  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  
  componentDidUpdate(prevProps, prevState){
    console.log('state after login :', this.props);
  }

  render (){
    return(
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route  path='/hats' component={HatsPage}/>
          <Route  path='/shop' component={ShopPage}/>          
          {/* <Route  path='/signin' component={SignInSignUpPage}/> */}
          {
            
            this.props.currentUser ? 
              <Redirect  to='/' component={Homepage}/> :
              <Route  path='/signin' component={SignInSignUpPage}/>
          }         
        </Switch>
      </div>
    )
  } 
}


const mapDispatchToProps = dispatch =>({
  setCurrentUser : user => dispatch(setCurrentUser(user))
})

const mapStateToProps = state =>({
  currentUser : state.user.currentUser
})

export default connect(mapStateToProps, mapDispatchToProps) (App);
