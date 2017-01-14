import React, { Component } from 'react';
import { ApiRequest } from '../../services/ApiRequest';
import ApiRequestsErrorHandler from '../../services/ApiRequestsErrorHandler';
import BrowserStore from '../../services/BrowserStore';
import TopBar from '../TopBar/TopBar';
import Routes from '../../services/Routes';

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

    getNextPath() {
        if (this.props.location.state && this.props.location.state.nextPathname) {
            return this.props.location.state.nextPathname;
        }

        return Routes.myPantry();
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
            .then(token => {
                BrowserStore.storeTokenFromApi(token.text);
                return ApiRequest.getUserInfo();
            }, this.failedLogin.bind(this))
            .then(userInfo => {
                BrowserStore.storeUserInfo(userInfo.text);
                this.props.router.push(this.getNextPath());
            }, this.failedLogin.bind(this));
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