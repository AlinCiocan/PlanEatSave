import React, { Component } from 'react';

import './login.css'

export default class LoginPage extends Component {
    render() {
        return (
            <div> 
                <h1> Login </h1>
                <input type="email" ref="email" placeholder="john@doe.com" />
                <br />
                <br />
                <input type="password" ref="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" />
                <br />
                <br />
                <button onClick={(event) => this.register()}> Create account </button>
                <br />
               
            </div>    
        );
        /* <div className="registration__error-msg { this.state.shouldShowErrorMsg? 'registration__error-msg--hidden' : ''}">
                </div> */
    }
}