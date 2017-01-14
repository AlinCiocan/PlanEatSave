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
            errorMsg: null,
            removeItemId: null
        };


        this.onRemoveItem = this.onRemoveItem.bind(this);
    }

    populatePantry(pantryDb) {
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

    onRemoveItem(itemId) {
        this.setState({ removeItemId: itemId });
    }

    removeItem(itemId) {
        this.setState({ removeItemId: null });

        ApiRequest.removePantryItem(itemId).then(response => {
            const {isSuccess, message} = response.body;
            if (!isSuccess) {
                console.log(message);
            }

            this.retrievePantryFromServer();
        }, err => {
            // TODO: also make sure to treat the forbidden requests
            console.log(err);
            this.setState({ errorMsg: 'There was an error with our servers. Please try again later!' });
        });
    }

    retrievePantryFromServer() {
        this.setState({ pantry: null });
        ApiRequest.getPantry().then(response => {
            let pantryDb = response.body;
            this.populatePantry(pantryDb);
        }, err => {
            console.log(err);
            this.setState({ errorMsg: 'There was an error with our servers. Please try again later!' });
        });
    }

    componentDidMount() {
        this.setState({ errorMsg: null });
        this.retrievePantryFromServer();
    }

    renderPantry() {
        if (this.state.errorMsg) {
            return <h3> {this.state.errorMsg} </h3>
        }

        if (this.state.pantry == null) {
            return (<h3> Loading... </h3>);
        }

        return (<PantryPage
            pantry={this.state.pantry}
            onRemoveItem={this.onRemoveItem}
            router={this.props.router} />);
    }

    getAddPantryItemButton() {
        return (
            <button
                className="top-bar__side top-bar__side--right top-bar__add-button"
                onClick={() => this.props.router.push(`/pantry/${this.state.pantry.id}/add-item`)}>+ ADD</button>
        );
    }

    renderRemoveWindow() {
        if (this.state.removeItemId) {
            return (
                <div className="modal-container">
                    <div className="pantry-remove-item">
                        <div className="pantry-remove-item__container">
                            <p className="pantry-remove-item__title">
                                Remove this product from the pantry?
                            </p>

                            <div className="pantry-remove-item__buttons">
                                <button
                                    className="pantry-remove-item__button"
                                    onClick={() => this.setState({ removeItemId: null })}>
                                    Cancel
                                </button>

                                <button
                                    className="pantry-remove-item__button pantry-remove-item__button--gray"
                                    onClick={() => this.removeItem(this.state.removeItemId)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="pantry-page-container">
                <TopBar rightSide={this.getAddPantryItemButton()} />
                {this.renderPantry()}

                {this.renderRemoveWindow()}
            </div>
        );
    }


}