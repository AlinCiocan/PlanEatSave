import React from 'react';
import { applicationSettings } from '../../../constants/settings';

const Input = (props) => {
    return (
        <input
            type="text"
            className="pes-form-input"
            maxLength={applicationSettings.MAX_LENGTH_INPUT}
            placeholder={props.placeholder}
            value={props.value}
            onChange={evt => props.onChange(evt.target.value)} />
    );
};

export default Input;