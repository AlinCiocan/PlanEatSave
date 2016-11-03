import React, { Component } from 'react';
import { ApiRequest } from '../../services/apiRequest';
import './register.css'

export default class RegisterPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shouldShowErrorMsg: false,
            errorMsg: ""
        };
    }

    showErrorMsg(msg) {
        this.setState({ shouldShowErrorMsg: true, errorMsg: msg });
    }

    hideErrorMsg() {
        this.setState({ shouldShowErrorMsg: false });
    }    
    
    createNewAccountFailed(err) {
        console.log("Registration failed due to the following error ", err);
        this.showErrorMsg(err);
    }

    accountWasCreatedSuccessfully(value) {
        console.log("account created successfully", value);
        alert("account created successfully", value);
        this.props.history.push("/login");
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
        return (
            <div>
                <h1> Create new account </h1>
                <input type="email" ref="email" placeholder="Email address" />
                <br />
                <br />
                <input type="password" ref="password" placeholder="Password" />
                <br />
                <br />
                <button onClick={(event) => this.register()}> Create account </button>
                <br />
                <div className="registration__error-msg { this.state.shouldShowErrorMsg? 'registration__error-msg--hidden' : ''}">
                    {this.state.errorMsg}
                </div>
            </div>
        );
    }
}
