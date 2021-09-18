import React from 'react';

import { useRouter } from 'next/router';

import {
  Divider,
  IconButton,
  Menu as MuiMenu,
  MenuItem,
} from '@material-ui/core';
import { AccountBox } from '@material-ui/icons';
import { useKeycloak } from '@react-keycloak/ssr';
import { KeycloakInstance } from 'keycloak-js';

const UserAccount: React.FunctionComponent = () => {
  const router = useRouter();

  const { keycloak } = useKeycloak<KeycloakInstance>();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: any) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton edge="end" color="inherit" onClick={handleOpen}>
        <AccountBox />
      </IconButton>

      <MuiMenu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        getContentAnchorEl={null}
      >
        <MenuItem disabled>{(keycloak?.idTokenParsed as any)?.name}</MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose();
            router.push('/logout');
          }}
        >
          Logout
        </MenuItem>
      </MuiMenu>
    </>
  );
};

export default UserAccount;
