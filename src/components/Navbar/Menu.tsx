import React from 'react';

import { useRouter } from 'next/router';

import { IconButton, Menu as MuiMenu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const Menu: React.FunctionComponent = () => {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: any) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <MenuIcon />
      </IconButton>

      <MuiMenu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        getContentAnchorEl={null}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            router.push('/');
          }}
        >
          Home
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            router.push('/reports');
          }}
        >
          Reports
        </MenuItem>
      </MuiMenu>
    </>
  );
};

export default Menu;
