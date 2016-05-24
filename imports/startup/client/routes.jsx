import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// route components
import AppContainer from '../../ui/containers/AppContainer.jsx';
import LogsContainer from '../../ui/containers/LogsContainer.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer} />
    <Route path="/logs/:id" component={LogsContainer} />
  </Router>
);
