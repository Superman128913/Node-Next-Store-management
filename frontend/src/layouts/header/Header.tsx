import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { AppBar, Box, IconButton, Toolbar, Grid, Stack, Alert, Typography, AlertTitle } from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';
// Dropdown Component
import ProfileDD from './ProfileDD';
import SelectDefaultStore from './SelectStore';

const Header = ({ sx, customClass, toggleMobileSidebar, position, unPaidStore, SetUnPaidStore }) => {
  const unPaidAlert = unPaidStore && (
    <Grid item xs={12} lg={12}>
      <Alert severity="error">
        You have unpaid stores — <Link href="/store">Go to <strong>Store</strong> page</Link>
      </Alert>
    </Grid>
  );
  return (
    <AppBar sx={sx} position={position} elevation={0} className={customClass}>
      <Toolbar>
        <IconButton
          size="large"
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: 'none',
              xs: 'flex'
            }
          }}
        >
          <FeatherIcon icon="menu" width="20" height="20" />
        </IconButton>
        {/* ------------------------------------------- */}
        {/* Store Select */}
        {/* ------------------------------------------- */}
        <SelectDefaultStore SetUnPaidStore={ SetUnPaidStore } />
        {/* ------------ End Menu icon ------------- */}

        <Box flexGrow={1} />

        <ProfileDD />
        {/* ------------------------------------------- */}
        {/* Profile Dropdown */}
        {/* ------------------------------------------- */}
      </Toolbar>
      {unPaidAlert}
    </AppBar>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  customClass: PropTypes.string,
  position: PropTypes.string,
  toggleSidebar: PropTypes.func,
  toggleMobileSidebar: PropTypes.func
};

export default Header;
