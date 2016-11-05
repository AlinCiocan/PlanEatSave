import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    var _this = this;

    return (
      <div>
        <h1> Plan. Eat. Save</h1>
        <div>
          {React.Children.map(this.props.children, (child => React.cloneElement(child, { router: _this.props.router})))}
        </div>
      </div>
    );
  }
}

export default App;
