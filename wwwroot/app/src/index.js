import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Router, Route, IndexRoute } from 'react-router'
import App from './components/App/App';
import RegisterPage from './components/Register/RegisterPage';
import LoginPage from './components/Login/LoginPage';
import LandingPage from './components/LandingPage/LandingPage';
import PantryPage from './components/PantryPage/PantryPage';
import TokenStore from './services/TokenStore';

import './index.css';


function requiresAuthentication(nextState, replace) {
  if (!TokenStore.getAuthToken()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/pantry" component={PantryPage} onEnter={requiresAuthentication} />
    </Route>
  </Router>,
  document.getElementById('root')
);
