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
import { Report } from 'utils/models';

const columns: Column[] = [
  {
    name: 'start_date',
    title: 'Start date',
    getCellValue: (row: any, columnName: string) => {
      return format(parseISO(row[columnName].slice(0, 10)), 'MM/dd/yyyy');
    },
  },
  {
    name: 'end_date',
    title: 'End date',
    getCellValue: (row: any, columnName: string) => {
      return format(parseISO(row[columnName].slice(0, 10)), 'MM/dd/yyyy');
    },
  },
  {
    name: 'status',
    title: 'Status',
  },
  {
    name: 'file_url',
    title: 'Download',
  },
  {
    name: 'created_at',
    title: 'Created At',
    getCellValue: (row: any, columnName: string) => {
      return format(parseISO(row[columnName].slice(0, 10)), 'MM/dd/yyyy');
    },
  },
];

export type ReportsPageProps = {
  reports: Report[];
};

const ReportsPage: NextPage<ReportsPageProps> = (props) => {
  const router = useRouter();

  return (
    <Page>
      <Head title="My reports" />

      <Typography component="h1" variant="h4">
        My reports
      </Typography>

      <Button
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        onClick={() => router.push('/reports/new')}
      >
        Add
      </Button>

      <Grid rows={props.reports} columns={columns}>
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

export default ReportsPage;

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx, { token }) => {
    const { data: reports } = await makeHttp(token).get('/reports');

    return {
      props: {
        reports,
      },
    };
  }
);
