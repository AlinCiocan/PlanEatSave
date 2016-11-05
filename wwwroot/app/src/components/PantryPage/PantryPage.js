import React, { Component } from 'react';
import { ApiRequest } from '../../services/ApiRequest';
import  ApiRequestsErrorHandler  from '../../services/ApiRequestsErrorHandler';

export default class PantryPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3> You are logged in you pantry! </h3>
            </div>
        );

    }
}