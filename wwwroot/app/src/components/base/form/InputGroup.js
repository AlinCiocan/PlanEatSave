import React from 'react';
import Input from './Input';

const InputGroup = (props) => {
    return (
        <div className="pes-form-group">
            <label className="pes-form-label">
                {props.label}
                <Input 
                    value={props.value} 
                    onChange={props.onChange} />
            </label>
        </div>
    );
};

export default InputGroup;