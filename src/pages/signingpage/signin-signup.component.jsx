import React, { Component } from 'react';
import './signin-signup.styles.scss';

import SignIn from '../../components/sign-in/sign-in.component';

const signInSignUpPage = () => {
    return(
        <div className='sign-in-sign-up'>
            <SignIn/>
        </div>
    )
}

export default signInSignUpPage;