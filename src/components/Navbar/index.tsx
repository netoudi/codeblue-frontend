import React from 'react';

import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import StoreIcon from '@material-ui/icons/Store';
import { useKeycloak } from '@react-keycloak/ssr';
import { KeycloakInstance } from 'keycloak-js';

import Menu from 'components/Navbar/Menu';
import UserAccount from 'components/Navbar/UserAccount';
import { useTenant } from 'components/Tenant';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar: React.FunctionComponent = () => {
  const classes = useStyles();
  const { initialized, keycloak } = useKeycloak<KeycloakInstance>();
  const tenant = useTenant();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Menu />
          <StoreIcon />
          <Typography component="h1" variant="h6" className={classes.title}>
            CODEBLUE - MY COMPANY
          </Typography>
          {initialized && keycloak?.authenticated && tenant && (
            <Typography>Balance {tenant?.balance}</Typography>
          )}
          <UserAccount />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
