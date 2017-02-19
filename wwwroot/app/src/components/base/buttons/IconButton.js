import React from 'react';
import classNames from 'classnames';

const IconButton = (props) => {
    return (
        <button
            className={classNames('pes-icon-button', props.className)}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

export default IconButton;