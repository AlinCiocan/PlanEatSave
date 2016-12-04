import React, { Component } from 'react';
import { Link } from 'react-router';
import logo from './logo.svg';

export default class TopBar extends Component {
    render() {
        return (
            <div className="top-bar">
                
                {this.props.leftSide}

                <Link to="/" className="top-bar__logo">
                    <img src={logo} alt="logo"/>
                </Link>

                {this.props.rightSide}
            </div>
        );
    }
}
