import React, { Component } from 'react';
import moment from 'moment';

import { ApiRequest } from '../../services/ApiRequest';
import Routes from '../../services/Routes';
import TopBar from '../TopBar/TopBar';

export default class MyRecipesPageContainer extends Component {
    render() {
        const myRecipesId = 123;

        return (
            <div>
                <TopBar addButton addButtonOnClick={() => this.props.router.push(Routes.addMyRecipe(myRecipesId))} />
                <h1> List of my recipes here !!</h1>
            </div>
        );
    }
}