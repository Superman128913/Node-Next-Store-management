import React, { useState, useEffect } from 'react';
import Router from 'next/router';

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
  TableSortLabel,
  Rating,
  Grid,
  Autocomplete,
  TextField,
  Pagination,
  Chip
} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import { withMainLayoutPage } from '@/modules/shared/components/layouts/page/Main';
import FullLayout from '@/layouts/full-layout';
import { getAllReviews } from '@/services/ReviewServices';

const RowNumPerPage = [10, 15, 25, 100];

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
  timeStyle: 'short'
});

const Reviews = () => {
  const [Review, setReview] = useState([]);
  const [StoreName, setStoreName] = useState('');
  const [limit, setLimit] = useState<any>(RowNumPerPage[0]);
  const [limitInputValue, setLimitInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const [orderDate, setOrderDate] = useState(true);
  const order = orderDate ? 1 : -1;

  const FormateDate = (value) => {
    if (!value) return;
    const date = new Date(value);
    return dateFormatter.format(date);
  };

  const GetReviews = async() => {
    const store = localStorage.getItem('SelectedStore');
    if (store && store !== undefined)
    {
      const store_data = JSON.parse(store);
      setStoreName(store_data['label']);

      getAllReviews(store_data['_id'], page, limit, order).then(async(result) => {
        const Data = await result;
        if (Data) {
          setReview(Data);
          setTotalCount(Data[0] ? Data[0]['totalCount'] : 0);
        }
        else {
          setTotalCount(0);
          setReview([]);
        }
        setSkip((page - 1) * limit);
      });
    } else {
      setStoreName('');
      setReview([]);
      setTotalCount(0);
      setSkip((page - 1) * limit);
    }
  };

  useEffect(() => {
    GetReviews();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, order]);

  useEffect(() => {
    window.addEventListener('selectStore', () => {
      GetReviews();
    });
    return () => {
      window.removeEventListener('selectStore', () => {
        GetReviews();
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (StoreName)
    return (
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Typography
                    variant="h6"
                    mr={2}
                  >
                    Rows per page:
                  </Typography>
                  <Autocomplete
                    disablePortal
                    disableClearable
                    id="combo-box-demo"
                    options={RowNumPerPage}
                    isOptionEqualToValue={(option, value) => option === value}
                    getOptionLabel={(option) => String(option)}
                    sx={{
                      width: 70
                    }}
                    size={'small'}
                    renderInput={({ inputProps, ...rest }) =>
                      <TextField
                        {...rest}
                        inputProps={{ ...inputProps, readOnly: true }}
                      />
                    }
                    value={limit}
                    onChange={(_event, value) => setLimit(Number(value))}
                    inputValue={limitInputValue}
                    onInputChange={(event, newInputValue) => {
                      setLimitInputValue(newInputValue);
                    }}
                  />
                </Box>
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
                        <TableSortLabel
                          active={true}
                          direction={orderDate ? 'asc' : 'desc'}
                          onClick={() => setOrderDate(!orderDate)}
                        >
                          <Typography color="textSecondary" variant="h6">
                            Date
                          </Typography>
                        </TableSortLabel>
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
                      <TableCell align="center">
                        <Typography color="textSecondary" variant="h6">
                          Review
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
                            {(page - 1) * limit + index + 1}
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
                            {FormateDate(review.date)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <Typography color="textSecondary" variant="h6" sx={{ marginRight: 1 }}>
                              {review.email}
                            </Typography>
                            {review.verified && (
                              <FeatherIcon icon="check" color="green" />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          {review.phone}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            sx={{
                              pl: '4px',
                              pr: '4px',
                              width: '60px',
                              backgroundColor: 'primary.main',
                              color: '#fff'
                            }}
                            size="small"
                            label={'Show'}
                            onClick={() => {
                              Router.push(`/single-review/${review._id}`);
                            }}
                          ></Chip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: 3,
                    mb: 3
                  }}
                >
                  <Typography variant="h6" color="textSecondary">
                    {totalCount ? `Show ${skip + 1}–${skip + Review.length} of ${totalCount} rows` : 'No data to show'}
                  </Typography>
                  <Box flexGrow={1} />
                  <Pagination
                    count={Math.ceil(totalCount / limit)}
                    variant="outlined"
                    color="secondary"
                    onChange={(_event, pageNumber) => setPage(pageNumber)}
                  />
                </Box>
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
  title: 'Reviews'
});
