import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { PrivateRoute } from '@/utils/PrivateRoute';
import { Main } from './Main';
import { GettingStarted } from './GettingStarted';
import { LoginMatodon } from './LoginMatodon';
import { Auth } from './Auth';
import queryString from 'query-string';

interface Props {}

export const Routing: React.FC<Props> = () => {
  return (
    <Router>
      <Route path="/getting-started">
        <GettingStarted />
      </Route>
      <Route path="/login-mastodon">
        <LoginMatodon />
      </Route>
      <Route
        path="/redirect-mastodon"
        render={(props) => (
          <Auth qs={queryString.parse(props.location.search)} />
        )}
      />
      <PrivateRoute path="/" exact>
        <Main />
      </PrivateRoute>
    </Router>
  );
};
