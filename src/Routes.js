import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Posts from './Posts';
import ListPosts from './ListPosts/ListPosts';
import Login from './Login/Login';
import Signup from './Login/Signup';

const Routes = () => {
    const [token, setToken] = React.useState(localStorage.getItem('tokenjwt') === null)

    return <>
        <Switch>
            <Route path="/posts/send" component={Posts} />
            <Route path="/posts/list" component={ListPosts} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />

            <Route>
                {token ? <Redirect to="/login" /> : <Redirect to="/posts/send" />}
            </Route>

        </Switch>
    </>
}

export default Routes;