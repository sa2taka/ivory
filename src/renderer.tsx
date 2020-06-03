import React from 'react';
import ReactDOM from 'react-dom';
import '@/style/tailwind.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { PrivateRoute } from './libs/PrivateRoute';
import { Main } from './components/pages/Main';

const app = document.getElementById('app');

ReactDOM.render(
  <Router>
    <Switch>
      <PrivateRoute path="/protected">
        <Main></Main>
      </PrivateRoute>
    </Switch>
  </Router>,
  app
);
