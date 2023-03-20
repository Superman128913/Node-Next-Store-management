/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';

import Router, { useRouter } from 'next/router';
import { withMainLayoutPage } from '@/modules/shared/components/layouts/page/Main';

import {
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
  Box,
  Autocomplete,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import useSWR from 'swr';
import BaseCard from '@/components/baseCard/BaseCard';
import HelperText from '@/components/HelperTextError';
import FullLayout from '@/layouts/full-layout';
import Toast from '@/components/Toast';
import { storeAreaList } from '@/const/store-area-list';
import { countries, CountryType } from '@/const/country-list';
import { getSingleStore, updateStore } from '@/services/StoreServices';
import isNumeric from '@/globalFunctions';

const UpdateStore = () => {
  const [SName, setSName] = useState('');
  const [SAddress, setSAddress] = useState('');
  const [SZipcode, setSZipcode] = useState('');
  const [SCity, setSCity] = useState('');
  const [SCountry, setSCountry] = useState('');
  const [countryValue, setCountryValue] = useState<any>(null);
  const [SRegnum, setSRegnum] = useState('');
  const [SPhone, setSPhone] = useState('');
  const [SArea, setSArea] = useState<any>(null);
  const [InputArea, setInputArea] = useState('');
  const [SecretChecked, setSecretChecked] = useState(false);
  const [SecretCode, setSecretCode] = useState('');

  const [firstNameUpdate, setFirstNameUpdate] = useState(true);
  const [nameError, SetNameError] = useState(false);

  const [firstAddressUpdate, setFirstAddressUpdate] = useState(true);
  const [addressError, SetAddressError] = useState(false);

  const [firstZipcodeUpdate, setFirstZipcodeUpdate] = useState(true);
  const [zipcodeError, SetZipcodeError] = useState(false);

  const [firstCityUpdate, setFirstCityUpdate] = useState(true);
  const [cityError, SetCityError] = useState(false);

  const [firstCountryUpdate, setFirstCountryUpdate] = useState(true);
  const [countryError, SetCountryError] = useState(false);

  const [firstRegnumUpdate, setFirstRegnumUpdate] = useState(true);
  const [regnumError, SetRegnumError] = useState(false);

  const [firstAreaUpdate, setFirstAreaUpdate] = useState(true);
  const [areaError, SetAreaError] = useState(false);

  const [firstPhoneUpdate, setFirstPhoneUpdate] = useState(true);
  const [phoneError, SetPhoneError] = useState(false);

  const [secretcodeError, SetSecretcodeError] = useState(false);

  const ValidateName = () => {
    if (firstNameUpdate) {
      setFirstNameUpdate(false);
      return false;
    }
    if (!SName) {
      // Toast('warning', 'Password doesn\'t match with conformation');
      SetNameError(true);
      return false;
    } else {
      SetNameError(false);
      return true;
    }
  };

  const ValidateAddress = () => {
    if (firstAddressUpdate) {
      setFirstAddressUpdate(false);
      return false;
    }
    if (!SAddress) {
      // Toast('warning', 'Password doesn\'t match with conformation');
      SetAddressError(true);
      return false;
    } else {
      SetAddressError(false);
      return true;
    }
  };

  const ValidateZipcode = () => {
    if (firstZipcodeUpdate) {
      setFirstZipcodeUpdate(false);
      return false;
    }
    if (!SZipcode) {
      // Toast('warning', 'Password doesn\'t match with conformation');
      SetZipcodeError(true);
      return false;
    } else {
      SetZipcodeError(false);
      return true;
    }
  };

  const ValidateCity = () => {
    if (firstCityUpdate) {
      setFirstCityUpdate(false);
      return false;
    }
    if (!SCity) {
      // Toast('warning', 'Password doesn\'t match with conformation');
      SetCityError(true);
      return false;
    } else {
      SetCityError(false);
      return true;
    }
  };

  const ValidateCountry = () => {
    if (firstCountryUpdate) {
      setFirstCountryUpdate(false);
      return false;
    }
    if (!SCountry) {
      // Toast('warning', 'Password doesn\'t match with conformation');
      SetCountryError(true);
      return false;
    } else {
      SetCountryError(false);
      return true;
    }
  };

  const ValidateRegnum = () => {
    if (firstRegnumUpdate) {
      setFirstRegnumUpdate(false);
      return false;
    }
    if (!SRegnum) {
      // Toast('warning', 'Password doesn\'t match with conformation');
      SetRegnumError(true);
      return false;
    } else {
      SetRegnumError(false);
      return true;
    }
  };

  const ValidateArea = () => {
    if (firstAreaUpdate) {
      setFirstAreaUpdate(false);
      return false;
    }
    if (!SArea) {
      // Toast('warning', 'Password doesn\'t match with conformation');
      SetAreaError(true);
      return false;
    } else {
      SetAreaError(false);
      return true;
    }
  };

  const ValidatePhone = () => {
    if (firstPhoneUpdate) {
      setFirstPhoneUpdate(false);
      return false;
    }
    if (!SPhone) {
      // Toast('warning', 'Password doesn\'t match with conformation');
      SetPhoneError(true);
      return false;
    } else {
      SetPhoneError(false);
      return true;
    }
  };

  const ValidateSecretCode = () => {
    if (!SecretChecked) {
      SetSecretcodeError(false);
      return true;
    }
    if (SecretCode?.length < 4 || !isNumeric(SecretCode)) {
      // Toast('warning', 'Password doesn\'t match with conformation');
      SetSecretcodeError(true);
      return false;
    } else {
      SetSecretcodeError(false);
      return true;
    }
  };

  const { query } = useRouter();

  const SetFormValue = (data) => {
    setSName(data.name);
    setSAddress(data.address);
    setSZipcode(data.zipcode);
    setSCity(data.city);
    setSCountry(data.country);
    setSRegnum(data.regnum);
    setSPhone(data.phone);
    setSArea(data.area);
    setCountryValue(countries.find(x => x.label == data.country));
    setSecretChecked(data.secretcode);
    setSecretCode(data.secretcode);
  };

  const GetStore = async(store_id: string) => {
    getSingleStore(store_id)
      .then((result) =>
      {
        if (result)
          SetFormValue(result);
      });
  };

  const Submit = async() =>
  {
    const validName = ValidateName();
    const validAddress = ValidateAddress();
    const validZipcode = ValidateZipcode();
    const validCountry = ValidateCountry();
    const validCity = ValidateCity();
    const validRegnum = ValidateRegnum();
    const validArea = ValidateArea();
    const validPhone = ValidatePhone();
    const validSecretCode = ValidateSecretCode();
    if (validName && validAddress && validZipcode && validCountry && validCity && validRegnum && validArea && validPhone && validSecretCode ) {
      const data = {
        name: SName,
        address: SAddress,
        zipcode: SZipcode,
        city: SCity,
        country: SCountry,
        regnum: SRegnum,
        phone: SPhone,
        area: SArea,
        secretcode: SecretChecked ? SecretCode : ''
      };
      updateStore(query.id, data)
        .then((result) => {
          if (result) {
            Toast('success', 'Created new store successfully.');
            Router.push('/store');
          }
        });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error } = useSWR(
    () => query.id,
    GetStore
  );

  if (error) return (<div>{error.message}</div>);

  const handleKeypress = event => {
    //it triggers by pressing the enter key
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      Submit();
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    ValidateName();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SName]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    ValidateAddress();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SAddress]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    ValidateZipcode();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SZipcode]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    ValidateCountry();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SCountry]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    ValidateCity();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SCity]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    ValidateRegnum();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SRegnum]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    ValidateArea();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SArea]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    ValidatePhone();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SPhone]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    ValidateSecretCode();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SecretCode]);

  return (
    <FullLayout>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Update Store">
            <Box pt={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <Stack spacing={1}>
                    <Typography variant="h6">
                      Store Name
                    </Typography>
                    <TextField
                      error={nameError}
                      helperText={nameError && '* Please insert Store Name.'}
                      placeholder="ex: 5026751678"
                      type="tel"
                      variant="outlined"
                      value={SName}
                      onKeyPress={handleKeypress}
                      onChange={(e) => setSName(e.target.value)}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Stack spacing={1}>
                    <Typography variant="h6">
                      Zip Code
                    </Typography>
                    <TextField
                      error={zipcodeError}
                      helperText={zipcodeError && '* Please insert Zipcode.'}
                      placeholder="ex: 3957853"
                      type="tel"
                      variant="outlined"
                      value={SZipcode}
                      onKeyPress={handleKeypress}
                      onChange={(e) => setSZipcode(e.target.value)}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Stack spacing={1}>
                    <Typography variant="h6">
                      Country
                    </Typography>
                    <Autocomplete
                      options={countries}
                      getOptionLabel={(option: CountryType) => option.label}
                      renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                          <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                            alt=""
                          />
                          {option.label} ({option.code}) + {option.phone}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="ex: Poland"
                          inputProps={{
                            ...params.inputProps
                          }}
                        />
                      )}
                      value={countryValue}
                      inputValue={SCountry}
                      onInputChange={(event, InputValue) => {
                        setSCountry(InputValue ? InputValue['label'] : '');
                      }}
                      onChange={(_event, value) => {
                        setSCountry(value ? value['label'] : '');
                        setCountryValue(value);
                      }}
                    />
                  </Stack>
                  <HelperText>
                    {countryError && '* Please select Country.'}
                  </HelperText>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Stack spacing={1}>
                    <Typography variant="h6">
                      City
                    </Typography>
                    <TextField
                      error={cityError}
                      helperText={cityError && '* Please insert City.'}
                      placeholder="ex: Honolulu"
                      type="text"
                      variant="outlined"
                      value={SCity}
                      onKeyPress={handleKeypress}
                      onChange={(e) => setSCity(e.target.value)}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Stack spacing={1}>
                    <Typography variant="h6">
                      Store Address
                    </Typography>
                    <TextField
                      error={addressError}
                      helperText={addressError && '* Please insert Store Address.'}
                      placeholder="ex: 710-2340 Magnis Street"
                      type="text"
                      variant="outlined"
                      value={SAddress}
                      onKeyPress={handleKeypress}
                      onChange={(e) => setSAddress(e.target.value)}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Stack spacing={1}>
                    <Typography variant="h6">
                      Store Registration Number
                    </Typography>
                    <TextField
                      error={regnumError}
                      helperText={regnumError && '* Please insert Registration Number.'}
                      name="regnum"
                      placeholder="ex: 375"
                      type="tel"
                      variant="outlined"
                      value={SRegnum}
                      onKeyPress={handleKeypress}
                      onChange={(e) => setSRegnum(e.target.value)}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Stack spacing={1}>
                    <Typography variant="h6">
                      Store Phone Number
                    </Typography>
                    <TextField
                      error={phoneError}
                      helperText={phoneError && '* Please insert Phone Number.'}
                      placeholder="ex: 5026751678"
                      type="tel"
                      variant="outlined"
                      value={SPhone}
                      onKeyPress={handleKeypress}
                      onChange={(e) => setSPhone(e.target.value)}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Stack spacing={1}>
                    <Typography variant="h6">
                      Store Working Area
                    </Typography>
                    <Autocomplete
                      options={storeAreaList}
                      value={SArea}
                      inputValue={InputArea}
                      onInputChange={(event, InputValue) => {
                        setInputArea(InputValue);
                      }}
                      renderInput={(params) =>
                        <TextField
                          {...params}
                          placeholder={'ex: ' + storeAreaList[0]}
                        />
                      }
                      onChange={(_event, value) => setSArea(value)}
                    />
                  </Stack>
                  <HelperText>
                    {areaError && '* Please select Working Area.'}
                  </HelperText>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={SecretChecked}
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 25 } }}
                      />}
                    label="Use secret code"
                    checked={SecretChecked}
                    onChange={(_event, check) => setSecretChecked(check)}
                  />
                </Grid>
                <Grid item xs={12} lg={6} hidden={!SecretChecked}>
                  <TextField
                    fullWidth
                    required
                    error={secretcodeError}
                    helperText={secretcodeError && (SecretCode ? 'Secret Code must be 4 digit number' : '* Please insert Secret Code.')}
                    label="Secret Code"
                    type="tel"
                    variant="filled"
                    inputProps={{ maxLength: 4 }}
                    value={SecretCode}
                    onKeyPress={handleKeypress}
                    onChange={(e) => setSecretCode(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{
                      mt: 3
                    }}
                    onClick={() => {
                      Submit();
                    }}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </BaseCard>
        </Grid>
      </Grid>
    </FullLayout>
  );
};

export default withMainLayoutPage(UpdateStore, {
  title: 'Update Store'
});

