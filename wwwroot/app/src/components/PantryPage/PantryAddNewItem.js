import React, { Component } from 'react';
import TopBar from '../TopBar/TopBar';
import { ApiRequest } from '../../services/ApiRequest';
import Routes from '../../services/Routes';
import PantryItem from './PantryItem';
import EmptyItemNameAlert from './EmptyItemNameAlert';

export default class PantryAddNewItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: null,
            isItemVisible: true,
            item: {},
            shouldDisplayIsItemNameEmptyAlert: false
        };

        this.onItemChange = this.onItemChange.bind(this);
    }

    onSelectDate(newDate) {
        this.setState({ expiration: newDate });
    }

    saveItem() {
        if (!this.state.item.name) {
            this.setState({ shouldDisplayIsItemNameEmptyAlert: true });
            return;
        }

        this.setState({ message: this.getLoadingMsg(), isItemVisible: false });
        let item = { ...this.state.item, pantryId: this.props.params.pantryId };

        ApiRequest
            .addPantryItem(item)
            .then(
            rsp => {
                this.props.router.push(Routes.myPantry());
            },
            err => {
                console.log(err);
                this.setState({ message: this.getErrorMessage(err), isItemVisible: true });
            });
    }

    getErrorMessage(err, item) {
        return (
            <h3 style={{ color: 'red' }}> There was an error with our server. Please try again! </h3>
        );
    }

    getLoadingMsg() {
        return (<h3> Adding your item... </h3>);
    }

    onItemChange(newItem) {
        this.setState({ item: newItem });
    }

    getItemDetails() {
        return (
            <PantryItem item={this.state.item} onItemChange={this.onItemChange} />
        );
    }

    renderItemForm() {
        if (this.state.isItemVisible) {
            return this.getItemDetails();
        }
    }


    render() {
        return (
            <div>
                <TopBar
                    hideLogo
                    backButton backButtonText="Add to pantry" backButtonOnClick={() => this.props.router.push(Routes.myPantry())}
                    saveButton saveButtonOnClick={() => this.saveItem()} />

                <div className="pes-row">
                    {this.state.message}

                    {this.renderItemForm()}
                </div>

                <EmptyItemNameAlert
                    isOpen={this.state.shouldDisplayIsItemNameEmptyAlert}
                    onAction={() => this.setState({ shouldDisplayIsItemNameEmptyAlert: false })}
                />
            </div>
        );
    }

}