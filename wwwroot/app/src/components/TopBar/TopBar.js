import React, { Component } from 'react';
import { Link } from 'react-router';
import logo from '../../images/logo.svg';
import './topbar.css';

export default class TopBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="top-bar">
                <Link to="/" className="top-bar__logo">
                    <img src={logo} alt="logo"/>
                </Link>
            </div>
        );
    }
}
