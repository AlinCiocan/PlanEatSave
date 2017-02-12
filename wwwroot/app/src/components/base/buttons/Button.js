import React from 'react';
import classNames from 'classnames';

const Button = (props) => {
    const buttonClasses = classNames({
        'pes-button': true,
        'pes-button--ghost-button': props.ghostButton
    });

    return (
        <button
            className={buttonClasses}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
};

export default Button;