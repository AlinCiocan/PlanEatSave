import React, { Component } from 'react';
import { ApiRequest } from '../../services/ApiRequest';
import Routes from '../../services/Routes';
import TopBar from '../TopBar/TopBar';
import NavigationMenu from '../NavigationMenu';
import pages from '../../constants/pages';

export default class PlannerPageContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: null
        };
    }

    componentDidMount() {
    }

 
    getLoadingMessage() {
        return (<h3> Loading your planner... </h3>);
    }

    getRemovingYourRecipeMessage() {
        return (<h3> Removing your recipe... </h3>);
    }

    getErrorMessage() {
        return (
            <h3 style={{ color: 'red' }}> There was an error with our server. Please try again! </h3>
        );
    }

    renderPlanner() {
        return <h1> Awesome planner here </h1>;
    }

    render() {
        return (
            <div>
                <TopBar />

                <div className="row">
                    {this.state.message}
                    {this.renderPlanner()}
                </div>

                <NavigationMenu activeItem={pages.PLANNER} />
            </div>
        );
    }
}