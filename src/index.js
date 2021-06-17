import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import './index.css';
import Login from './Pages/Login/login';
import Dashboard from './Pages/Dashboard/dashboard';
import NotFound from './Constants/notFound';

const routes = (
  <Router>
    {/* {sessionStorage.getItem("username") !== null ? <Redirect to='/dashboard'/> : <Redirect to='/' />} */}
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/dashboard' component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)

ReactDOM.render(
  routes,
  document.getElementById('root')
);
