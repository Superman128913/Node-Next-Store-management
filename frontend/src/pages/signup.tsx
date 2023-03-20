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
import MuiPhoneNumber from 'material-ui-phone-number';
import FeatherIcon from 'feather-icons-react';
import AccountLayout from '@/layouts/account-layout';
import SVG from '@/modules/shared/components/base/Image/SVG';
import LoginBG from '#/images/backgrounds/login-bg.svg';
import Toast from '@/components/Toast';
import { signUp } from '@/services/AuthServices';
import emailValidation from '@/helper/validateEmail';

const Signup = () => {
  const [firstNameUpdate, setFirstNameUpdate] = useState(true);
  const [firstEmailUpdate, setFirstEmailUpdate] = useState(true);
  const [firstPhoneUpdate, setFirstPhoneUpdate] = useState(true);
  const [firstPassUpdate, setFirstPassUpdate] = useState(true);

  const [UName, SetUName] = useState('');
  const [UEmail, SetUEmail] = useState('');
  const [UPhone, SetUPhone] = useState('');
  const [UPass, SetUPass] = useState('');
  const [URepass, SetURepass] = useState('');

  const [nameError, SetNameError] = useState(false);

  const [emailError, SetEmailError] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState('');

  const [phoneError, SetPhoneError] = useState(false);

  const [passError, SetPassError] = useState(false);
  const [passErrorText, SetPassErrorText] = useState('');

  const ValidateName = () => {
    if (firstNameUpdate) {
      setFirstNameUpdate(false);
      return false;
    }
    if (!UName) {
      SetNameError(true);
      return false;
    } else {
      SetNameError(false);
      return true;
    }
  };

  const SetName = (data) => {
    SetUName(data);
  };

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

  const ValidatePhone = () => {
    if (firstPhoneUpdate) {
      setFirstPhoneUpdate(false);
      return false;
    }
    if (!UPhone) {
      // Toast('warning', 'Password doesn\'t match with conformation');
      SetPhoneError(true);
      return false;
    } else {
      SetPhoneError(false);
      return true;
    }
  };

  const SetPhone = (data) => {
    SetUPhone(data);
  };

  const ValidatePassword = () => {
    if (firstPassUpdate) {
      setFirstPassUpdate(false);
      return false;
    }
    if (!UPass) {
      SetPassError(true);
      SetPassErrorText('* Please insert Password.');
      return false;
    } else {
      if (UPass !== URepass) {
        SetPassError(true);
        SetPassErrorText('Password doesn\'t match with conformation.');
        return false;
      } else {
        SetPassError(false);
        SetPassErrorText('');
        return true;
      }
    }
  };

  const SetPass = (data) => {
    SetUPass(data);
  };

  const SetRepass = (data) => {
    SetURepass(data);
    ValidatePassword();
  };

  const Register = async() => {
    const validName = ValidateName();
    const validEmail = ValidateEmail();
    const valiePhone = ValidatePhone();
    const validPass = ValidatePassword();
    if (validName && validEmail && valiePhone && validPass) {
      const data = {
        name: UName,
        email: UEmail,
        phone: UPhone,
        password: UPass
      };
      signUp(data).then(async(result) => {
        const Data = await result;
        if (Data?.Error) {
          Toast('error', Data.Error);
        } else {
          Toast('success', 'Registered new user successfully.');
          localStorage.setItem('User' , JSON.stringify(Data.User));
          Router.push('/request-verify');
        }
      });
    }
  };

  useEffect(() => {
    ValidateName();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UName]);

  useEffect(() => {
    ValidateEmail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UEmail]);

  useEffect(() => {
    ValidatePhone();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UPhone]);

  useEffect(() => {
    ValidatePassword();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UPass, URepass]);

  const handleKeypress = event => {
    //it triggers by pressing the enter key
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      Register();
    }
  };

  return (
    <AccountLayout>
      <Grid container spacing={0} className="MuiCardHeader-action">
        <Grid item xs={12} lg={6} alignItems="center">
          <SVG fill="currentColor" src={LoginBG} size={'100%'} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <Box p={2} alignItems="center">
              <Typography variant="h2">Sign Up</Typography>
              <Box display="flex">
                <Typography mt={1} variant="h6" color="textSecondary">
                  Already have account?
                </Typography>
                <Button color="primary" onClick={() => Router.push('/login')}>Sign In</Button>
              </Box>
            </Box>
            <CardContent>
              <Stack spacing={2}>
                <Stack spacing={1}>
                  <Typography variant="h6">
                    Full Name
                  </Typography>
                  <TextField
                    error={nameError}
                    helperText={nameError && '* Please insert Full Name.'}
                    placeholder="ex: Steve Jobs"
                    type="text"
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <FeatherIcon
                            icon={'user'}
                          />
                        </InputAdornment>
                      )
                    }}
                    onKeyPress={handleKeypress}
                    onChange={(e) => SetName(e.target.value)}
                  />
                </Stack>
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
                    Phone Number
                  </Typography>
                  <MuiPhoneNumber
                    error={phoneError}
                    helperText={phoneError && '* Please insert Phone Number.'}
                    defaultCountry={'us'}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <FeatherIcon
                            icon={'smartphone'}
                          />
                        </InputAdornment>
                      )
                    }}
                    onKeyPress={handleKeypress}
                    onChange={SetPhone}
                  />
                </Stack>
                <Stack spacing={1}>
                  <Typography variant="h6">
                    Password
                  </Typography>
                  <TextField
                    error={passError}
                    helperText={passErrorText}
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
                <Stack spacing={1}>
                  <Typography variant="h6">
                    Password Confirmation
                  </Typography>
                  <TextField
                    error={passError}
                    id="re-pass"
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
                    onChange={(e) => SetRepass(e.target.value)}
                  />
                </Stack>
              </Stack>
              <Stack pt={4}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => Register()}
                >
                  Sign Up
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AccountLayout>
  );
};

export default withMainLayoutPage(Signup, {
  title: 'Sign Up'
});
