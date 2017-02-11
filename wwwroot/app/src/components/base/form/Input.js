import React from 'react';

const Input = (props) => {
    return (
        <input
            type="text"
            className="pes-form-input"
            placeholder={props.placeholder}
            value={props.value}
            onChange={evt => props.onChange(evt.target.value)} />
    );
};

export default Input;