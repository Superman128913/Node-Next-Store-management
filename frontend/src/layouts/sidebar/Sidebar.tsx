import React from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import FeatherIcon from 'feather-icons-react';
import LogoIcon from '../logo/LogoIcon';
import Menuitems from './MenuItems';
import { useRouter } from 'next/router';

const Sidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const curl = useRouter();
  const location = curl.pathname;

  const SidebarContent = (
    <Box p={2} height="100%">
      <LogoIcon />
      <Box mt={2}>
        <List>
          {Menuitems.map((item) => (
            <List component="li" disablePadding key={item.title}>
              <ListItem
                onClick={() => Router.push(item.href)}
                button
                selected={location === item.href}
                sx={{
                  mb: 1,
                  ...(location === item.href && {
                    color: 'white',
                    backgroundColor: (theme) =>
                      `${theme.palette.primary.main}!important`
                  })
                }}
              >
                <ListItemIcon>
                  <FeatherIcon
                    style={{
                      color: `${location === item.href ? 'white' : ''} `
                    }}
                    icon={item.icon}
                    width="20"
                    height="20"
                  />
                </ListItemIcon>

                <ListItemText onClick={onSidebarClose}>
                  {item.title}
                </ListItemText>
              </ListItem>
            </List>
          ))}
        </List>
      </Box>
    </Box>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: '265px',
            border: '0 !important',
            boxShadow: '0px 7px 30px 0px rgb(113 122 131 / 11%)'
          }
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      PaperProps={{
        sx: {
          width: '265px',
          border: '0 !important'
        }
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

Sidebar.propTypes = {
  isMobileSidebarOpen: PropTypes.bool,
  onSidebarClose: PropTypes.func,
  isSidebarOpen: PropTypes.bool
};

export default Sidebar;
