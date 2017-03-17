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

        return <MealPlanner selectedDay={this.getSelectedDate()} days={this.state.plannedDays} />;
    }

    getSelectedDate() {
        let date = DateFormatter.stringToDate(this.props.location.query.date);
        return date.isValid() ? date : moment.utc();
    }

    retrievePlannedDays() {
        this.setState({ message: this.getLoadingMessage(), arePlannedDaysVisible: false });

        const date = this.getSelectedDate();
        const { startOfWeek, endOfWeek } = DateFormatter.extractStartAndEndOfWeek(date);

        ApiRequest.retrieveMeals(DateFormatter.dateToIsoString(startOfWeek), DateFormatter.dateToIsoString(endOfWeek))
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
                <TopBar addButton addButtonOnClick={() => this.props.router.push(Routes.addMeal('2017-01-01', 1000))} />

                <div className="row">
                    {this.state.message}
                    {this.renderPlanner()}
                </div>

                <NavigationMenu activeItem={pages.PLANNER} />
            </div>
        );
    }
}