import React, { Component } from 'react';
import moment from 'moment';

import { ApiRequest } from '../../services/ApiRequest';
import TopBar from '../TopBar/TopBar';

export default class PantryPageContainer extends Component {
    getAddRecipeButton() {
        return (
            <button
                className="top-bar__side top-bar__side--right top-bar__add-button"
                onClick={() => this.props.router.push(`/my-recipes/${this.state.myrecipes.id}/add-recipe`)}>ADD</button>
        );
    }

    render() {
        return (
            <div>
                <TopBar rightSide={this.getAddRecipeButton()} />
                <h1> My recipes here !!</h1>
            </div>
        );
    }
}