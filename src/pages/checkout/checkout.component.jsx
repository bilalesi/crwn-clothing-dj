import React, { Component } from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect'
import './checkout.styles.scss';

import CheckoutItem from '../../components/checkout-item/checkout.component';

import {selectCartItems, selectCartTotal} from '../../redux/cart/cart.selectors';

const Checkout = ({cartItems, total}) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className ='header-block'>
                <span>product</span>
            </div>
            <div className ='header-block'>
                <span>Description</span>
            </div>
            <div className ='header-block'>
                <span>Quantity</span>
            </div>
            <div className ='header-block'>
                <span>Price</span>
            </div>
            <div className ='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)
        }

        <div className='total'>
            <span className='total'>TOTAL : ${total}</span>
        </div>
    </div>
)


const mapStateToProps = createStructuredSelector({
    cartItems : selectCartItems,
    total : selectCartTotal
})


export default connect(mapStateToProps)(Checkout);