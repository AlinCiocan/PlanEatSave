import React, { Component } from 'react';

import { ApiRequest } from '../../services/ApiRequest';
import Routes from '../../services/Routes';
import RecipeService from '../../services/RecipeService';
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

    componentDidMount() {
        this.setState({ message: this.getLoadingMessage() });

        ApiRequest
            .retrieveRecipes()
            .then(
            rsp => {
                this.setState({ recipes: RecipeService.processRecipes(rsp.body), message: null })
            },
            err => {
                this.setState({ message: this.getErrorMessage() })
            });
    }

    getLoadingMessage() {
        return (<h3> Loading your recipes... </h3>);
    }

    getErrorMessage() {
        return (
            <h3 style={{ color: 'red' }}> There was an error with our server. Please try again! </h3>
        );
    }

    renderRecipes() {
        if (this.state.recipes !== null) {
            return (
                <RecipesList title="Recipes" recipes={this.state.recipes} onRecipeClick={recipeId => this.props.router.push(Routes.viewRecipe(recipeId))} />
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