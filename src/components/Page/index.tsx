import React from 'react';

import { Container, makeStyles } from '@material-ui/core';

import Navbar from 'components/Navbar';

const useStyles = makeStyles(() => ({
  container: {
    height: 'calc(100% - 64px)',
  },
}));

export type PageProps = {
  children: any;
};

const Page: React.FunctionComponent<PageProps> = (props) => {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Container className={classes.container}>{props.children}</Container>
    </>
  );
};

export default Page;
