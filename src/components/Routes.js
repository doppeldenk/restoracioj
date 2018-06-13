import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard';
import Login from './Login';
import Users from '../containers/UsersContainer';

const Routes = () => (
  <Switch>
    <Route
      path="/dashboard"
      component={Dashboard}
    />

    <Route
      path="/login"
      component={Login}
    />

    <Route
      path="/users"
      component={Users}
    />

    <Route
      path="/"
      component={Dashboard}
    />
  </Switch>
);

export default Routes;
