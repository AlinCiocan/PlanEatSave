import React, { Component } from 'react';
import TopBar from '../TopBar/TopBar';
import { ApiRequest } from '../../services/ApiRequest';
import PikadayWrapper from '../../lib-components/PikadayWrapper/PikadayWrapper';

export default class PantryAddNewItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: null,
        };
    }

    saveItem() {
        debugger;

        let item = {
            pantryId: this.props.params.pantryId,
            name: this.refs.productName.value,
            expiration: this.refs.expiration.valueAsDate
        };

        this.setState({ message: this.getLoadingMsg() });

        ApiRequest
            .addPantryItem(item)
            .then(
            rsp => {
                this.props.router.push('/pantry');
            },
            err => {
                console.log(err);
                this.setState({ message: this.getErrorMessage(err, item) });
            });
    }

    getErrorMessage(err, item) {
        return (
            <div>
                <h3 style={{ color: 'red' }}> There was an error with our server. Please try again! </h3>
                {this.getItemDetails(item)}
            </div>
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
                &nbsp; Pantry
            </div>
        );
    }

    getItemDetails(item) {
        item = item || {};

        return (
            <div>
                <div className="pantry-add-item__form-group">
                    <label htmlFor="productName" className="pantry-add-item__form-label">
                        Product name
                    </label>

                    <input type="text" ref="productName" id="productName" className="pantry-add-item__form-input" defaultValue={item.name} />

                </div>

                <div className="pantry-add-item__form-group">
                    <label htmlFor="productExpiration" className="pantry-add-item__form-label">
                        Expiry date
                    </label>

                    <div hidden>
                        <PikadayWrapper onSelect={() => console.log('on select was called from pikaday wrapper')} />
                    </div>

                    <input type="date" ref="expiration" id="productExpiration" className="pantry-add-item__form-input" defaultValue={item.expiration} />
                </div>
            </div>
        );
    }

    renderItemForm() {
        var _this = this;
        if (this.state.message) {
            return _this.state.message;
        }

        return _this.getItemDetails();
    }

    render() {
        return (
            <div>
                <TopBar leftSide={this.getBackButton()} rightSide={this.getSaveButton()} />



                {this.renderItemForm()}
            </div>
        );
    }

}