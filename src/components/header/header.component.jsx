import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect'
import {auth} from '../../firebase/firebase.utils';

import {ReactComponent as Logo} from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectCartHidden} from '../../redux/cart/cart.selectors';

import {signOutStart} from '../../redux/user/user.actions';


import './header.styles.scss';

const Header = ({currentUser, hidden, signOutStart}) => {
    return (
        <div className='header'>
            <NavLink exact to='/' className='logo-container'>
                <Logo className='logo'/>
            </NavLink>
            <div className='options'>
                <NavLink exact to='/shop' className='option'>SHOP</NavLink>
                <NavLink exact to='/contact' className='option'>CONTACT</NavLink>
                
                {currentUser != null
                    ? (
                        <div className='option' onClick={signOutStart}>SIGN OUT</div>
                    )
                    : (
                        <NavLink className='option' to='/signin'>SIGN IN</NavLink>
                    )
                }
                <CartIcon/>
            </div>
            {
                hidden ? null:
                    <CartDropdown/>
            }
            

        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser : selectCurrentUser,
    hidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
    signOutStart : () => dispatch(signOutStart())
})


export default connect(mapStateToProps, mapDispatchToProps)(Header);