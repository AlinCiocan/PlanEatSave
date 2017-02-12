import React, { Component } from 'react';
import { ApiRequest } from '../../services/ApiRequest';
import RecipeService from '../../services/RecipeService';
import Routes from '../../services/Routes';
import TopBar from '../TopBar/TopBar';
import Recipe from './Recipe';
import EmptyRecipeNameAlert from './EmptyRecipeNameAlert';

export default class EditRecipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipe: null,
            isRecipeVisible: true,
            message: null,
            shouldDisplayIsRecipeNameEmptyAlert: false
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

    getLoadingMsgForFetching() {
        return (<h3> Loading your recipe... </h3>);
    }

    getErrorMessage() {
        return (
            <h3 style={{ color: 'red' }}> There was an error with our server. Please try again! </h3>
        );
    }

    getLoadingMsgForUpdating() {
        return (<h3> Updating your recipe... </h3>);
    }

    editRecipe() {
        if (!this.state.recipe.name) {
            this.setState({ shouldDisplayIsRecipeNameEmptyAlert: true });
            return;
        }

        this.setState({ isRecipeVisible: false, message: this.getLoadingMsgForUpdating() });

        const ingredients = this.state.recipe.ingredients
            .map(ingredient => ingredient.name)
            .filter(ingredientName => ingredientName.trim().length > 0);

        const recipe = { ...this.state.recipe, ingredients };
        ApiRequest
            .editRecipe(recipe)
            .then(
            rsp => {
                this.goToViewRecipe();
            },
            err => {
                console.log(err);
                this.setState({ message: this.getErrorMessage(err), isRecipeVisible: true });
            });
    }

    goToViewRecipe() {
        this.props.router.push(Routes.viewRecipe(this.props.params.recipeId))
    }

    onRecipeChange(recipe) {
        this.setState({ recipe });
    }

    renderRecipe() {
        if (this.state.isRecipeVisible && this.state.recipe) {
            return (
                <Recipe
                    recipe={this.state.recipe}
                    onChange={recipe => this.onRecipeChange(recipe)} />
            );
        }

        return null;
    }

    render() {
        return (
            <div>
                <TopBar
                    backButton backButtonText="Edit recipe" backButtonOnClick={() => this.goToViewRecipe()}
                    saveButton saveButtonOnClick={() => this.editRecipe()} />
                <div className="row">
                    {this.state.message}
                    {this.renderRecipe()}
                </div>

                <EmptyRecipeNameAlert
                    isOpen={this.state.shouldDisplayIsRecipeNameEmptyAlert}
                    onAction={() => this.setState({ shouldDisplayIsRecipeNameEmptyAlert: false })}
                />
            </div>
        );
    }
}