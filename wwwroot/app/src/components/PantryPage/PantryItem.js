import React, { Component } from 'react';
import PikadayWrapper from '../../lib-components/PikadayWrapper/PikadayWrapper';
import Input from '../base/form/Input';

export default class PantryItem extends Component {
    constructor(props) {
        super(props);

        let expiration = this.props.item.expiration ? this.props.item.expiration : new Date();

        this.state = {
            expiration,
            name: this.props.item.name || ''
        };
    }

    onSelectDate(newDate) {
        this.setState({ expiration: newDate }, () => {
            this.props.onItemChange(this.getItem());
        });
    }

    onNameChange(newName) {
        this.setState({ name: newName }, () => {
            this.props.onItemChange(this.getItem());
        });
    }

    getItem() {
        return {
            name: this.state.name,
            expiration: this.state.expiration
        };
    }

    render() {
        return (
            <div>
                <div className="pantry-item__form-group">
                    <label className="pantry-item__form-label">
                        Product name

                        <Input value={this.state.name} onChange={newValue => this.onNameChange(newValue)} />
                    </label>


                </div>

                <div className="pantry-item__form-group">
                    <label className="pantry-item__form-label">
                        Expiry date

                        <PikadayWrapper onSelect={(date) => this.onSelectDate(date)}
                            defaultValue={this.state.expiration}
                            className="pantry-item__form-input pantry-item__form-input--datepicker" />

                    </label>
                </div>
            </div>
        );
    }
}