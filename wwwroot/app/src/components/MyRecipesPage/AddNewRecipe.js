import React, { Component } from 'react';
import moment from 'moment';
import { ApiRequest } from '../../services/ApiRequest';
import Routes from '../../services/Routes';
import TopBar from '../TopBar/TopBar';
import Recipe from './Recipe';

export default class AddNewRecipe extends Component {

    saveRecipe() {

    }

    render() {
        return (
            <div>
                <TopBar 
                backButton backButtonText="Add recipe" backButtonOnClick={() => this.props.router.push(Routes.myRecipes())}
                saveButton saveButtonOnClick={() => this.saveRecipe()} />
               
                <Recipe />
            </div>
        );
    }
}