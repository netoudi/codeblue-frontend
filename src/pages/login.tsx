import React from 'react';

import { NextPage } from 'next';

import { useKeycloak } from '@react-keycloak/ssr';
import { KeycloakInstance } from 'keycloak-js';

const LoginPage: NextPage = () => {
  const { initialized, keycloak } = useKeycloak<KeycloakInstance>();

  const { authenticated, login = () => null } = keycloak || {};

  React.useEffect(() => {
    if (!initialized) {
      return;
    }
    if (!authenticated) {
      login();
    }
  }, [authenticated, initialized, login]);

  return null;
};

export default LoginPage;
