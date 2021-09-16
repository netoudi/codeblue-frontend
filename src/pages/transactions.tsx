import { NextPage } from 'next';

import {
  Column,
  IntegratedFiltering,
  IntegratedPaging,
  PagingState,
  SearchState,
  SortingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  PagingPanel,
  SearchPanel,
  Table,
  TableHeaderRow,
  Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
import { Container, Typography } from '@material-ui/core';

const columns: Column[] = [
  {
    name: 'payment_date',
    title: 'Payment date',
  },
  {
    name: 'name',
    title: 'Name',
  },
  {
    name: 'category',
    title: 'Category',
  },
  {
    name: 'type',
    title: 'Type',
  },
  {
    name: 'created_at',
    title: 'Created At',
  },
];

const TransactionsPage: NextPage = () => {
  return (
    <Container>
      <Typography component="h1" variant="h4">
        My transactions
      </Typography>

      <Grid rows={[]} columns={columns}>
        <Table />
        <SortingState
          defaultSorting={[{ columnName: 'created_at', direction: 'desc' }]}
        />
        <SearchState defaultValue="" />
        <PagingState defaultCurrentPage={0} pageSize={5} />
        <TableHeaderRow showSortingControls />
        <IntegratedFiltering />
        <Toolbar />
        <SearchPanel />
        <PagingPanel />
        <IntegratedPaging />
      </Grid>
    </Container>
  );
};

export default TransactionsPage;
