import React from 'react';

import { useRouter } from 'next/router';

import { AxiosError } from 'axios';
import { SWRConfiguration } from 'swr';
import useSWR from 'swr';

import makeHttp from 'utils/http';

function fetcher(url: string) {
  return makeHttp()
    .get(url)
    .then((response) => response.data);
}

export function useAuthSwr(url: string, config?: SWRConfiguration) {
  const { push } = useRouter();

  const { data, error } = useSWR<any, AxiosError>(url, fetcher, config);

  React.useEffect(() => {
    if (error?.response?.status === 401) {
      push('/logout');
    }
    if (error) {
      console.error(error);
    }
  }, [error, push]);

  return { data, error };
}
