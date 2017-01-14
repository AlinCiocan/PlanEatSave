import React, { Component } from 'react';
import { Link } from 'react-router';
import TopBar from '../TopBar/TopBar';
import BrowserStore from '../../services/BrowserStore';
import Routes from '../../services/Routes';

class LandingPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isUserLoggedIn: BrowserStore.isUserLoggedIn(),
      userInfo: BrowserStore.getUserInfo()
    };
  }


  logOut() {
    BrowserStore.logOut();
    this.setState({ isUserLoggedIn: false });
  }

  renderNotLoggedUserActions() {
    return (
      <div>
        <Link to={Routes.register()}>Create new account</Link>
        <br />
        <Link to={Routes.login()}>Login</Link>
      </div>
    );
  }

  renderLoggedInUserActions() {
    let email = '';
    if (this.state.userInfo && this.state.userInfo.email) {
      email = `(${this.state.userInfo.email})`;
    }
    return (
      <div>
        <h3> Hey there, have a lovely day! {email}</h3>
        <Link to={Routes.myPantry()}> My Pantry </Link>
        <br />
        <Link to={Routes.myRecipes()}> My Recipes </Link>
        <br />
        <br />
        <button onClick={() => this.logOut()}> Log out </button>

      </div>
    );
  }

  renderActions() {
    if (this.state.isUserLoggedIn) {
      return this.renderLoggedInUserActions();
    }

    return this.renderNotLoggedUserActions();
  }

  render() {
    return (
      <div>
        <TopBar />
        {this.renderActions()}
      </div>
    );
  }
}

export default LandingPage;
