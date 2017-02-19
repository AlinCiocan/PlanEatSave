import React, { Component } from 'react';
import PantryPage from './PantryPage';
import { ApiRequest } from '../../services/ApiRequest';
import TopBar from '../TopBar/TopBar';
import Routes from '../../services/Routes';
import ConfirmModal from '../base/modal/ConfirmModal';
import { PantryService, filterOptions } from '../../services/PantryService';
import SearchInput from '../base/search/SearchInput';

export default class PantryPageContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pantry: null,
            errorMsg: null,
            removeItemId: null,
            filterOption: filterOptions.ALL_ITEMS,
            searchTerm: ''
        };

        this.onRemoveItem = this.onRemoveItem.bind(this);
    }

    populatePantry(pantryDb) {
        const pantry = {
            id: pantryDb.id,
            lists: PantryService.separatePantryInCategories(pantryDb)
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
            const pantryDb = response.body;
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

        return (
            <PantryPage
                items={PantryService.filterPantry(this.state.pantry, this.state.filterOption, this.state.searchTerm)}
                onRemoveItem={this.onRemoveItem}
                router={this.props.router} />
        );
    }

    renderRemoveModal() {
        const isAnItemToBeDeleted = !!this.state.removeItemId;
        const modalTitle = 'Remove this item from the pantry?';

        return (
            <ConfirmModal
                isOpen={isAnItemToBeDeleted}
                title={modalTitle}
                cancelButtonText="Cancel"
                onCancel={() => this.setState({ removeItemId: null })}
                actionButtonText="Remove"
                onAction={() => this.removeItem(this.state.removeItemId)}
            />
        );
    }

    renderFilterOptions() {
        return (
            <select value={this.state.filterOption} onChange={evt => this.setState({ filterOption: evt.target.value })}>
                <option value={filterOptions.ALL_ITEMS}> ALL </option>
                <option value={filterOptions.EXPIRED_ITEMS}> EXPIRED </option>
                <option value={filterOptions.EXPIRE_SOON_ITEMS}> EXPIRES SOON </option>
            </select>
        );
    }

    render() {
        return (
            <div className="pantry-page-container">
                <TopBar addButton addButtonOnClick={() => this.props.router.push(Routes.addPantryItem(this.state.pantry.id))} />

                <div className="row">
                    <SearchInput onChange={searchTerm => this.setState({ searchTerm })} />
                    {this.renderFilterOptions()}
                    {this.renderPantry()}
                </div>

                {this.renderRemoveModal()}
            </div>
        );
    }
}