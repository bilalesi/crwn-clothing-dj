import React, { Component } from 'react';
import MenuItem from '../menu-item/menu-item.component'
import { createStructuredSelector } from "reselect";

import {connect}  from  'react-redux';
import { selectDirectorySections } from "../../redux/directory/directory.selector";    
import './directory.styles.scss';

const Directory = ({sections}) => (
    
    <div className='directory-menu'>
        {
            sections.map(({id, ...otherSectionProps}) => {
                return <MenuItem key={id} {...otherSectionProps} />
            })
        }
        
    </div>
)


const mapStateToprops = createStructuredSelector({
    sections : selectDirectorySections
})

export default connect(mapStateToprops)(Directory);