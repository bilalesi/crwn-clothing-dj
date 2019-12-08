import React, { Component } from 'react';
import './custom-button.styles.scss';

const CustumButton = ({children,isGoogleSignIn, inverted, ...otherProps}) =>{
    return(
        <button 
            className={
                `${inverted ? 'inverted' : ''}
                ${isGoogleSignIn ? 'google-sign-in' : ''} 
                custom-button`
            } 
            {...otherProps}>
            {children}
        </button>
    )
}

export default CustumButton;