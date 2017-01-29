import React, { Component } from 'react';
import uuid from 'uuid';

import { ApiRequest } from '../../services/ApiRequest';
import Routes from '../../services/Routes';
import TopBar from '../TopBar/TopBar';
import RecipesList from './RecipesList';

export default class MyRecipesPageContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: null,
            message: null
        };
    }

    processRecipes(recipes) {
        return recipes.map(recipe => ({ ...recipe, ingredients: this.addUniqueIdsForIngredients(recipe.ingredients) }));
    }

    addUniqueIdsForIngredients(ingredients) {
        return ingredients.map(ingredient => ({ ...ingredient, id: uuid.v4() }));
    }

    componentDidMount() {
        this.setState({ message: this.getLoadingMessage() });

        ApiRequest
            .retrieveRecipes()
            .then(
            rsp => {
                this.setState({ recipes: this.processRecipes(rsp.body), message: null })
            },
            err => {
                this.setState({ message: this.getErrorMessage() })
            });
    }

    getLoadingMessage() {
        return (<h3> Loading your recipes... </h3>);
    }

    getErrorMessage(err, item) {
        return (
            <h3 style={{ color: 'red' }}> There was an error with our server. Please try again! </h3>
        );
    }

    renderRecipes() {
        if (this.state.recipes !== null) {
            return (
                <RecipesList title="Recipes" recipes={this.state.recipes} />
            );
        }

        return null;
    }

    render() {
        return (
            <div>
                <TopBar addButton addButtonOnClick={() => this.props.router.push(Routes.addMyRecipe())} />

                <div className="row">
                    {this.state.message}
                    {this.renderRecipes()}
                </div>
            </div>
        );
    }
}