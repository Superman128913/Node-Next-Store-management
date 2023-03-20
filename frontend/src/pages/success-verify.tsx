/* eslint-disable react/no-unescaped-entities */
import { withMainLayoutPage } from '@/modules/shared/components/layouts/page/Main';

import Router from 'next/router';
import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Typography
} from '@mui/material';
import AccountLayout from '@/layouts/account-layout';

const SuccessVerify = () => {
  return (
    <AccountLayout>
      <Grid container spacing={0} className="MuiCardHeader-action">
        <Grid item xs={12} lg={4}></Grid>
        <Grid item xs={12} lg={4} pt={12}>
          <Card>
            <Box p={2} alignItems="center">
              <Typography variant="h2">Welcome</Typography>
              <Typography mt={3} variant="h5" color="textSecondary">
                Your verification was succeeded and your account was activated
              </Typography>
              <Typography mt={0} variant="h5" color="textSecondary">
                You can use your account from now
              </Typography>
            </Box>
            <CardContent>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => Router.push('/login')}
              >
                Go to login
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}></Grid>
      </Grid>
    </AccountLayout>
  );
};

export default withMainLayoutPage(SuccessVerify, {
  title: 'Success'
});
