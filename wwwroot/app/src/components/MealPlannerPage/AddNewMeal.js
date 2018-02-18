import React from 'react';
import Select from 'react-select';
import Routes from '../../services/Routes';
import TopBar from '../TopBar/TopBar';
import { ApiRequest } from '../../services/ApiRequest';
import DateFormatter from '../../utils/DateFormatter';
import Button from '../base/buttons/Button';
import OrSeparator from '../base/OrSeparator';

export default class AddNewMeal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: this.getRetrievingYourRecopesMessage(),
            areRecipiesLoaded: false,
            recipes: [],
            selectedRecipeId: null
        };

        this.saveMeal = this.saveMeal.bind(this);
    }

    getMealDate() {
        return DateFormatter.markLocaleDateAsUtc(DateFormatter.stringToDate(this.props.location.query.mealDate));
    }

    componentDidMount() {
        ApiRequest.retrieveRecipes()
            .then(rsp => {
                const recipes = rsp.body;
                const recipesOptions = recipes.map(recipe => ({ value: recipe.id, label: recipe.name }));
                this.setState({ areRecipiesLoaded: true, message: null, recipes: recipesOptions });
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

        this.setState({ message: this.getSavingYourMealMessage(), areRecipiesLoaded: false });
        const { mealOrder } = this.props.location.query;
        ApiRequest.addMealFromExistingRecipe(this.state.selectedRecipeId, DateFormatter.dateToIsoString(mealDate), mealOrder || 0)
            .then(rsp => {
                this.goToMealPlanner();
            }, err => {
                this.setState({ message: this.getErrorMessage(), areRecipiesLoaded: true })
            });
    }

    goToMealPlanner() {
        this.props.router.push(this.getRouteToMealPlanner());
    }

    getRouteToMealPlanner() {
        return Routes.mealPlannerWithDate(this.props.location.query.mealDate);
    }

    renderBody() {
        if (!this.state.areRecipiesLoaded) {
            return null;
        }

        return (
            <div>
                <div className="pes-add-meal__existing-recipe">
                    <div className="pes-add-meal__existing-recipe-title">
                        Add meal from existing recipes
                </div>
                    <div className="pes-add-meal__existing-recipe-dropdown">
                        <Select
                            options={this.state.recipes}
                            value={this.state.selectedRecipeId}
                            onChange={option => this.onRecipeChanged(option)}
                            clearable={true}
                            searchable={true}
                            placeholder="Select recipe"
                        />
                        <div className="pes-add-meal__existing-recipe-add-button">
                            <Button onClick={this.saveMeal} text="Add meal" />
                        </div>
                    </div>
                </div>
                <OrSeparator />
                <div>
                </div>

            </div>
        );
    }

    render() {
        return (
            <div>
                <TopBar
                    hideLogo
                    backButton backButtonText="Add meal" backButtonOnClick={() => this.props.router.push(this.getRouteToMealPlanner())} />

                <div className="pes-row">
                    {this.state.message}
                    {this.renderBody()}
                </div>
            </div>
        );
    }
}