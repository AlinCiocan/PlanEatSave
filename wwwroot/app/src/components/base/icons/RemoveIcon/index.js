import React from 'react';
import removeIcon from './remove-icon.svg';

const RemoveIcon = (props) => {
    return (
        <img 
            src={removeIcon} 
            className={props.className}
            onClick={props.onClick}
            alt={props.alt || 'Remove icon'}/>
    );
};


export default RemoveIcon;