import React from 'react';
import Textarea from './Textarea';

const TextareaGroup = (props) => {
    return (
        <div className="pes-form-group">
            <label className="pes-form-label">
                {props.label}
                <Textarea 
                    value={props.value} 
                    onChange={props.onChange}
                    placeholder={props.placeholder} />
            </label>
        </div>
    );
};

export default TextareaGroup;