import React, { Component } from 'react';
import { Link } from 'react-router';

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Link to={`/register`}>Create new account</Link>
        <br/>
        <Link to={`/login`}>Login</Link>
      </div>  
    );
  }
}

export default LandingPage;
