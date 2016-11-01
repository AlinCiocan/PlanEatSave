import React, { Component } from 'react';
import { ApiRequest } from '../../services/apiRequest';
import './register.css'

export default class RegisterPage extends Component {

    createNewAccountFailed(err) {
        console.log("failed because ", err);
    }    

    accountWasCreatedSuccessfully(value) {
        console.log("account created successfully", value);
        alert("account created successfully", value);
        this.props.history.push("/login");
    }
    
    register() {
        var email = this.refs.email.value;
        var password = this.refs.password.value;

        var user = {
            email,
            password
        };        

        ApiRequest
            .createNewAccount(user)
            .then(this.accountWasCreatedSuccessfully, this.createNewAccountFailed);
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
            </div>
        );
    }
}
