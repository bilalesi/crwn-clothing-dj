import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustumButton from '../custom-button/custom-button.component';

import './sign-in.styles.scss';

import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions';
import {connect} from 'react-redux';


const SignIn = ({emailSignInStart,googleSignInStart}) =>{
    const [userCredentials, setCredentials] = useState({email : '', password : ''});
    const {email, password} = userCredentials;
    const handleSubmit = async (event) =>{
        event.preventDefault();        
        emailSignInStart({email, password});      
    }
    const handleChange = (event) =>{
        const {value, name} = event.target;
        setCredentials({...userCredentials, [name] : value})        
    }
    return (
            <div className='sign-in'>
                <h2 className=''>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={handleSubmit}>

                    <FormInput 
                        name='email' 
                        type='email' 
                        value={email} 
                        required 
                        handleChange={handleChange} 
                        label='email'
                    />
                    <FormInput 
                        name='password' 
                        type='password' 
                        value={password} 
                        required 
                        handleChange={handleChange} 
                        label='password'
                    />
                    <div className='buttons'>
                        <CustumButton type='submit'>Sign In</CustumButton>
                        <CustumButton type='button' onClick={googleSignInStart} isGoogleSignIn>Sign In With Google</CustumButton>
                    </div>
                    
                </form>
            </div>
        );
    }



const mapDispatchToProps = (dispatch) =>({
    googleSignInStart : () => dispatch(googleSignInStart()),
    emailSignInStart : (email, password) => dispatch(emailSignInStart({email, password}))
})
export default connect(null, mapDispatchToProps)(SignIn);
