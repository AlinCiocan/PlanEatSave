import React, { Component } from 'react';
import { ApiRequest } from '../../services/ApiRequest';
import  ApiRequestsErrorHandler  from '../../services/ApiRequestsErrorHandler';
import  TokenStore  from '../../services/TokenStore';
import TopBar from '../TopBar/TopBar';

import './login.css'

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shouldShowErrorMsg: false,
            errorMsg: ''
        };
    }

    hideErrorMsg() {
        this.setState({ shouldShowErrorMsg: false });
    }

    showErrorMsg(msg) {
        this.setState({ shouldShowErrorMsg: true, errorMsg: msg });
    }

    loginSuccessfully(rsp) {
        TokenStore.storeTokenFromApi(rsp.text);

        var nextPath = '/pantry'; 
        if (this.props.location.state && this.props.location.state.nextPathname) {
            nextPath = this.props.location.state.nextPathname;
        }

        this.props.router.push(nextPath);
    }

    failedLogin(err) {
        this.showErrorMsg(ApiRequestsErrorHandler.getErrorMessage(err));
    }
    
    login() {
        this.hideErrorMsg();

        var email = this.refs.email.value;
        var password = this.refs.password.value;

        var user = { email, password };

        ApiRequest
            .login(user)
            .then(this.loginSuccessfully.bind(this), this.failedLogin.bind(this));
    }


    render() {
        return (
            <div>
                <TopBar />
                <h3> Login </h3>
                <input type="email" ref="email" placeholder="john@doe.com" />
                <br />
                <br />
                <input type="password" ref="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" />
                <br />
                <br />
                <button onClick={(event) => this.login()}> Login </button>
                <br />
                <div className="login__error-msg { this.state.shouldShowErrorMsg? 'login__error-msg--hidden' : ''}">
                    {this.state.errorMsg}
                </div>
            </div>
        );

    }
}