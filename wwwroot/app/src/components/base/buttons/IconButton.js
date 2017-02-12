import React from 'react';

const IconButton = (props) => {
    return (
        <button
            className={`pes-icon-button ${props.className}`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

export default IconButton;