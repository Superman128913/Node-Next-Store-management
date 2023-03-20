/* eslint-disable react/no-unescaped-entities */
import { withMainLayoutPage } from '@/modules/shared/components/layouts/page/Main';

import Router from 'next/router';
import React from 'react';
import {
  Box,
  Grid,
  Stack,
  Card,
  CardContent,
  Button,
  Typography
} from '@mui/material';

import AccountLayout from '@/layouts/account-layout';
import { verifyByEmail } from '@/services/AuthServices';
import Toast from '@/components/Toast';

const RequestVerify = () => {
  const sendToEmail = async() => {
    const loggedUser = localStorage.getItem('User');
    if (loggedUser && loggedUser != undefined) {
      const user_email = JSON.parse(loggedUser)['email'];
      const data = {
        email: user_email
      };
      verifyByEmail(data).then(async(result) => {
        const Data = await result;
        if (Data?.Error) {
          Toast('error', Data.Error);
        } else {
          Router.push('/verification?mode=email');
        }
      });
    }
  };
  const sendToPhone = async() => {
    Toast('error', 'We don\'t have this feature yet.');
  };

  return (
    <AccountLayout>
      <Grid container spacing={0} className="MuiCardHeader-action">
        <Grid item xs={12} lg={4}></Grid>
        <Grid item xs={12} lg={4} pt={12}>
          <Card>
            <Box p={2} alignItems="center">
              <Typography variant="h2">Verify it’s you</Typography>
              <Typography mt={2} variant="h5" color="textSecondary">
                To active your account we need to vaildate your email address or phone number
              </Typography>
              <Typography mt={1} variant="h5" color="textSecondary">
                You can get verification code by either your email or phone
              </Typography>
            </Box>
            <CardContent>
              <Stack spacing={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="primary"
                      size="large"
                      onClick={() => sendToEmail()}
                    >
                      Email
                    </Button>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="primary"
                      size="large"
                      onClick={() => sendToPhone()}
                    >
                      Phone
                    </Button>
                  </Grid>
                </Grid>
                <Button onClick={() => Router.push('/signup')} color="secondary" size="large">
                  Bact to Signup
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}></Grid>
      </Grid>
    </AccountLayout>
  );
};

export default withMainLayoutPage(RequestVerify, {
  title: 'Send Request'
});
