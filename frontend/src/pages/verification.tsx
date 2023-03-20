/* eslint-disable react/no-unescaped-entities */
import { withMainLayoutPage } from '@/modules/shared/components/layouts/page/Main';

import Router, { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Stack,
  TextField,
  Card,
  CardContent,
  Button,
  Typography
} from '@mui/material';
import AccountLayout from '@/layouts/account-layout';
import { verifyAccount } from '@/services/AuthServices';
import Toast from '@/components/Toast';

const Verify = () => {
  const [firstCodeUpdate, setFirstCodeUpdate] = useState(true);
  const [UCode, SetUCode] = useState('');
  const [codeError, SetCodeError] = useState(false);

  const { query } = useRouter();

  const verify = async() => {
    const loggedUser = localStorage.getItem('User');
    if (loggedUser && loggedUser != undefined) {
      const user_email = JSON.parse(loggedUser)['email'];
      const data = {
        email: user_email,
        code: UCode
      };
      verifyAccount(data).then(async(result) => {
        const Data = await result;
        if (Data?.Error) {
          Toast('error', Data.Error);
        } else {
          Router.push('/success-verify');
        }
      });
    }
  };

  const ValidateCode = () => {
    if (firstCodeUpdate) {
      setFirstCodeUpdate(false);
      return false;
    }
    if (!UCode) {
      // Toast('warning', 'Password doesn\'t match with conformation');
      SetCodeError(true);
      return false;
    } else {
      SetCodeError(false);
      return true;
    }
  };

  const SetCode = (data) => {
    SetUCode(data);
  };

  useEffect(() => {
    ValidateCode();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UCode]);

  const handleKeypress = event => {
    //it triggers by pressing the enter key
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      verify();
    }
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
            </Box>
            <CardContent>
              <Stack spacing={4}>
                <Stack spacing={1}>
                  <Typography variant="h6">
                    A text message with a 6-digit verification code was just sent to your { query.mode }
                  </Typography>
                  <TextField
                    error={codeError}
                    helperText={codeError && '* Please insert Verificiation Code.'}
                    type="tel"
                    label="Enter verification Code"
                    variant="outlined"
                    onKeyPress={handleKeypress}
                    onChange={(e) => SetCode(e.target.value)}
                  />
                </Stack>
                <Stack spacing={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => verify()}
                  >
                    Verify
                  </Button>
                  <Button onClick={() => Router.push('/signup')} color="secondary" size="large">
                    Bact to Signup
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

export default withMainLayoutPage(Verify, {
  title: 'Verification'
});
