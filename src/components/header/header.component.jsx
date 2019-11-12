import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';


import {ReactComponent as Logo} from '../../assets/crown.svg';

import './header.styles.scss';

const Header = () => {
    return(
        <div className='header'>
            <NavLink exact to='/' className='logo-container'>
                <Logo className='logo'/>
            </NavLink>
            <div className='options'>
                <NavLink exact to='/shop' className='option'>SHOP</NavLink>
                <NavLink exact to='/contact' className='option'>CONTACT</NavLink>                
            </div>
        </div>
    )
}

export default Header;