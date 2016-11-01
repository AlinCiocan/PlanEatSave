import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';

// import '../../lib/routie/routie';
// import RegisterPage from '../Register/RegisterPage';
// import LoginPage from '../Login/LoginPage';

class App extends Component {
  render() {
    return (
      <div>
        <h1> Food Plan app homepage </h1>
        <Link to={`/register`}>Create new account</Link>
        <br/>
        <Link to={`/login`}>Login</Link>
      </div>  
    );
  }
}

export default App;
