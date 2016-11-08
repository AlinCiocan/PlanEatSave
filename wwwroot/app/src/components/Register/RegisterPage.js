import React, { Component } from 'react';
import { ApiRequest } from '../../services/ApiRequest';
import  ApiRequestsErrorHandler  from '../../services/ApiRequestsErrorHandler';
import TopBar from '../TopBar/TopBar';

import './register.css'

export default class RegisterPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shouldShowErrorMsg: false,
            errorMsg: ''
        };
    }

    showErrorMsg(msg) {
        this.setState({ shouldShowErrorMsg: true, errorMsg: msg });
    }

    hideErrorMsg() {
        this.setState({ shouldShowErrorMsg: false });
    }    
    
    createNewAccountFailed(err) {
        this.showErrorMsg(ApiRequestsErrorHandler.getErrorMessage(err));
    }

    accountWasCreatedSuccessfully(value) {
        alert('Your account was created successfully. Now you\'ll be redirected to login page!');
        this.props.router.push('/login');
    }


    register() {
        this.hideErrorMsg();

        var email = this.refs.email.value;
        var password = this.refs.password.value;

        var user = { email, password };

        ApiRequest
            .createNewAccount(user)
            .then(this.accountWasCreatedSuccessfully.bind(this), this.createNewAccountFailed.bind(this));
    }

    render() {
        var _this = this;
        return (
            <div>
                <TopBar />
                <h3> Create new account </h3>
                <input type="email" ref="email" placeholder="Email address" />
                <br />
                <br />
                <input type="password" ref="password" placeholder="Password" />
                <br />
                <br />
                <button onClick={(event) => _this.register()}> Create account </button>
                <br />
                <br />
                <div className="registration__error-msg { this.state.shouldShowErrorMsg? 'registration__error-msg--hidden' : ''}">
                    {this.state.errorMsg}
                </div>
            </div>
        );
    }
}
