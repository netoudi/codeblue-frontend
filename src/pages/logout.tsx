import { GetServerSideProps, NextPage } from 'next';

import { useKeycloak } from '@react-keycloak/ssr';
import { KeycloakInstance } from 'keycloak-js';

import { validateAuth } from 'utils/auth';
import { destroyCookie } from 'utils/cookies';

const LogoutPage: NextPage = () => {
  const { initialized, keycloak } = useKeycloak<KeycloakInstance>();

  if (initialized && typeof window !== 'undefined') {
    destroyCookie('kcToken');
    destroyCookie('kcIdToken');
    keycloak?.logout({
      redirectUri: window.location.origin + '/login',
    });
  }

  return null;
};

export default LogoutPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const payload = validateAuth(ctx.req);

  if (!payload) {
    return {
      redirect: {
        permanent: false,
        destination: 'login',
      },
    };
  }

  return {
    props: {},
  };
};
