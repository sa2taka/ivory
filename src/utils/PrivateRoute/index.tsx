import React, { ReactNode, ComponentProps, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthorized } from '@/utils/Authorization/Mastodon/authorization';

type RouterProps = ComponentProps<typeof Route>;

interface Props extends RouterProps {
  children: ReactNode;
}

export const PrivateRoute: React.FC<Props> = ({ children, ...rest }) => {
  const [isAhoutrizedState, setAuthorizedStatus] = useState(false);
  const [isLoading, setLoading] = useState(true);

  if (isLoading) {
    isAuthorized().then((value) => {
      setAuthorizedStatus(value);
      setLoading(false);
    });
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoading || isAhoutrizedState ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/getting-started',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
