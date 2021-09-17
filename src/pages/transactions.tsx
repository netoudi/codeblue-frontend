import { GetServerSideProps, NextPage } from 'next';

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

import { Token, validateAuth } from 'utils/auth';
import http from 'utils/http';
import { Transaction } from 'utils/models';

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

export type TransactionsPageProps = {
  transactions: Transaction[];
};

const TransactionsPage: NextPage<TransactionsPageProps> = (props) => {
  return (
    <Container>
      <Typography component="h1" variant="h4">
        My transactions
      </Typography>

      <Grid rows={props.transactions} columns={columns}>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = validateAuth(ctx.req);

  if (!auth) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  const token = (auth as Token).token;

  const { data: transactions } = await http.get('/transactions', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    props: {
      transactions,
    },
  };
};
