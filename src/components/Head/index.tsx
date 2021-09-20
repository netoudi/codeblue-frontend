import React from 'react';

import { default as NextHead } from 'next/head';

export type HeadProps = {
  title: string;
};

const Head: React.FunctionComponent<HeadProps> = (props) => {
  return (
    <NextHead>
      <title>{props.title} - CODEBLUE</title>
      {props.children}
    </NextHead>
  );
};

export default Head;
