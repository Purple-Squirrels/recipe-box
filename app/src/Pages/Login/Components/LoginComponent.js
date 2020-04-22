import React, { useState, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from "react-router-dom";
import globalFormStyles from '../../../GlobalFormStyles';
import AppContext from '../../../Context/app-context';
import { setSessionCookie } from '../../../Sessions';
import { useAuth } from "../../../Context/auth";

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  }
}));

export default () => {
  const classes = useStyles();
  const formClasses = globalFormStyles();
  const context = useContext(AppContext);
  const { setAuthTokens } = useAuth();

  const [username, setUsername] = useState(0);
  const [password, setPassword] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  const loginApi = async () => {
    const details = {
        username: username,
        password: password,
    };

    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
    };

    try {
      // const fetchResponse = await fetch(`/user?user_name=${userNameParam}`);
      const fetchResponse = await fetch(`/login`, settings);
      const data = await fetchResponse.json();

      if (data.nodeStatus === 200) {
          setAuthTokens({authTokens: "abcdefg"});
          setLoggedIn(true);
      } else if (data.nodeStatus === 401) {
        window.alert("You need to create an account Brah. Create an account or go to another site, Tanks :)");
      } else if (data.nodeStatus === 404) {
        window.alert("Something is busted on the server try again never :)");
      }
      return;
    } catch (err) {
      return err;
    }
  };

  if (loggedIn) {
    return <Redirect push to="/dashboard" />
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={formClasses.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
          <form className={formClasses.form} onSubmit={loginApi}>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  autoFocus
                  onChange={e => setUsername(e.target.value)}/>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  autoFocus
                  type="password"
                  onChange={e => setPassword(e.target.value)}/>
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={formClasses.submit}>
                  Sign In
              </Button>
          </form>


        <Grid container>
          <Grid item>
            <Link variant="body2" onClick={ () => context.setDisplaySignUp(true) } >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};