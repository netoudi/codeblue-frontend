import React from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useKeycloak } from '@react-keycloak/ssr';
import { KeycloakInstance } from 'keycloak-js';

const LoginPage: NextPage = () => {
  const { replace, query } = useRouter();
  const from = query.from;

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

  React.useEffect(() => {
    if (!initialized) {
      return;
    }
    if (authenticated) {
      replace((from as string) ?? '/transactions');
    }
  }, [authenticated, from, initialized, replace]);

  return null;
};

export default LoginPage;
