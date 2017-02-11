import React from 'react';
import TextareaResize from 'react-textarea-autosize';

const Textarea = (props) => {
    return (
        <TextareaResize
            useCacheForDOMMeasurements
            className="pes-form-textarea"
            value={props.value}
            placeholder={props.placeholder}
            onChange={evt => props.onChange(evt.target.value)}
        >
        </TextareaResize>
    );
};

export default Textarea;