import { useForm } from 'react-hook-form';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';

import Page from 'components/Page';

import makeHttp from 'utils/http';
import { TransactionCategoryLabels, TransactionTypeLabels } from 'utils/models';

const TransactionsNewPage: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  async function onSubmit(data: any) {
    try {
      await makeHttp().post('/transactions', data);
      router.push('/transactions');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Page>
      <Typography component="h1" variant="h4">
        New transaction
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('payment_date')}
              type="date"
              required
              label="Payment date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              {...register('name')}
              required
              label="Name"
              fullWidth
              inputProps={{ maxLength: 255 }}
            />
            <TextField
              {...register('description')}
              required
              label="Description"
              fullWidth
            />
            <TextField
              {...register('category')}
              select
              required
              label="Category"
              fullWidth
            >
              {TransactionCategoryLabels.map((i, key) => (
                <MenuItem key={key} value={i.value}>
                  {i.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              {...register('amount', { valueAsNumber: true })}
              type="number"
              required
              label="Amount"
              fullWidth
            />
            <TextField
              {...register('type')}
              select
              required
              label="Payment type"
              fullWidth
            >
              {TransactionTypeLabels.map((i, key) => (
                <MenuItem key={key} value={i.value}>
                  {i.label}
                </MenuItem>
              ))}
            </TextField>
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

export default TransactionsNewPage;
