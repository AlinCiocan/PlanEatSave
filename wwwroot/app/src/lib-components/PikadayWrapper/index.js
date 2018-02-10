import React, { Component } from 'react';
import Pikaday from 'pikaday';
import classnames from 'classnames';
import './pikaday.css';
import calendarIcon from './calendar-icon.svg';
import _ from 'lodash';

export default class PikadayWrapper extends Component {
    onSelect(date) {
        this.props.onSelect(date);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.dateValue !== this.props.dateValue) {
            const preventOnSelect = true;
            this.pickaday.setDate(this.parseDate(nextProps.dateValue), preventOnSelect);
        }
    }

    parseDate(dateValue) {
        let date = dateValue || new Date();
        if (_.isString(date)) {
            date = new Date(date);
        }

        return date;
    }

    initializePikaday(date) {
        this.pickaday = new Pikaday({
            field: this.refs.datepickerInput,
            trigger: this.refs.datepickerButton,
            defaultDate: date,
            setDefaultDate: true,
            onSelect: (date) => this.onSelect(date)
        });
    }

    componentDidMount() {
        this.initializePikaday(this.parseDate(this.props.dateValue));
    }

    render() {
        return (
            <div className={classnames('pes-pikaday-wrapper', this.props.className)}>
                <button ref="datepickerButton" className="pes-pikaday-wrapper__calendar-button">
                    <input type="text" ref="datepickerInput" className="pes-pikaday-wrapper__input" disabled />
                    <img src={calendarIcon} alt="calendar icon" className="pes-pikaday-wrapper__calendar-icon" />
                </button>
            </div>
        );
    }

}