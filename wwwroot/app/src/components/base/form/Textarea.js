import React from 'react';

const Textarea = (props) => {
    return (
        <textarea
            className="pes-form-textarea"
            value={props.value}
            placeholder={props.placeholder}
            onChange={evt => props.onChange(evt.target.value)}
        >
        </textarea>
    );
};

export default Textarea;