import React, { Component } from 'react';
import Pikaday from 'pikaday';
import classnames from 'classnames';
import './pikaday.css';
import calendarIcon from './calendar-icon.svg';
import _ from 'lodash';

export default class PikadayWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            picker: null,
            date: null
        };
    }

    onSelect(date) {
        this.setState({ date });
        this.props.onSelect(date);
    }

    componentDidMount() {
        var date = this.props.defaultValue ? this.props.defaultValue : new Date();
        if (_.isString(date)) {
            date = new Date(date);
        }

        var picker = new Pikaday({
            field: this.refs.datepickerInput,
            trigger: this.refs.datepickerButton,
            defaultDate: date,
            setDefaultDate: true,
            onSelect: (date) => this.onSelect(date)
        });

        this.setState({ picker });
    }

    render() {
        return (
            <div className={classnames('pes-pikaday-wrapper', this.props.className)}>
                <input type="text" ref="datepickerInput" className="pes-pikaday-wrapper__input" disabled />
                <button ref="datepickerButton" className="pes-pikaday-wrapper__calendar-button">
                    <img src={calendarIcon} alt="calendar icon" className="pes-pikaday-wrapper__calendar-icon" />
                </button>
            </div>
        );
    }

}