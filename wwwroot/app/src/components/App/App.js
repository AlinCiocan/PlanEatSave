import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    var _this = this;

    return (
      <div>
        {React.Children.map(this.props.children, (child => React.cloneElement(child, { router: _this.props.router })))}
      </div>
    );
  }
}

export default App;
