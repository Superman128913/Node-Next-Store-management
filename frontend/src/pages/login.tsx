/* eslint-disable react/no-unescaped-entities */
import { withMainLayoutPage } from '@/modules/shared/components/layouts/page/Main';

import Router from 'next/router';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Stack,
  TextField,
  Card,
  CardContent,
  Button,
  Typography,
  InputAdornment
} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import AccountLayout from '@/layouts/account-layout';
import SVG from '@/modules/shared/components/base/Image/SVG';
import LoginBG from '#/images/backgrounds/login-bg.svg';
import { logIn } from '@/services/AuthServices';
import Toast from '@/components/Toast';
import emailValidation from '@/helper/validateEmail';

const Login = () => {
  const [firstEmailUpdate, setFirstEmailUpdate] = useState(true);
  const [firstPassUpdate, setFirstPassUpdate] = useState(true);

  const [UEmail, SetUEmail] = useState('');
  const [UPass, SetUPass] = useState('');

  const [emailError, SetEmailError] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState('');

  const [passError, SetPassError] = useState(false);

  const ValidateEmail = () => {
    if (firstEmailUpdate) {
      setFirstEmailUpdate(false);
      return false;
    }
    if (!UEmail) {
      setEmailErrMsg('Please insert Email Address.');
      SetEmailError(true);
      return false;
    } else {
      if (!emailValidation(UEmail)) {
        setEmailErrMsg('This is not Email Address.');
        SetEmailError(true);
        return false;
      } else {
        SetEmailError(false);
        setEmailErrMsg('');
        return true;
      }
    }
  };

  const SetEmail = (data) => {
    SetUEmail(data);
  };

  const ValidatePassword = () => {
    if (firstPassUpdate) {
      setFirstPassUpdate(false);
      return false;
    }
    if (!UPass) {
      SetPassError(true);
      return false;
    } else {
      SetPassError(false);
      return true;
    }
  };

  const SetPass = (data) => {
    SetUPass(data);
  };

  useEffect(() => {
    ValidateEmail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UEmail]);

  useEffect(() => {
    ValidatePassword();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UPass]);

  const Login = async() => {
    const validEmail = ValidateEmail();
    const validPass = ValidatePassword();
    if (validEmail && validPass) {
      const data = {
        email: UEmail,
        password: UPass
      };
      logIn(data).then(async(result) => {
        const Data = await result;
        if (Data?.Error) {
          Toast('error', Data.Error);
        } else {
          Toast('success', 'Logged in successfully.');
          localStorage.setItem('User', JSON.stringify(Data.User));
          localStorage.setItem('Token', JSON.stringify(Data.Token));
          Router.push('/');
        }
      });
    }
  };

  const handleKeypress = event => {
    //it triggers by pressing the enter key
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      Login();
    }
  };

  return (
    <AccountLayout>
      <Grid container spacing={0} className="MuiCardHeader-action">
        <Grid item xs={12} lg={6} alignItems="center">
          <SVG fill="currentColor" src={LoginBG} size={'100%'} />
        </Grid>
        <Grid item xs={12} lg={6} pt={12}>
          <Card>
            <Box p={2} alignItems="center">
              <Typography variant="h2">Log In</Typography>
              <Box display="flex">
                <Typography mt={1} variant="h6" color="textSecondary">
                  Don't have account?
                </Typography>
                <Button color="primary" onClick={() => Router.push('/signup')}>Create an account</Button>
              </Box>
            </Box>
            <CardContent>
              <Stack spacing={2}>
                <Stack spacing={1}>
                  <Typography variant="h6">
                    Email Address
                  </Typography>
                  <TextField
                    error={emailError}
                    helperText={emailErrMsg}
                    placeholder="ex: test@gmail.com"
                    type="email"
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <FeatherIcon
                            icon={'mail'}
                          />
                        </InputAdornment>
                      )
                    }}
                    onKeyPress={handleKeypress}
                    onChange={(e) => SetEmail(e.target.value)}
                  />
                </Stack>
                <Stack spacing={1}>
                  <Typography variant="h6">
                    Password
                  </Typography>
                  <TextField
                    error={passError}
                    helperText={passError && '* Please insert Password.'}
                    id="pass"
                    placeholder="ex: P@ssw0rd"
                    type="password"
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <FeatherIcon
                            icon={'lock'}
                          />
                        </InputAdornment>
                      )
                    }}
                    onKeyPress={handleKeypress}
                    onChange={(e) => SetPass(e.target.value)}
                  />
                </Stack>
                <Stack spacing={2}>
                  <Typography mt={2} color="primary" align="right">
                    <Button onClick={() => Router.push('/forgot-password')}>Forgot Password?</Button>
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => Login()}
                  >
                    Log In
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AccountLayout>
  );
};

export default withMainLayoutPage(Login, {
  title: 'Log In'
});
