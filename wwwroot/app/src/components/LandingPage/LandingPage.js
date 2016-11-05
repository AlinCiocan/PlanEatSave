import React, { Component } from 'react';
import { Link } from 'react-router';

class LandingPage extends Component {
  render() {
    return (
      <div>
        <h1> Plan. Eat. Save. homepage !</h1>
        <Link to={`/register`}>Create new account</Link>
        <br/>
        <Link to={`/login`}>Login</Link>
      </div>  
    );
  }
}

export default LandingPage;
