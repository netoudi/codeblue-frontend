import React from 'react';

import { isEqual } from 'lodash';

import { useAuthSwr } from 'hooks/useAuthSwr';

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  balance: number;
}

export const TenantContext = React.createContext<Tenant>(null as any);

export const TenantProvider: React.FunctionComponent = (props) => {
  const [tenant, setTenant] = React.useState<Tenant>();
  const { data } = useAuthSwr('my-account', {
    refreshInterval: 10000,
  });

  React.useEffect(() => {
    if (!isEqual(data, tenant)) {
      setTenant(data);
    }
  }, [data, tenant]);

  return (
    <TenantContext.Provider value={tenant as any}>
      {props.children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => React.useContext(TenantContext);
