import React from 'react';
import NavBar from '../Navbar/NavBar';
import './Layout.css';

const Layout = (props) => {
    return (
        <>
            <NavBar />
            <main className="Content">
                {props.children}
            </main>
        </>
    )
}

export default Layout;