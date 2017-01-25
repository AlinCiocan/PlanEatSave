import React, { Component } from 'react';
import moment from 'moment';

import { ApiRequest } from '../../services/ApiRequest';
import Routes from '../../services/Routes';
import TopBar from '../TopBar/TopBar';
import RecipesList from './RecipesList';

export default class MyRecipesPageContainer extends Component {
    render() {
        return (
            <div>
                <TopBar addButton addButtonOnClick={() => this.props.router.push(Routes.addMyRecipe())} />

                <RecipesList title="Recipes" recipes={[
                    { id: 1, name: 'Lasagne', ingredients: ['tomatoes', 'pasta', 'carrots'], preparation: 'Put all in the oven' },
                    { id: 2, name: 'Lasagne 2', ingredients: ['tomatoes2', 'pasta2', 'carrots2'], preparation: 'Put all in the oven 2' }]} />
            </div>
        );
    }
}