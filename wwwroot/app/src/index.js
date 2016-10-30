import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Router, Route, Link } from 'react-router'
import App from './components/App/App';
import RegisterPage from './components/Register/RegisterPage';
import LoginPage from './components/Login/LoginPage';
import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/login" component={LoginPage} />
    <Route path="/register" component={RegisterPage} />
  </Router>,
  document.getElementById('root')
);
