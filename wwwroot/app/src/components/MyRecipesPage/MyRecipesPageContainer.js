import React, { Component } from 'react';
import moment from 'moment';

import { ApiRequest } from '../../services/ApiRequest';
import TopBar from '../TopBar/TopBar';



export default class PantryPageContainer extends Component {
    render() {
        return (
            <div>
                <TopBar />
                <h1> My recipes here !!</h1>
            </div>
        );
    }
}