import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

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
import { Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { format, parseISO } from 'date-fns';

import Head from 'components/Head';
import Page from 'components/Page';

import { withAuth } from 'hof/withAuth';

import makeHttp from 'utils/http';
import { Transaction } from 'utils/models';

const columns: Column[] = [
  {
    name: 'payment_date',
    title: 'Payment date',
    getCellValue: (row: any, columnName: string) => {
      return format(parseISO(row[columnName].slice(0, 10)), 'MM/dd/yyyy');
    },
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
    getCellValue: (row: any, columnName: string) => {
      return format(parseISO(row[columnName].slice(0, 10)), 'MM/dd/yyyy');
    },
  },
];

export type TransactionsPageProps = {
  transactions: Transaction[];
};

const TransactionsPage: NextPage<TransactionsPageProps> = (props) => {
  const router = useRouter();

  return (
    <Page>
      <Head title="My transactions" />

      <Typography component="h1" variant="h4">
        My transactions
      </Typography>

      <Button
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        onClick={() => router.push('/transactions/new')}
      >
        Add
      </Button>

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
    </Page>
  );
};

export default TransactionsPage;

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx, { token }) => {
    const { data: transactions } = await makeHttp(token).get('/transactions');

    return {
      props: {
        transactions,
      },
    };
  }
);
