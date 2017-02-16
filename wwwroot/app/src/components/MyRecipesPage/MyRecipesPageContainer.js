import React, { Component } from 'react';
import { ApiRequest } from '../../services/ApiRequest';
import Routes from '../../services/Routes';
import RecipeService from '../../services/RecipeService';
import TopBar from '../TopBar/TopBar';
import RecipesList from './RecipesList';
import ConfirmModal from '../base/modal/ConfirmModal';
import SearchInput from '../base/search/SearchInput';

export default class MyRecipesPageContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: null,
            message: null,
            recipeIdToBeRemoved: null,
            searchTerm: ''
        };
    }

    componentDidMount() {
        this.retrieveRecipes()
    }

    retrieveRecipes() {
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

    getRemovingYourRecipeMessage() {
        return (<h3> Removing your recipe... </h3>);
    }

    getErrorMessage() {
        return (
            <h3 style={{ color: 'red' }}> There was an error with our server. Please try again! </h3>
        );
    }

    onSearch(searchTerm) {
        this.setState({ searchTerm });
    }

    getSearchedRecipes() {
        const searchTerm = this.state.searchTerm.trim().toLocaleLowerCase();
        if (!searchTerm) {
            return this.state.recipes;
        }

        return this.state.recipes.filter(recipe => recipe.name.toLocaleLowerCase().indexOf(searchTerm) >= 0);
    }

    renderRecipes() {
        if (this.state.recipes !== null) {
            const searchedRecipes = this.getSearchedRecipes();

            return (
                <div>
                    <div className="my-recipe-container__search">
                        <SearchInput onChange={searchTerm => this.onSearch(searchTerm)} />
                    </div>

                    <RecipesList
                        title="Recipes"
                        recipes={searchedRecipes}
                        onRecipeClick={recipeId => this.props.router.push(Routes.viewRecipe(recipeId))}
                        onRecipeRemove={recipeId => this.setState({ recipeIdToBeRemoved: recipeId })}
                    />
                </div>
            );
        }

        return null;
    }

    removeRecipe(recipeId) {
        this.setState({ recipeIdToBeRemoved: null, message: this.getRemovingYourRecipeMessage() });

        ApiRequest.removeRecipe(recipeId).then(response => {
            const {isSuccess, message} = response.body;
            if (!isSuccess) {
                console.log(message);
            }

            this.retrieveRecipes();
        }, err => {
            // TODO: also make sure to treat the forbidden requests
            console.log(err);
            this.setState({ message: this.getErrorMessage() });
        });
    }

    renderRemoveModal() {
        const isRecipeToBeDeleted = !!this.state.recipeIdToBeRemoved;
        const modalTitle = 'Are you sure you want to remove this recipe?';

        return (
            <ConfirmModal
                isOpen={isRecipeToBeDeleted}
                title={modalTitle}
                cancelButtonText="Cancel"
                onCancel={() => this.setState({ recipeIdToBeRemoved: null })}
                actionButtonText="Remove"
                onAction={() => this.removeRecipe(this.state.recipeIdToBeRemoved)}
            />
        );
    }

    render() {
        return (
            <div>
                <TopBar addButton addButtonOnClick={() => this.props.router.push(Routes.addMyRecipe())} />

                <div className="row">
                    {this.state.message}
                    {this.renderRecipes()}
                </div>

                {this.renderRemoveModal()}
            </div>
        );
    }
}