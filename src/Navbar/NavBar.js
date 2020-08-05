import React from 'react';
import NavigationItems from '../NavigationItems';
import './NavBar.css';

const NavBar = () => {
    return (
        <header className="NavBar">
            <div className="Logo">
                {/* <Logo /> */}
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default NavBar;