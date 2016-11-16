import React, { Component } from 'react';
import { Link } from 'react-router';
import TopBar from '../TopBar/TopBar';
import TokenStore from '../../services/TokenStore';

class LandingPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isUserLoggedIn: TokenStore.isUserLoggedIn()
    };
  }  
  

  logOut() {
    TokenStore.logOut();
    this.setState({isUserLoggedIn: false});
  }  

  renderNotLoggedUserActions() {
    return (
      <div>
        <Link to={`/register`}>Create new account</Link>
        <br />
        <Link to={`/login`}>Login</Link>
      </div>
    );
  }

  renderLoggedInUserActions() {
    return (
      <div>
        <h3> Hey there, have a lovely day!</h3>
        <Link to={'/pantry'}> My Pantry </Link>
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
