import React, { useState } from 'react';
import { Paper, TextField, makeStyles, Button } from '@material-ui/core';
import * as api from '../api/index';
import { useSnackbar } from 'notistack';
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

const Signup = () => {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordReq, setPasswordReq] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleChangeUsername = e => {
    setUsername(e.target.value)
  }

  const handleChangePassword = e => {
    setPassword(e.target.value);
  }

  const handlePasswordReqChange = e => {
    setPasswordReq(e.target.value)
  }

  const [userControl, setUserControl] = useState(false);
  const [passControl, setPassControl] = useState(false);
  const signup = async () => {
    username.length < 3 ? setUserControl(true) : setUserControl(false);
    password.length < 6 ? setPassControl(true) : setPassControl(false);
    if (username.length > 3 && password.length > 6 && passwordReq !== '') {
      const data = {
        email: username,
        password: password
      }
      const response = await api.signup(data);
      response.message === "User created!" ? enqueueSnackbar(response.message, { variant: 'success' }) : enqueueSnackbar(response.error._message, { variant: 'error' });
      setRedirect(true)
    }
  }

  if (redirect) {
    return <Redirect to="/login" />
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
        {userControl ? <span className={classes.control}>{"Username field needs to be longer than 3!"}</span> : ""}<br />
        <TextField
          id="standard-password"
          label="Password"
          className={classes.textField}
          type="password"
          value={password.password}
          onChange={handleChangePassword}
          margin="normal"
        />
        {passControl ? <span className={classes.control}>{"Password field needs to be longer than 6!"}</span> : ""}<br />
        <TextField
          id="standard-passwordReq"
          label="Re-enter Password"
          className={classes.textField}
          type="password"
          value={password.passwordReq}
          onChange={handlePasswordReqChange}
          margin="normal"
        />
        <Button onClick={() => signup()} disabled={passwordReq !== '' && password === passwordReq ? false : true} style={{ width: "100%" }} variant="outlined" color="secondary" className={classes.button}>
          Sign Up
        </Button>
        {passwordReq !== '' && password !== passwordReq ? <span className={classes.control}>{"Password fields did not match!"}</span> : ""}<br />
      </form>
    </Paper>
  )
}

export default Signup;