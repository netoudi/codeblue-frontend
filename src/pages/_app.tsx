import React from 'react';

import type { AppContext, AppProps } from 'next/app';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { SSRCookies, SSRKeycloakProvider } from '@react-keycloak/ssr';

import { KEYCLOAK_PUBLIC_CONFIG } from 'utils/auth';
import { parseCookies } from 'utils/cookies';

import theme from 'styles/theme';

function MyApp({ Component, pageProps, cookies }: AppProps & { cookies: any }) {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <SSRKeycloakProvider
      keycloakConfig={KEYCLOAK_PUBLIC_CONFIG}
      persistor={SSRCookies(cookies)}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </SSRKeycloakProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  return {
    cookies: parseCookies(appContext.ctx.req),
  };
};

export default MyApp;
