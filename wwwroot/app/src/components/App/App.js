import React, { Component } from 'react';
import './App.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router';

class App extends Component {
  render() {
    var _this = this;

    return (
      <div>

        <div className="top-bar">
          <Link to="/" className="top-bar__logo">
            <img src={logo} />
          </Link>
        </div>

        {React.Children.map(this.props.children, (child => React.cloneElement(child, { router: _this.props.router })))}
      </div>
    );
  }
}

export default App;
