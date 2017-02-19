import React, { Component } from 'react';
import PantryPage from './PantryPage';
import { ApiRequest } from '../../services/ApiRequest';
import TopBar from '../TopBar/TopBar';
import Routes from '../../services/Routes';
import ConfirmModal from '../base/modal/ConfirmModal';
import PantryService from '../../services/PantryService';

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
        let pantry = {
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

        return (
            <PantryPage
                pantry={this.state.pantry}
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

    render() {
        return (
            <div className="pantry-page-container">
                <TopBar addButton addButtonOnClick={() => this.props.router.push(Routes.addPantryItem(this.state.pantry.id))} />

                <div className="row">
                    {this.renderPantry()}
                </div>

                {this.renderRemoveModal()}
            </div>
        );
    }
}