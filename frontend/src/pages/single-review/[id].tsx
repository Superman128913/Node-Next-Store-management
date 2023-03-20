/* eslint-disable react/no-unescaped-entities */
import { withMainLayoutPage } from '@/modules/shared/components/layouts/page/Main';

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Rating
} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import FullLayout from '@/layouts/full-layout';
import { getSingleReview } from '@/services/ReviewServices';

const PasswordChanged = () => {
  const { query } = useRouter();
  const [review, SetReview] = useState<any>(null);

  const GetReview = async(review_id: string) => {
    getSingleReview(review_id)
      .then((result) =>
      {
        if (result)
          SetReview(result);
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error } = useSWR(
    () => query.id,
    GetReview
  );

  if (error) return (<div>{error.message}</div>);

  if (review)
    return (
      <FullLayout>
        <Grid container spacing={0} className="MuiCardHeader-action">
          <Grid item xs={12} lg={3}></Grid>
          <Grid item xs={12} lg={6} pt={12}>
            <Card>
              <Box p={2} display="flex" alignItems="center">
                <Typography variant="h4" mr={5}>{review.email}</Typography>
                <Rating size={'large'} value={review.rating} precision={0.5} readOnly />
                <Typography ml={1} variant="h5">{review.rating}</Typography>
                <Box flexGrow={1} />
                {review.verified && (
                  <FeatherIcon icon="check-square" color="green" />
                )}
              </Box>
              <CardContent>
                <Typography variant="h5" color="textSecondary">
                  {review.review}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={3}></Grid>
        </Grid>
      </FullLayout>
    );
};

export default withMainLayoutPage(PasswordChanged, {
  title: 'Show Review'
});
