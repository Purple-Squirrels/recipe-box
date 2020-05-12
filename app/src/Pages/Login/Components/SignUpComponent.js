import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Redirect } from "react-router-dom";
import AppContext from '../../../Context/app-context';
import globalFormStyles from '../../../GlobalFormStyles';

const useStyles = makeStyles(theme => ({
  avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
  }
}));

export default (props) => {
  const classes = useStyles();
  const formClasses = globalFormStyles();

  const context = useContext(AppContext);
  const [userName, setUserName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [redirectFire, setRedirectFire] = useState(false);

  const handleSubmit = (e) => {
      e.preventDefault();
      if(userName !== ''){
          setErrorMsg('');
          alert(`Submitting name ${userName}`)
          signUpAPI(userName);
          context.setConnectMessenger(true);
      }
      else{
          setErrorMsg('Cannot leave user name blank');
      }
  };

  const signUpAPI = async (userNameParam) => {
      const data = {
          userName:userNameParam
      };

      const settings = {
          method:'POST',
          headers:{
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
      }

      try{
          const fetchResponse = await fetch(`/user`, settings);
          const data = await fetchResponse.json();
          if(data.nodeStatus === 200){
              setRedirectFire(true);
          }else if(data.nodeStatus === 400){
              alert(`Unable to add account for ${userNameParam}`)
          }else{
              alert(`Unknown error...this site is broken:(`)
          }
          return;
      }catch(err){
          return err;
      };
  };

  if (redirectFire) {
    return <Redirect push to="/dashboard" />
  };

  return(
    <Container component="main" maxWidth="xs">
    <CssBaseline />
      <div className={formClasses.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={formClasses.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="user_name"
                label="User Name"
                name="user_name"
                autoComplete="user_name"
                helperText = {errorMsg}
                onChange={e => setUserName(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={formClasses.submit}
            onClick = {() =>
            {context.setCurrentUserName(userName.toString());}}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link variant="body2" onClick={() => context.setDisplaySignUp(false)}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};