import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Stack
} from '@mui/material';
import Link from 'next/link';
import { getStoreList } from '@/services/StoreServices';

interface SelectStoreType {
  _id: string;
  label: string;
}

const SelectDefaultStore = ({ SetUnPaidStore }) => {
  const [reloadPage, setReloadPage] = useState(true);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly SelectStoreType[]>([]);
  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [noStore, setNoStore] = useState(false);
  const loading = open && options.length === 0;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ResetStore = () => {    
    localStorage.removeItem('SelectedStore');
    setSelectedStore(null);
  };

  const SetStore = (store: any) => {
    setSelectedStore(store);
    if (store) {
      localStorage.setItem('SelectedStore', JSON.stringify(store));
    } else {
      ResetStore();
    }
    window.dispatchEvent(new Event('selectStore'));
  };

  const GetStoreList = async(active = true) => {
    const loggedUser = localStorage.getItem('User');
    const { _id } = JSON.parse(loggedUser);

    getStoreList(_id).then(async(result) => {
      const Data = await result;
      if (Data) {
        if (active) {
          setOptions(Data);
          setNoStore(Data.length === 0);
          SetUnPaidStore(false);
          Data.map((store) => {
            if (store.active == false)
            {
              SetUnPaidStore(true);
              return;
            }
          });
        }
      }
    });
  };

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    GetStoreList(active);

    return () => {
      active = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  useEffect(() => {
    if (reloadPage) {
      setReloadPage(false);
      GetStoreList();
      const store = localStorage.getItem('SelectedStore');
      if (store && store !== undefined)
      {
        setSelectedStore(JSON.parse(store));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadPage]);

  useEffect(() => {
    window.addEventListener('removeStore', ResetStore);
    return () => window.removeEventListener('removeStore', ResetStore);
  }, [ResetStore]);

  const addStoreLink = noStore && (
    <Link href="/add-store">
      Add Store
    </Link>
  );

  return (
    <>
      <Autocomplete
        disablePortal
        disableClearable
        size={'small'}
        sx={{ width: 250 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        getOptionLabel={(option: SelectStoreType) => option.label}
        getOptionDisabled={(option) => !option.active}
        noOptionsText={'No stores'}
        options={options}
        loading={loading && !noStore}
        renderInput={(params) => (
          <TextField
            {...params}
            label={'Select store'}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading && !noStore ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
          />
        )}
        value={selectedStore}
        onChange={(_event, value) => SetStore(value)}
      />
      <Stack ml={3}>
        {addStoreLink}
      </Stack>
    </>
  );
};

export default SelectDefaultStore;
