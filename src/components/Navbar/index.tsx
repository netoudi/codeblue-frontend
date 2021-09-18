import React from 'react';

import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import StoreIcon from '@material-ui/icons/Store';

import Menu from 'components/Navbar/Menu';
import UserAccount from 'components/Navbar/UserAccount';

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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Menu />
          <StoreIcon />
          <Typography component="h1" variant="h6" className={classes.title}>
            CODEBLUE - MY COMPANY
          </Typography>
          <Typography>Balance $ 0,00</Typography>
          <UserAccount />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
