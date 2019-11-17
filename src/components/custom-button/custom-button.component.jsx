import React, { Component } from 'react';
import './custom-button.styles.scss';

const CustumButton = ({children,isGoogleSignIn, ...otherProps}) =>{
    return(
        <button className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}>
            {children}
        </button>
    )
}

export default CustumButton;