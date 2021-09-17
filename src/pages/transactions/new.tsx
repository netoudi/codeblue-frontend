import { NextPage } from 'next';

import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';

import { TransactionCategoryLabels, TransactionTypeLabels } from 'utils/models';

const TransactionsNewPage: NextPage = () => {
  return (
    <Container>
      <Typography component="h1" variant="h4">
        New transaction
      </Typography>

      <form>
        <Grid container>
          <Grid item xs={12} md={6}>
            <TextField
              type="date"
              required
              label="Payment date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              required
              label="Name"
              fullWidth
              inputProps={{ maxLength: 255 }}
            />
            <TextField required label="Description" fullWidth />
            <TextField select required label="Category" fullWidth>
              {TransactionCategoryLabels.map((i, key) => (
                <MenuItem key={key} value={i.value}>
                  {i.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField type="number" required label="Value" fullWidth />
            <TextField select required label="Payment type" fullWidth>
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
    </Container>
  );
};

export default TransactionsNewPage;
