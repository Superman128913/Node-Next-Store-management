/* eslint-disable react/no-unescaped-entities */
import { withMainLayoutPage } from '@/modules/shared/components/layouts/page/Main';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import {
  Box,
  Grid,
  CircularProgress,
  Stack
} from '@mui/material';
import AccountLayout from '@/layouts/account-layout';
import SVG from '@/modules/shared/components/base/Image/SVG';
import verifiedSVG from '#/images/svg/verified.svg';
import failedSVG from '#/images/svg/failed.svg';
import { verifyEmail } from '@/services/ReviewServices';
import Toast from '@/components/Toast';

const SuccessVerify = () => {
  const { query } = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(true);

  const VerifyEmail = async(token: string) => {
    verifyEmail(token).then(async(result) => {
      const Data = await result;
      if (Data) {
        setIsLoading(false);
        if (Data.Error) {
          Toast('error', Data.Error);
          setFailed(true);
        } else {
          setFailed(false);
        }
      } else {
        setIsLoading(true);
      }
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error } = useSWR(
    () => query.token,
    VerifyEmail
  );
  
  if (isLoading)
  {
    return (
      <AccountLayout>
        <Stack height={'100%'} alignItems="center">
          <CircularProgress size={250} variant="indeterminate" sx={{ marginTop: '15%' }}></CircularProgress>
        </Stack>
      </AccountLayout>
    );
  }
  else
  {
    return (
      <AccountLayout>
        <Grid container spacing={0} className="MuiCardHeader-action">
          <Grid item xs={12} lg={4}></Grid>
          <Grid item xs={12} lg={4} pt={12}>
            <Box p={5} alignItems="center">
              <SVG fill="currentColor" src={failed ? failedSVG : verifiedSVG} size={'100%'} />
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}></Grid>
        </Grid>
      </AccountLayout>
    );
  }
};

export default withMainLayoutPage(SuccessVerify, {
  title: 'Email Verification'
});
