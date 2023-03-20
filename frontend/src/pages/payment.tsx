import { withMainLayoutPage } from '@/modules/shared/components/layouts/page/Main';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Grid
} from '@mui/material';
import SVG from '@/modules/shared/components/base/Image/SVG';
import verifiedSVG from '#/images/svg/verified.svg';
import failedSVG from '#/images/svg/failed.svg';
import FullLayout from '@/layouts/full-layout';
import Toast from '@/components/Toast';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const Payment = () => {
  const [failed, setFailed] = useState(true);
  
  const { query } = useRouter();
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    if (query?.success) {
      setFailed(false);
      Toast('success', 'Order placed! You will receive an email confirmation.');
    }
    else if (query?.canceled) {
      setFailed(true);
      Toast('error', 'Order canceled!');
    }
  }, [query]);

  return (
    <FullLayout>
      <Grid container spacing={0} className="MuiCardHeader-action">
        <Grid item xs={12} lg={4}></Grid>
        <Grid item xs={12} lg={4} pt={12}>
          <Box p={5} alignItems="center">
            <SVG fill="currentColor" src={failed ? failedSVG : verifiedSVG} size={'100%'} />
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}></Grid>
      </Grid>
    </FullLayout>
  );
};

export default withMainLayoutPage(Payment, {
  title: 'Checkout'
});
