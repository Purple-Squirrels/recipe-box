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

  const [userName, setUserName] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  const loginApi = async (userNameParam) => {
    try {
      const fetchResponse = await fetch(`/user?user_name=${userNameParam}`);
      const data = await fetchResponse.json();
      if (data.nodeStatus === 200) {
          setAuthTokens({authTokens: "abcdefg"});
          setSessionCookie({ userName });
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
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="User Name"
          name="user_name"
          autoComplete="use_name"
          autoFocus
          onKeyDown={(e) => {
            if (e.key !== 'Enter') { return; };
            loginApi(userName);
            setUserName('');
            e.target.value = '';
          }}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={formClasses.submit}
          onClick={(e) => {
            loginApi(userName);
            document.getElementById('email').value = '';
            context.setCurrentUserName(userName.toString());
          }}
        >
          Sign In
        </Button>
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