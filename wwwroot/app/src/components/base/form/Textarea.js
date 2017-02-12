import React from 'react';
import TextareaResize from 'react-textarea-autosize';
import { applicationSettings } from '../../../constants/settings';

const Textarea = (props) => {
    return (
        <TextareaResize
            useCacheForDOMMeasurements
            className="pes-form-textarea"
            maxLength={applicationSettings.MAX_LENGTH_TEXTAREA}
            value={props.value}
            placeholder={props.placeholder}
            onChange={evt => props.onChange(evt.target.value)}
        >
        </TextareaResize>
    );
};

export default Textarea;