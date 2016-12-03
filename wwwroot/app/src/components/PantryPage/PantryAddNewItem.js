import React, { Component } from 'react';
import TopBar from '../TopBar/TopBar';
import { ApiRequest } from '../../services/ApiRequest';
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

    getSaveButton() {
        return (<div className="top-bar__side top-bar__side--right" onClick={() => this.saveItem()}> SAVE </div>);
    }

    getBackButton() {
        return (
            <div className="top-bar__side top-bar__side--left" onClick={() => this.props.router.push('/pantry')}>
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
                &nbsp; Add to pantry
            </div>
        );
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
                <TopBar leftSide={this.getBackButton()} rightSide={this.getSaveButton()} />

                {this.state.message}

                {this.renderItemForm()}
            </div>
        );
    }

}