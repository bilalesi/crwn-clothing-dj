import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import {auth} from '../../firebase/firebase.utils';

import {ReactComponent as Logo} from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({currentUser}) => {
    return (
        <div className='header'>
            <NavLink exact to='/' className='logo-container'>
                <Logo className='logo'/>
            </NavLink>
            <div className='options'>
                <NavLink exact to='/shop' className='option'>SHOP</NavLink>
                <NavLink exact to='/contact' className='option'>CONTACT</NavLink>
                {console.log('current user:', currentUser)}
                {currentUser != null
                    ? (
                        <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                    )
                    : (
                        <NavLink className='option' to='/signin'>SIGN IN</NavLink>
                    )
}
            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUser : state.user.currentUser
})

export default connect(mapStateToProps)(Header);