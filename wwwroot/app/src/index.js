import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Router, Route, IndexRoute } from 'react-router'
import App from './components/App/App';
import RegisterPage from './components/Register/RegisterPage';
import LoginPage from './components/Login/LoginPage';
import LandingPage from './components/LandingPage/LandingPage';
import PantryPageContainer from './components/PantryPage/PantryPageContainer';
import BrowserStore from './services/BrowserStore';
import PantryAddNewItem from './components/PantryPage/PantryAddNewItem';
import PantryUpdateItem from './components/PantryPage/PantryUpdateItem';
import MyRecipesPageContainer from './components/MyRecipesPage/MyRecipesPageContainer';
import Routes from './services/Routes';

import './index.css';


function requiresAuthentication(nextState, replace) {
  if (!BrowserStore.getAuthToken()) {
    replace({
      pathname: Routes.login(),
      state: { nextPathname: nextState.location.pathname }
    })
  }
}


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path={"/"} component={App} >
      <IndexRoute component={LandingPage} />
      <Route path="login" component={LoginPage} />
      <Route path="register" component={RegisterPage} />
      <Route path="pantry" component={PantryPageContainer} onEnter={requiresAuthentication} />
      <Route path="pantry/:pantryId/add-item" component={PantryAddNewItem} onEnter={requiresAuthentication} />
      <Route path="pantry/:pantryId/edit-item/:itemId" component={PantryUpdateItem} onEnter={requiresAuthentication} />
      <Route path="my-recipes" component={MyRecipesPageContainer} onEnter={requiresAuthentication} />
    </Route>
  </Router>,
  document.getElementById('root')
);
