import React from 'react';
import Router from 'next/router';
import { Button } from '@mui/material';
import SVG from '@/modules/shared/components/base/Image/SVG';
import LogoDark from '#/images/logos/logo-dark.svg';

const LogoIcon = () => {
  return (

    <Button onClick={() => Router.push('/')}>
      <SVG fill="currentColor" src={LogoDark} width={'100%'} />
    </Button>
  );
};

export default LogoIcon;
