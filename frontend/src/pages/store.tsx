import { withMainLayoutPage } from '@/modules/shared/components/layouts/page/Main';

import React, { useRef } from 'react';
import Router, { useRouter } from 'next/router';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Chip,
  Button,
  Pagination,
  Autocomplete,
  TextField,
  Modal,
  Card,
  CardContent
} from '@mui/material';
import { useEffect, useState } from 'react';
import FeatherIcon from 'feather-icons-react';
import BaseCard from '@/components/baseCard/BaseCard';
import FullLayout from '@/layouts/full-layout';
import { deleteStore, getStores } from '@/services/StoreServices';
import Toast from '@/components/Toast';
import { checkoutRequest } from '@/services/CheckoutServices';

const RowNumPerPage = [10, 15, 25, 100];

const Store = () => {
  const originUrl = useRef('');
  const [Stores, setStores] = useState([]);
  const [limit, setLimit] = useState<any>(RowNumPerPage[0]);
  const [limitInputValue, setLimitInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [deleteStoreId, setDeleteStoreId] = useState('');

  const GetStores = async() => {
    const loggedUser = localStorage.getItem('User');
    const user_id = JSON.parse(loggedUser)['_id'];

    getStores(user_id, page, limit).then(async(result) => {
      const Data = await result;
      if (Data) {
        setStores(Data);
        setTotalCount(Data[0] ? Data[0]['totalCount'] : 0);
      }
      else {
        setTotalCount(0);
      }
      setSkip((page - 1) * limit);
    });
  };

  const EditStore = (store_id) => {
    Router.push(`/edit-store/${store_id}`);
  };

  const DeleteStore = (store_id) => {
    deleteStore(store_id).then(async(result) => {
      const Data = await result;
      if (Data) {
        // Remove Store from selection if it is selected
        const selectedStore = localStorage.getItem('SelectedStore');
        if (selectedStore && selectedStore !== undefined && store_id == JSON.parse(selectedStore)['_id'])
        {
          localStorage.removeItem('SelectedStore');
          window.dispatchEvent(new Event('removeStore'));
        }

        Toast('success', Data);
        GetStores();
      }
    });
    setOpenModal(false);
  };

  useEffect(() => {
    GetStores();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page]);

  useEffect(() => {
    originUrl.current = window.location.origin;
  }, []);

  return (
    <FullLayout>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Store List">
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
              <Box flexGrow={1} />
              <Button
                variant="contained"
                color="primary"
                size="medium"
                href={'/add-store'}
              >
                Add Store
              </Button>
            </Box>
            <Table
              aria-label="Store List"
              sx={{
                mt: 3,
                whiteSpace: 'nowrap'
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      No
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Location
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography color="textSecondary" variant="h6">
                      Zip Code
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography color="textSecondary" variant="h6">
                      Reg. Number
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="h6">
                      Phone
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Area
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="h6">
                      Active
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="h6">
                      Edit / Delete
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Stores.map((item, index) => (
                  <TableRow key={item._id}>
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
                      <Typography color="textSecondary" variant="h6">
                        {item.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Box>
                            <Typography
                              color="textSecondary"
                              sx={{
                                fontSize: '13px'
                              }}
                            >
                              {item.city + (item.city && ', ') + item.country}
                            </Typography>
                            <Typography
                              color="textSecondary"
                              sx={{
                                fontSize: '13px'
                              }}
                            >
                              {item.address}
                            </Typography>
                          </Box>
                        </Box>
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography color="textSecondary" variant="h6">
                        {item.zipcode}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography color="textSecondary" variant="h6">
                        {item.regnum}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography color="textSecondary" variant="h6">
                        {item.phone}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {item.area}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {item.active ? (
                        <FeatherIcon icon="check" color="green" />
                      ) : (
                        <Button
                          sx={{
                            backgroundColor: 'red'
                          }}
                          variant="contained"
                          color="success"
                          size="small"
                          type="submit"
                          role={'link'}
                          onClick={() => checkoutRequest(item._id, originUrl.current)}
                        >
                          Proceed to Payment
                        </Button>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        sx={{
                          pl: '4px',
                          pr: '4px',
                          mr: '4px',
                          width: '60px',
                          backgroundColor: 'primary.main',
                          color: '#fff'
                        }}
                        size="small"
                        label={'Edit'}
                        onClick={() => {
                          EditStore([item._id]);
                        }}
                      ></Chip>
                      <Chip
                        sx={{
                          pl: '4px',
                          pr: '4px',
                          ml: '4px',
                          width: '60px',
                          backgroundColor: 'error.main',
                          color: '#fff'
                        }}
                        size="small"
                        label={'Delete'}
                        onClick={() => {
                          setDeleteStoreId(item._id);
                          setOpenModal(true);
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
                {totalCount ? `Show ${skip + 1}–${skip + Stores.length} of ${totalCount} rows` : 'No data to show'}
              </Typography>
              <Box flexGrow={1} />
              <Pagination
                count={Math.ceil(totalCount / limit)}
                variant="outlined"
                color="secondary"
                onChange={(_event, pageNumber) => setPage(pageNumber)}
              />
            </Box>
          </BaseCard>
        </Grid>
      </Grid>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Grid container spacing={0} className="MuiCardHeader-action">
          <Grid item xs={12} lg={4}></Grid>
          <Grid item xs={12} lg={4} pt={12}>
            <Card>
              <Box p={2} alignItems="center">
                <Typography variant="h2">Are you sure?</Typography>
                <Typography mt={2} variant="h5" color="textSecondary">
                  This will delete store permanently.
                </Typography>
              </Box>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="error"
                      size="large"
                      onClick={() => setOpenModal(false)}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="success"
                      size="large"
                      onClick={() => DeleteStore(deleteStoreId)}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={4}></Grid>
        </Grid>
      </Modal>
    </FullLayout>
  );
};

export default withMainLayoutPage(Store, {
  title: 'Store'
});
