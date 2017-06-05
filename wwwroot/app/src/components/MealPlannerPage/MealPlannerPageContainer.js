import React, { Component } from 'react';
import moment from 'moment';
import { ApiRequest } from '../../services/ApiRequest';
import Routes from '../../services/Routes';
import TopBar from '../TopBar/TopBar';
import NavigationMenu from '../NavigationMenu';
import pages from '../../constants/pages';
import DateFormatter from '../../utils/DateFormatter';
import MealPlanner from './MealPlanner';

export default class PlannerPageContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: null,
            arePlannedDaysVisible: false,
            plannedDays: []
        };
    }

    componentDidMount() {
        this.retrievePlannedDays();

        if (!this.getDateFromUrl()) {
            this.props.router.push(Routes.mealPlannerWithDate(this.getSelectedDateAsString()));
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

        return <MealPlanner selectedDay={this.getSelectedDateAsString()} days={this.state.plannedDays} />;
    }

    getDateFromUrl() {
        return this.props.location.query.date;
    }

    getSelectedDate() {
        let date = DateFormatter.stringToDate(this.getDateFromUrl());
        return date.isValid() ? date : DateFormatter.getLocalCurrentDate();
    }

    getSelectedDateAsString() {
        const date = this.getSelectedDate();
        return DateFormatter.dateToString(date);
    }

    retrievePlannedDays() {
        this.setState({ message: this.getLoadingMessage(), arePlannedDaysVisible: false });

        const currentDate = this.getSelectedDate();

        const { startOfWeek, endOfWeek } = DateFormatter.extractLocaleStartAndEndOfWeek(currentDate);

        const startOfWeekUtc = DateFormatter.markLocaleDateAsUtc(startOfWeek);
        const endOfWeekUtc = DateFormatter.markLocaleDateAsUtc(endOfWeek);

        const startOfWeekIsoString = DateFormatter.dateToIsoString(startOfWeekUtc);
        const endOfWeekIsoString = DateFormatter.dateToIsoString(endOfWeekUtc);

        ApiRequest.retrieveMeals(startOfWeekIsoString, endOfWeekIsoString)
            .then(rsp => {
                const plannedDays = rsp.body;
                this.setState({ message: null, arePlannedDaysVisible: true, plannedDays });
            }, err => {
                this.setState({ message: this.getErrorMessage() });
            });
    }

    render() {
        return (
            <div>
                <TopBar addButton addButtonOnClick={() => this.props.router.push(Routes.addMeal(this.getSelectedDateAsString(), 1000))} />

                <div className="pes-row">
                    {this.state.message}
                    {this.renderPlanner()}
                </div>

                <NavigationMenu activeItem={pages.PLANNER} />
            </div>
        );
    }
}