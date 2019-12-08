import React, { Component } from 'react';
import {connect} from 'react-redux';

import './cart-dropdown.styles.scss';

import CartItem from '../cart-item/cart-item.component'

import CustomButton from "../custom-button/custom-button.component";

const CartDropdown = ({hiddenCartDropdown, cartItems}) =>(
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {cartItems.map((cartItem, ind) => 
                (<CartItem key={cartItem.id} item={cartItem}/>)
            )}
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
)


const mapStateToProps = ({cart : {cartItems}}) =>({
    cartItems: cartItems
})

export default connect(mapStateToProps)(CartDropdown);