import React, { Component } from 'react';
import { ApiRequest } from '../../services/ApiRequest';
import RecipeService from '../../services/RecipeService';
import Routes from '../../services/Routes';
import TopBar from '../TopBar/TopBar';
import ViewRecipe from './ViewRecipe';

export default class ViewRecipeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipe: null,
            message: this.getLoadingMessage()
        };
    }

    componentDidMount() {
        ApiRequest
            .retrieveRecipe(this.props.params.recipeId)
            .then(
            rsp => {
                const recipe = rsp.body;
                if (recipe) {
                    this.setState({ recipe: RecipeService.processRecipe(recipe), message: null });
                    return;
                }

                this.setState({ message: this.noRecipeFoundMessage() });
            },
            err => {
                this.setState({ message: this.getErrorMessage() });
            });
    }

    noRecipeFoundMessage() {
        return (<h3> No recipe was found </h3>);
    }
    
    getLoadingMessage() {
        return (<h3> Loading your recipe... </h3>);
    }

    getErrorMessage() {
        return (
            <h3 style={{ color: 'red' }}> There was an error with our server. Please try again! </h3>
        );
    }

    renderRecipe() {
        if (this.state.recipe) {
            return (
                <ViewRecipe recipe={this.state.recipe} />
            );
        }

        return null;
    }

    goToMyRecipes() {
        this.props.router.push(Routes.myRecipes());
    }

    goToEditRecipe() {
        this.props.router.push(Routes.editMyRecipe(this.props.params.recipeId));
    }

    render() {
        return (
            <div>
                <TopBar
                    hideLogo
                    backButton backButtonText="View recipe" backButtonOnClick={() => this.goToMyRecipes()}
                    editButton editButtonOnClick={() => this.goToEditRecipe()}
                    />

                <div className="row">
                    {this.state.message}
                    {this.renderRecipe()}
                </div>
            </div>
        );
    }
}