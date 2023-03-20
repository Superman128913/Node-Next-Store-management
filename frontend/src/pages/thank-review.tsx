/* eslint-disable react/no-unescaped-entities */
import { withMainLayoutPage } from '@/modules/shared/components/layouts/page/Main';

import React from 'react';
import {
  Box,
  Grid,
  Typography
} from '@mui/material';
import AccountLayout from '@/layouts/account-layout';
import SVG from '@/modules/shared/components/base/Image/SVG';
import thankSVG from '#/images/svg/thank_review.svg';

const ThankReview = () => {
  return (
    <AccountLayout>
      <Grid container spacing={0} className="MuiCardHeader-action">
        <Grid item xs={12} lg={4}></Grid>
        <Grid item xs={12} lg={4} pt={12}>
          <Typography variant="h1" align="center" color={'red'} sx={{ fontSize: 45 }}>Thank you for your review</Typography>
          <Box p={5} alignItems="center">
            <SVG fill="currentColor" src={thankSVG} size={'100%'} />
          </Box>
          <Typography variant="h2" align="center">Just sent email for verification</Typography>          
          <Typography variant="h2" align="center">Please check and verify</Typography>
        </Grid>
        <Grid item xs={12} lg={4}></Grid>
      </Grid>
    </AccountLayout>
  );
};

export default withMainLayoutPage(ThankReview, {
  title: 'Success'
});
