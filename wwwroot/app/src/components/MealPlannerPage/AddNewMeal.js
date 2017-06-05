import React from 'react';
import Select from 'react-select';
import Routes from '../../services/Routes';
import TopBar from '../TopBar/TopBar';
import { ApiRequest } from '../../services/ApiRequest';
import DateFormatter from '../../utils/DateFormatter';

export default class AddNewMeal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: this.getRetrievingYourRecopesMessage(),
            isAddMealVisible: false,
            recipes: [],
            selectedRecipeId: null
        };

        this.saveMeal = this.saveMeal.bind(this);
    }

    getMealDate() {
        return DateFormatter.stringToDate(this.props.location.query.mealDate);
    }

    componentDidMount() {
        ApiRequest.retrieveRecipes()
            .then(rsp => {
                const recipes = rsp.body;
                const recipesOptions = recipes.map(recipe => ({ value: recipe.id, label: recipe.name }));
                this.setState({ isAddMealVisible: true, message: null, recipes: recipesOptions });
            }, err => {
                this.setState({ message: this.getErrorMessage() });
            });
    }

    onRecipeChanged(recipe) {
        this.setState({ selectedRecipeId: recipe.value })
    }

    getRetrievingYourRecopesMessage() {
        return (
            <h3>Retrieving your recipes... </h3>
        );
    }

    getSavingYourMealMessage() {
        return (
            <h3>Saving your meal... </h3>
        );
    }

    getErrorMessage() {
        return (
            <h3 style={{ color: 'red' }}> There was an error with our server. Please try again! </h3>
        );
    }

    getErrorMessageForInvalidDate() {
        const mealDate = this.props.location.query.mealDate;

        const message = mealDate ? `This meal date is not a valid date: ${mealDate}` : 'You do not have a meal date. Please go back to meal planner.';
        return (
            <h3 style={{ color: 'red' }}> {message} </h3>
        );
    }

    saveMeal() {
        const mealDate = this.getMealDate();
        if (!mealDate.isValid()) {
            this.setState({ message: this.getErrorMessageForInvalidDate() });
            return;
        }

        this.setState({ message: this.getSavingYourMealMessage(), isAddMealVisible: false });
        const { mealOrder } = this.props.location.query;
        ApiRequest.addMealFromExistingRecipe(this.state.selectedRecipeId, DateFormatter.dateToIsoString(mealDate), mealOrder || 0)
            .then(rsp => {
                this.props.router.push(Routes.mealPlannerWithDate(DateFormatter.dateToString(mealDate)));
            }, err => {
                this.setState({ message: this.getErrorMessage(), isAddMealVisible: true })
            });
    }

    renderBody() {
        if (!this.state.isAddMealVisible) {
            return null;
        }

        return (
            <div className="add-meal__existing-recipe">
                <div className="add-meal__existing-recipe-title">
                    Add meal from existing recipes
                </div>
                <div className="add-meal__existing-recipe-dropdown">
                    <Select
                        options={this.state.recipes}
                        value={this.state.selectedRecipeId}
                        onChange={option => this.onRecipeChanged(option)}
                        clearable={true}
                        searchable={true}
                        placeholder="Select recipe"
                    // noResultsText={<button> Create this recipe </button>}
                    />
                </div>

            </div>
        );
    }

    render() {
        return (
            <div>
                <TopBar
                    hideLogo
                    backButton backButtonText="Add meal" backButtonOnClick={() => this.props.router.push(Routes.mealPlanner())}
                    saveButton saveButtonOnClick={this.saveMeal} />

                <div className="pes-row">
                    {this.state.message}
                    {this.renderBody()}
                </div>
            </div>
        );
    }
}