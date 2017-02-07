import React from 'react';
import removeIcon from './remove-icon.svg';

const RemoveIcon = (props) => {
    let other = {};
    if(props.onClick) {
        other.onClick = props.onClick;
    }

    return (
        <img 
            src={removeIcon} 
            className={props.className}
            alt={props.alt || 'Remove icon'}
            {...other}
            />
    );
};


export default RemoveIcon;