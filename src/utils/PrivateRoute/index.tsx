import React, { ComponentProps } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { MastodonAuthorization } from '@/utils/Authorization/mastodonAuthorization';

type RouterProps = ComponentProps<typeof Route>;

interface Props extends RouterProps {
  children: any;
}

export const PrivateRoute: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        MastodonAuthorization.isAuthorized() ? (
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
