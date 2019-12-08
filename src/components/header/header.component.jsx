import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import {auth} from '../../firebase/firebase.utils';

import {ReactComponent as Logo} from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import './header.styles.scss';

const Header = ({currentUser, hidden}) => {
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
                        <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
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

const mapStateToProps = ({user : {currentUser}, cart : {hidden}}) => ({
    currentUser : currentUser,
    hidden: hidden
})

export default connect(mapStateToProps)(Header);