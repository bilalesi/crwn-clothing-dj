import React, { Component } from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCartItems} from '../../redux/cart/cart.selectors';
import {withRouter} from 'react-router-dom';

import './cart-dropdown.styles.scss';

import CartItem from '../cart-item/cart-item.component'

import CustomButton from "../custom-button/custom-button.component";
import {toggleCartHidden} from '../../redux/cart/cart.actions';

const CartDropdown = ({hiddenCartDropdown, cartItems, history, dispatch}) =>(
    <div className='cart-dropdown'>
        
        <div className='cart-items'>
            {
                cartItems.length ?
                cartItems.map((cartItem, ind) => 
                    (<CartItem key={cartItem.id} item={cartItem}/>))
                    :
                    (<span className='empty-message'>Your Cart is Empty</span>)
                
            }
            {}
        </div>
        <CustomButton 
            onClick={
                () => {
                    history.push('/checkout');
                    dispatch(toggleCartHidden());
                }
                
            }>
        GO TO CHECKOUT</CustomButton>
    </div>
)


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));