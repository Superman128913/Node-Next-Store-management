import React, { useState, useEffect } from 'react';
import {
  experimentalStyled,
  Container,
  Box
} from '@mui/material/';
import Router from 'next/router';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from './header/Header';
import Footer from './footer/Footer';
import Sidebar from './sidebar/Sidebar';

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

const FullLayout = ({ children }) => {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const [isLogged, setIsLogged] = useState(false);

  const [isSidebarOpen] = React.useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const [unPaidStore, SetUnPaidStore] = useState(false);

  useEffect(() => {
    const loggedUser = localStorage.getItem('User');
    if (!loggedUser) {
      Router.push('/login');
    } else {
      setIsLogged(true);
    }
  }, []);
  if (isLogged)
    return (
      <MainWrapper>
        <Header
          sx={{
            paddingLeft: isSidebarOpen && lgUp ? '265px' : '',
            backgroundColor: '#fbfbfb'
          }}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
          unPaidStore={ unPaidStore }
          SetUnPaidStore={ SetUnPaidStore }
        />
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        <PageWrapper>
          <Container
            maxWidth={false}
            sx={{
              paddingTop: unPaidStore ? '50px' : '20px',
              paddingLeft: isSidebarOpen && lgUp ? '280px!important' : ''
            }}
          >
            <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>{ children }</Box>
            <Footer />
          </Container>
        </PageWrapper>
      </MainWrapper>
    );
};

export default FullLayout;
