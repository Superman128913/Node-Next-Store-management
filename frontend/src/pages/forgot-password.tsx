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
import { resetPassword } from '@/services/AuthServices';
import Toast from '@/components/Toast';
import emailValidation from '@/helper/validateEmail';

const ForgotPassword = () => {
  const [firstEmailUpdate, setFirstEmailUpdate] = useState(true);
  const [UEmail, SetUEmail] = useState('');

  const [emailError, SetEmailError] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState('');

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

  useEffect(() => {
    ValidateEmail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UEmail]);

  const handleKeypress = event => {
    //it triggers by pressing the enter key
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      ResetPassword();
    }
  };

  const ResetPassword = async() => {
    const validEmail = ValidateEmail();
    if (validEmail) {
      const data = {
        email: UEmail
      };
      resetPassword(data).then(async(result) => {
        const Data = await result;
        if (Data?.Error) {
          Toast('error', Data.Error);
        } else {
          Toast('success', 'Changed password successfully.');
          Router.push('/password-changed');
        }
      });
    }
  };

  return (
    <AccountLayout>
      <Grid container spacing={0} className="MuiCardHeader-action">
        <Grid item xs={12} lg={4}></Grid>
        <Grid item xs={12} lg={4} pt={12}>
          <Card>
            <Box p={2} alignItems="center">
              <Typography variant="h2">Forgot your password?</Typography>
              <Typography mt={2} variant="h5" color="textSecondary">
                Please enter the email address associated with your account and We will email you a link to reset your password.
              </Typography>
            </Box>
            <CardContent>
              <Stack spacing={4}>
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
                <Stack spacing={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => ResetPassword()}
                  >
                    Rest Password
                  </Button>
                  <Button onClick={() => Router.push('/login')} color="secondary" size="large">
                    Bact to Login
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}></Grid>
      </Grid>
    </AccountLayout>
  );
};

export default withMainLayoutPage(ForgotPassword, {
  title: 'Forgot Password'
});
