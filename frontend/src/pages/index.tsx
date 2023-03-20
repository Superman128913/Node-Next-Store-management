import React, { useState, useEffect } from 'react';

import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Rating,
  Grid
} from '@mui/material';
import { withMainLayoutPage } from '@/modules/shared/components/layouts/page/Main';
import FullLayout from '@/layouts/full-layout';
import { getReviews } from '@/services/ReviewServices';

const Reviews = () => {
  const [Review, setReview] = useState([]);
  const [OverallRating, setOverallRating] = useState(0);
  const [StoreName, setStoreName] = useState('');

  const GetReviews = async() => {
    const store = localStorage.getItem('SelectedStore');
    if (store && store !== undefined)
    {
      const store_data = JSON.parse(store);
      setStoreName(store_data['label']);

      getReviews(store_data['_id']).then(async(result) => {
        const Data = await result['data'];
        const Average = await result['average'];
        if (Data) {
          setReview(Data);
        } else {
          setReview([]);
        }
        if (Average) {
          setOverallRating(Average);
        } else {
          setOverallRating(0);
        }

      });
    } else {
      setStoreName('');
      setReview([]);
      setOverallRating(0);
    }
  };

  useEffect(() => {
    GetReviews();
    window.addEventListener('selectStore', () => {
      GetReviews();
    });
    return () => {
      window.removeEventListener('selectStore', () => {
        GetReviews();
      });
    };
  }, []);

  if (StoreName)
    return (
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <Card>
              <Box p={2} display="flex" alignItems="center">
                <Typography variant="h4" mr={5}>{StoreName}</Typography>
                <Rating size={'large'} value={OverallRating} precision={0.5} readOnly />
                <Typography ml={1} variant="h5">{OverallRating.toFixed(1)}</Typography>
              </Box>
              <CardContent>
                <Table
                  aria-label={StoreName}
                  sx={{
                    mt: 3,
                    whiteSpace: 'nowrap'
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          Id
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          Rating
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          Email
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          Phone number
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Review.map((review, index) => (
                      <TableRow key={review._id}>
                        <TableCell>
                          <Typography
                            sx={{
                              fontSize: '15px',
                              fontWeight: '500'
                            }}
                          >
                            {index + 1}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <Box>
                              <Rating name="read-only" precision={0.5} value={review.rating} readOnly />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6">
                            {review.email}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {review.phone}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </FullLayout>
    );
  else
    return (
      <FullLayout>
        <Box sx={{ m: 5, textAlign: 'center' }}>
          <Typography variant="h1">No Selected Store</Typography>
        </Box>
      </FullLayout>
    );
};

export default withMainLayoutPage(Reviews, {
  title: 'Dashboard'
});
