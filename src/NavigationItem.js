import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationItem.css'

const navigationItem = ( props ) => (
    <li onClick={props.onClick} className="NavigationItem">
        <NavLink 
        className={props.className}
            to={props.link}>{props.children}</NavLink>
    </li>
);
    
export default navigationItem;