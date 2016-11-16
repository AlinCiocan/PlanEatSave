import React, { Component } from 'react';
import moment from 'moment';

import PantryPage from './PantryPage';
import { ApiRequest } from '../../services/ApiRequest';
import TopBar from '../TopBar/TopBar';

const DAYS_EXPIRES_SOON = 30;

export default class PantryPageContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pantry: null,
            errorMsg: null
        };
    }

    populatePantry(pantryDb) {
        
        debugger;
        let itemsSortedByExpiration = pantryDb.pantryItems.sort((a, b) => new Date(a.expiration).getTime() - new Date(b.expiration).getTime());
        let allProductsList = {
            title: `All products (${itemsSortedByExpiration.length})`,
            items: itemsSortedByExpiration,
            key: 'allProducts'
        };
        
        let now = moment();
        let itemsThatWillExpireSoon = itemsSortedByExpiration.filter((item) => moment(item.expiration).diff(now, 'days') <= DAYS_EXPIRES_SOON)
        let porductsThatWillExpireSoonList = {
            title: `To expire soon (${itemsThatWillExpireSoon.length})`,
            items: itemsThatWillExpireSoon,
            key: 'willExpireSoon'
        };

        let pantry = {
            id: pantryDb.id,
            lists: [porductsThatWillExpireSoonList, allProductsList]
        };


        this.setState({ pantry });
    }

    componentDidMount() {
        this.setState({ errorMsg: null });
        ApiRequest.getPantry().then(response => {
            console.log('response pantry', response);
            let pantryDb = response.body;
            this.populatePantry(pantryDb);
        }, err => {
            console.log(err);
            this.setState({ errorMsg: 'There was an error with our servers. Please try again later!' });

        });
    }

    renderPantry() {
        if (this.state.errorMsg) {
            return <h3> {this.state.errorMsg} </h3>
        }

        if (this.state.pantry == null) {
            return (<h3> Loading... </h3>);
        }

        return (<PantryPage pantry={this.state.pantry} />)
    }

    getAddPantryItemButton() {
        return (
            <button className="top-bar__side top-bar__side--right add-pantry-item"
                onClick={() => this.props.router.push(`/pantry/${this.state.pantry.id}/add-item`)}>+</button>
        );
    }

    render() {
        return (
            <div>
                <TopBar rightSide={this.getAddPantryItemButton()} />
                {this.renderPantry()}
            </div>
        );


    }


}