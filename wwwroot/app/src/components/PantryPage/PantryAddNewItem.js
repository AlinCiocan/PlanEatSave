import React, { Component } from 'react';
import TopBar from '../TopBar/TopBar';
import { ApiRequest } from '../../services/ApiRequest';
import Routes from '../../services/Routes';
import PantryItem from './PantryItem';

export default class PantryAddNewItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: null,
            isItemVisible: true,
            item: {}
        };

        this.onItemChange = this.onItemChange.bind(this);
    }

    onSelectDate(newDate) {
        this.setState({ expiration: newDate });
    }

    saveItem() {
        this.setState({ message: this.getLoadingMsg(), isItemVisible: false });

        let item = Object.assign({}, this.state.item, { pantryId: this.props.params.pantryId });

        ApiRequest
            .addPantryItem(item)
            .then(
            rsp => {
                this.props.router.push('/pantry');
            }, err => {
                console.log(err);
                this.setState({ message: this.getErrorMessage(err), isItemVisible: true, item: item });
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
                    backButton backButtonText="Add to pantry" backButtonOnClick={() => this.props.router.push(Routes.myPantry())}
                    saveButton saveButtonOnClick={() => this.saveItem()} />

                {this.state.message}

                {this.renderItemForm()}
            </div>
        );
    }

}