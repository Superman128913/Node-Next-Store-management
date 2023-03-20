import { withMainLayoutPage } from '@/modules/shared/components/layouts/page/Main';
import React, { useState, useEffect, useRef } from 'react';
import Router, { useRouter } from 'next/router';

import {
  Grid,
  Stack,
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  Modal,
  Card,
  CardContent
} from '@mui/material';
import StarsRating from 'react-star-rate';
import FeatherIcon from 'feather-icons-react';
import BaseCard from '@/components/baseCard/BaseCard';
import AccountLayout from '@/layouts/account-layout';
import { addReview } from '@/services/ReviewServices';
import Toast from '@/components/Toast';
import { checkIfSecretcode, verifySecretcode } from '@/services/StoreServices';
import emailValidation from '@/helper/validateEmail';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+'
};

const CreateRReview = () => {
  const originUrl = useRef('');
  const [hover, setHover] = useState(-1);
  const [openSecretInput, SetOpenSecretInput] = useState(false);

  const [firstEmailUpdate, setFirstEmailUpdate] = useState(true);
  const [firstReviewUpdate, setFirstReviewUpdate] = useState(true);

  const [RPhone, setRPhone] = useState('');
  const [REmail, SetREmail] = useState('');
  const [RRating, SetRRating] = useState(5);
  const [RReview, SetRReview] = useState('');

  const [emailError, SetEmailError] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState('');

  const [reviewError, SetReviewError] = useState(false);
  const [UCode, SetUCode] = useState('');

  const { query } = useRouter();

  const ValidateEmail = () => {
    if (firstEmailUpdate) {
      setFirstEmailUpdate(false);
      return false;
    }
    if (!REmail) {
      setEmailErrMsg('Please insert Email Address.');
      SetEmailError(true);
      return false;
    } else {
      if (!emailValidation(REmail)) {
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

  useEffect(() => {
    ValidateEmail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [REmail]);

  const ValidateReview = () => {
    if (firstReviewUpdate) {
      setFirstReviewUpdate(false);
      return false;
    }
    if (!RReview) {
      SetReviewError(true);
      return false;
    } else {
      SetReviewError(false);
      return true;
    }
  };

  useEffect(() => {
    ValidateReview();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [RReview]);

  const AddReview = async() => {
    const validEmail = ValidateEmail();
    const validReview = ValidateReview();
    const store_id = query.id;

    if (validEmail && validReview) {
      const data = {
        store_id: store_id,
        email: REmail,
        phone: RPhone,
        rating: RRating,
        review: RReview
      };
      if (openSecretInput) {
        verifySecretcode(store_id, UCode)
          .then((res) => {
            if (res.valid)
            {
              addReview(originUrl.current, data)
                .then((result) => {
                  if (result) {
                    SetOpenSecretInput(false);
                    Toast('success', 'Created new review successfully.');
                    Router.push('/thank-review');
                  }
                });
            } else {
              Toast('error', 'Input valid secretcode');
            }
          });
      } else {
        checkIfSecretcode(store_id, data['email'])
          .then((Res) => {
            if (Res.secretcode)
            {
              SetOpenSecretInput(true);
            } else {
              addReview(originUrl.current, data)
                .then((result) => {
                  if (result) {
                    Toast('success', 'Created new review successfully.');
                    Router.push('/thank-review');
                  }
                });
            }
          });
      }
    }
  };

  const handleKeypress = event => {
    //it triggers by pressing the enter key
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      AddReview();
    }
  };

  useEffect(() => {
    originUrl.current = window.location.origin;
  }, []);

  return (
    <AccountLayout>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={2}></Grid>
        <Grid item xs={12} lg={8}>
          <BaseCard title="Create Review">
            <Stack spacing={3} pt={3}>
              <TextField
                placeholder="ex: 5026751678"
                type="tel"
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
                onChange={(e) => setRPhone(e.target.value)}
              />
              <TextField
                error={emailError}
                helperText={emailErrMsg}
                label="Email"
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
                required
                onKeyPress={handleKeypress}
                onChange={(e) => SetREmail(e.target.value)}
              />
              <Typography component="legend">Rating</Typography>
              <Box display="flex">
                <StarsRating
                  value={RRating}
                  onChange={value => {
                    SetRRating(value);
                  }}
                  onHoverChange={value => {
                    setHover(value);
                  }}
                />
                {RRating !== null && (
                  <Typography color="primary" variant="h4" marginTop={2.5} sx={{ alignItems: 'center', marginLeft: 5 }}>
                    {labels[hover ? hover : RRating]}
                  </Typography>
                )}
              </Box>
              <TextField
                error={reviewError}
                helperText={reviewError && '* Please insert Review.'}
                label="Review"
                type="text"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <FeatherIcon
                        icon={'message-square'}
                      />
                    </InputAdornment>
                  )
                }}
                multiline
                rows={4}
                required
                onKeyPress={handleKeypress}
                onChange={(e) => SetRReview(e.target.value)}
              />
            </Stack>
            <Button
              sx={{ marginTop: 4 }}
              variant="contained"
              size="large"
              onClick={() => AddReview()}
            >
              Submit
            </Button>
          </BaseCard>
        </Grid>
        <Grid item xs={12} lg={2}></Grid>
      </Grid>
      <Modal
        open={openSecretInput}
        // onClose={() => SetOpenSecretInput(false)}
      >
        <Grid container spacing={0} className="MuiCardHeader-action">
          <Grid item xs={12} lg={4}></Grid>
          <Grid item xs={12} lg={4} pt={12}>
            <Card>
              <Box p={2} alignItems="center">
                <Typography variant="h2">Store Manager request to verify</Typography>
                <Typography mt={2} variant="h5" color="textSecondary">
                  To leave this store review we need to vaildate your email address
                </Typography>
              </Box>
              <CardContent>
                <Stack spacing={4}>
                  <Stack spacing={1}>
                    <Typography variant="h6">
                      A text message with a 4-digit verification code was just sent to your email.
                    </Typography>
                    <TextField
                      required
                      type="tel"
                      label="Enter Verificiation Code"
                      variant="outlined"
                      inputProps={{ maxLength: 4 }}
                      onKeyPress={handleKeypress}
                      onChange={(e) => SetUCode(e.target.value)}
                    />
                  </Stack>
                  <Stack spacing={2}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={() => AddReview()}
                    >
                      Verify
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={4}></Grid>
        </Grid>
      </Modal>
    </AccountLayout>
  );
};

export default withMainLayoutPage(CreateRReview, {
  title: 'Create Review'
});
