import React from 'react';
import {
  experimentalStyled,
  Container,
  Box
} from '@mui/material';

const MainWrapper = experimentalStyled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  overflow: 'hidden',
  width: '100%'
}));

const PageWrapper = experimentalStyled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',

  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up('lg')]: {
    paddingTop: '64px'
  },
  [theme.breakpoints.down('lg')]: {
    paddingTop: '64px'
  }
}));

const AccountLayout = ({ children }) => {
  return (
    <MainWrapper>
      <PageWrapper>
        <Container
          maxWidth={false}
        >
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>{ children }</Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default AccountLayout;
