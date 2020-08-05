import React from 'react';
import NavigationItem from './NavigationItem';
import './NavigationItems.css';
import { useRecoilState } from 'recoil';
import { tokenState } from './States/States';
import { Redirect } from 'react-router-dom';

const NavigationItems = (props) => {
    const token = localStorage.getItem('tokenjwt') === null
    const [jwt, setJwt] = useRecoilState(tokenState);

    const handleSignout = () => {
        setJwt("token");
        localStorage.clear('tokenjwt')
    }

    return (
        <ul className="NavigationItems">
            {jwt !== "token" || !token ? <><NavigationItem link="/posts/send">New Post</NavigationItem>
                <NavigationItem link="/posts/list">Posts</NavigationItem>
                <NavigationItem className="signout" onClick={() => handleSignout()} link="/login">Sign Out</NavigationItem></> :
                <><NavigationItem link="/login">Login</NavigationItem>
                    <NavigationItem link="/signup">Sign up</NavigationItem></>}
        </ul>
    )
}

export default NavigationItems;