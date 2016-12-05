import React, { Component } from 'react';
import PikadayWrapper from '../../lib-components/PikadayWrapper/PikadayWrapper';

export default class PantryItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expiration: this.props.item.expiration,
            name: this.props.item.name
        };
    }

    onSelectDate(newDate) {
        this.setState({ expiration: newDate });

        this.props.onItemChange(this.getItem());
    }

    onNameChange(newName) {
        this.setState({ name: newName });

        this.props.onItemChange(this.getItem());
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

                        <input type="text" className="pantry-item__form-input" defaultValue={this.state.name} onChange={evt => this.onNameChange(evt.target.value) } />
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