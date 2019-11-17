import React, { Component } from 'react';
import FormInput from '../form-input/form-input.component';
import CustumButton from '../custom-button/custom-button.component';

import './sign-in.styles.scss';

import {signInWithGoogle} from '../../firebase/firebase.utils';

class SignIn extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        this.setState({
            email:'',
            password:''
        })
    }
    handleChange = (event) =>{
        const {value, name} = event.target;
        this.setState(
            {
                [name] : value
            }
        )
    }
    render() {
        return (
            <div className='sign-in'>
                <h2 className=''>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>

                    <FormInput name='email' type='email' value={this.state.email} required handleChange={this.handleChange} label='email'/>
                    <FormInput name='password' type='password' value={this.state.password} required handleChange={this.handleChange} label='password'/>
                    <div className='buttons'>
                        <CustumButton type='submit'>Sign In</CustumButton>
                        <CustumButton onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustumButton>
                    </div>
                    
                </form>
            </div>
        );
    }
}

export default SignIn;
