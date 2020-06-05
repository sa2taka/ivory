import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { PrivateRoute } from '@/libs/PrivateRoute';
import { Main } from '@/components/pages/Main';
import { GettingStarted } from '@/components/pages/GettingStarted';
interface Props {}

export const Routing: React.FC<Props> = () => {
  return (
    <Router>
      <Route path="/getting-started">
        <GettingStarted />
      </Route>
      <PrivateRoute path="/" exact>
        <Main />
      </PrivateRoute>
    </Router>
  );
};
