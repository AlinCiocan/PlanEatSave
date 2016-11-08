import React, { Component } from 'react';
import { Link } from 'react-router';
import TopBar from '../TopBar/TopBar';

class LandingPage extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <Link to={`/register`}>Create new account</Link>
        <br/>
        <Link to={`/login`}>Login</Link>
      </div>  
    );
  }
}

export default LandingPage;
