import React, { ReactNode, ComponentProps, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {
  isAuthorized,
  setDispathAuthFunction,
} from '@/utils/Authorization/Mastodon/authorization';

type RouterProps = ComponentProps<typeof Route>;

interface Props extends RouterProps {
  children: ReactNode;
}

export const PrivateRoute: React.FC<Props> = ({ children, ...rest }) => {
  const [isAuthorizedState, setAuthorizedStatus] = useState(false);
  const [isLoading, setLoading] = useState(true);

  // Routerの仕様的にどうしてもiSAuthorizedStateの変更が難しかったので
  // 変更用の関数を利用してライブラリ内で直に叩いてもらうようにした
  setDispathAuthFunction(setAuthorizedStatus);

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
        isLoading || isAuthorizedState ? (
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
