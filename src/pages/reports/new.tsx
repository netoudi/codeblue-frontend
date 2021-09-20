import { useForm } from 'react-hook-form';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Box, Button, Grid, TextField, Typography } from '@material-ui/core';
import { useKeycloak } from '@react-keycloak/ssr';
import { KeycloakInstance } from 'keycloak-js';

import Head from 'components/Head';
import Page from 'components/Page';

import makeHttp from 'utils/http';

const ReportsNewPage: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const { initialized, keycloak } = useKeycloak<KeycloakInstance>();

  async function onSubmit(data: any) {
    try {
      await makeHttp().post('/reports', data);
      router.push('/reports');
    } catch (e) {
      console.error(e);
    }
  }

  if (
    typeof window !== 'undefined' &&
    initialized &&
    !keycloak?.authenticated
  ) {
    router.replace(`/login?from=${window.location.pathname}`);
    return null;
  }

  if (!keycloak?.authenticated) return null;

  return (
    <Page>
      <Head title="New report" />

      <Typography component="h1" variant="h4">
        New report
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('start_date')}
              type="date"
              required
              label="Start date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              {...register('end_date')}
              type="date"
              required
              label="End date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <Box marginTop={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Page>
  );
};

export default ReportsNewPage;
