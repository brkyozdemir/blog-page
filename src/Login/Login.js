import React, { useState } from 'react';
import { Paper, TextField, makeStyles, Button } from '@material-ui/core';
import * as api from '../api/index';
import { useSnackbar } from 'notistack';
import { useRecoilState } from 'recoil';
import { tokenState } from '../States/States';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1, 3),
        width: "500px",
        margin: "0 auto"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "100%",
        margin: "15px 0"
    },
    span: {
        margin: theme.spacing(1),
        color: "#3f51b5",
        fontWeight: 600,
        border: "1px solid #3f51b5",
        padding: "6px",
        borderRadius: "4px"
    },
    button: {
        margin: theme.spacing(1),
    },
    control: {
        color: "salmon",
        fontSize: "10px",
        width: "100%",
        position: "absolute"
    }
}));

const Login = () => {
    const classes = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useRecoilState(tokenState);

    const handleChangeUsername = e => {
        setUsername(e.target.value)
    }

    const handleChangePassword = e => {
        setPassword(e.target.value);
    }

    const [userControl, setUserControl] = useState(false);
    const [passControl, setPassControl] = useState(false);
    const login = async () => {
        username === '' ? setUserControl(true) : setUserControl(false);
        password === '' ? setPassControl(true) : setPassControl(false);
        if (username !== '' && password !== '') {
            const data = {
                email: username,
                password: password
            }
            const response = await api.login(data);
            if (response.message !== "Auth failed!") {
                localStorage.setItem('tokenjwt', response.token)
                setToken(response.token);
            }
            response.message !== "Auth failed!" ? enqueueSnackbar(response.message, { variant: 'success' }) : enqueueSnackbar(response.message, { variant: 'error' });
        }
    }

    if (token !== "token") {
        return <Redirect to="/posts/send" />
    }

    return (
        <Paper className={classes.root}>
            <form className="post-form">
                <TextField
                    id="standard-username"
                    label="Username"
                    className={classes.textField}
                    value={username}
                    onChange={handleChangeUsername}
                    margin="normal"
                />
                {userControl ? <span className={classes.control}>{"Username field is required"}</span> : ""}<br />
                <TextField
                    id="standard-password"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    value={password}
                    onChange={handleChangePassword}
                    margin="normal"
                />
                {passControl ? <span className={classes.control}>{"Password field is required"}</span> : ""}<br />
                <Button onClick={() => login()} style={{ width: "100%" }} variant="outlined" color="secondary" className={classes.button}>
                    Login
                </Button>
            </form>
        </Paper>
    )
}

export default Login;