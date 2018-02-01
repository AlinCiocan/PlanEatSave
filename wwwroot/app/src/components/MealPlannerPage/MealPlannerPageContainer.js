import React, { Component } from 'react';
import { ApiRequest } from '../../services/ApiRequest';
import Routes from '../../services/Routes';
import TopBar from '../TopBar/TopBar';
import NavigationMenu from '../NavigationMenu';
import pages from '../../constants/pages';
import DateFormatter from '../../utils/DateFormatter';
import MealPlanner from './MealPlanner';
import ConfirmModal from '../base/modal/ConfirmModal';

export default class PlannerPageContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: null,
            arePlannedDaysVisible: false,
            plannedDays: [],
            mealToBeRemoved: null
        };

        this.onRemoveMeal = this.onRemoveMeal.bind(this);
    }

    componentDidMount() {
        const selectedDate = this.parseSelectedDate(this.getDateFromUrl());
        this.retrievePlannedDays(selectedDate);

        if (!this.getDateFromUrl()) {
            this.props.router.push(Routes.mealPlannerWithDate(this.getSelectedDateAsString()));
        }
    }

    componentWillReceiveProps(nextProps) {
        const newDate = nextProps.location.query.date;
        const isDayInState = this.state.plannedDays.some(day => day.mealDate === newDate);

        if(!isDayInState) {
            const selectedDate = this.parseSelectedDate(newDate);
            this.retrievePlannedDays(selectedDate);
        }
    }
    

    getLoadingMessage() {
        return (<h3> Loading your planner... </h3>);
    }

    getRemovingYourRecipeMessage() {
        return (<h3> Removing your recipe... </h3>);
    }

    getErrorMessage() {
        return (
            <h3 style={{ color: 'red' }}> There was an error with our server. Please refresh the page! </h3>
        );
    }

    renderPlanner() {
        if (!this.state.arePlannedDaysVisible) {
            return null;
        }

        return (
            <MealPlanner
                selectedDay={this.getSelectedDateAsString()}
                days={this.state.plannedDays}
                onDayChange={mealDate => this.props.router.push(Routes.mealPlannerWithDate(mealDate))}
                onRemoveMeal={this.onRemoveMeal} />
        );
    }

    getDateFromUrl() {
        return this.props.location.query.date;
    }

    parseSelectedDate(dateToParse) {
        let date = DateFormatter.stringToDate(dateToParse);
        return date.isValid() ? date : DateFormatter.getLocalCurrentDate();
    }

    getSelectedDateAsString() {
        const date = this.parseSelectedDate(this.getDateFromUrl());
        return DateFormatter.dateToString(date);
    }

    retrievePlannedDays(selectedDate) {
        this.setState({ message: this.getLoadingMessage(), arePlannedDaysVisible: false });

        const { startOfWeek, endOfWeek } = DateFormatter.extractLocaleStartAndEndOfWeek(selectedDate);

        const startOfWeekUtc = DateFormatter.markLocaleDateAsUtc(startOfWeek);
        const endOfWeekUtc = DateFormatter.markLocaleDateAsUtc(endOfWeek);

        const startOfWeekIsoString = DateFormatter.dateToIsoString(startOfWeekUtc);
        const endOfWeekIsoString = DateFormatter.dateToIsoString(endOfWeekUtc);

        ApiRequest.retrieveMeals(startOfWeekIsoString, endOfWeekIsoString)
            .then(rsp => {
                debugger;
                const days = rsp.body;
                const plannedDays = days.map(day => ({ ...day, mealDate: DateFormatter.isoStringToDateString(day.mealDate) }));
                this.setState({ message: null, arePlannedDaysVisible: true, plannedDays });
            }, err => {
                debugger;
                this.setState({ message: this.getErrorMessage() });
            });
    }

    onRemoveMeal(mealId, recipeName) {
        this.setState({ mealToBeRemoved: { mealId, recipeName } })
    }

    removeMeal() {
        const { mealId } = this.state.mealToBeRemoved;

        const plannedDays = this.state.plannedDays.map(day => (
            { ...day, meals: day.meals.filter(meal => meal.id !== mealId) }
        ));

        // optimistic design (do not wait for the request to finish)
        this.setState({ mealToBeRemoved: null, plannedDays });

        ApiRequest.removeMeal(mealId).then(response => {
            const { isSuccess, message } = response.body;
            if (!isSuccess) {
                console.log(message);
            }
        }, err => { console.log(err); });
    }

    renderRemoveMealModal() {
        if(!this.state.mealToBeRemoved) {
            return null;
        }

        const modalTitle = `Are you sure you want to remove '${this.state.mealToBeRemoved.recipeName}' from planner?`;

        return (
            <ConfirmModal
                isOpen={true}
                title={modalTitle}
                cancelButtonText="Cancel"
                onCancel={() => this.setState({ mealToBeRemoved: null })}
                actionButtonText="Remove"
                onAction={() => this.removeMeal()}
            />
        );
    }

    render() {
        return (
            <div>
                <TopBar addButton addButtonOnClick={() => this.props.router.push(Routes.addMeal(this.getSelectedDateAsString(), 1000))} />

                <div className="pes-row">
                    {this.state.message}
                    {this.renderPlanner()}
                    {this.renderRemoveMealModal()}
                </div>

                <NavigationMenu activeItem={pages.PLANNER} />
            </div>
        );
    }
}