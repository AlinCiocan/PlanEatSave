import React, { Component } from 'react';
import TopBar from '../TopBar/TopBar';
import { ApiRequest } from '../../services/ApiRequest';
import PikadayWrapper from '../../lib-components/PikadayWrapper/PikadayWrapper';

export default class PantryAddNewItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: null,
            expiration: null,
            name: null
        };
    }

    onSelectDate(newDate) {
        this.setState({expiration: newDate});
    }

    saveItem() {
        this.setState({ message: this.getLoadingMsg() });

        let item = {
            name: this.state.name,
            expiration: this.state.expiration,
            pantryId: this.props.params.pantryId
        };

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

    getItemDetails() {
        return (
            <div>
                <div className="pantry-add-item__form-group">
                    <label htmlFor="productName" className="pantry-add-item__form-label">
                        Product name
                    </label>

                    <input type="text" className="pantry-add-item__form-input" defaultValue={this.state.name} onChange={evt => this.setState({name: evt.target.value})} />

                </div>

                <div className="pantry-add-item__form-group">
                    <label htmlFor="productExpiration" className="pantry-add-item__form-label">
                        Expiry date
                    </label>

                    <PikadayWrapper onSelect={(date) => this.onSelectDate(date)} 
                                    defaultValue={this.state.expiration}
                                    className="pantry-add-item__form-input pantry-add-item__form-input--datepicker"/>
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