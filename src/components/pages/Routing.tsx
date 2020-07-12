import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { PrivateRoute } from '@/utils/PrivateRoute';
import { Main } from './Main';
import { GettingStarted } from './GettingStarted';
import { LoginMatodon } from './LoginMatodon';

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
      <PrivateRoute path="/" exact>
        <Main />
      </PrivateRoute>
    </Router>
  );
};
