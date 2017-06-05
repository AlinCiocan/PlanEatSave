import React from 'react';
import classNames from 'classnames';
import arrowIcon from './play-arrow.svg';

const ArrowIcon = (props) => {
    let other = {};

    const iconClasses = classNames(
        'pes-arrow-icon', { 'pes-arrow-icon--left': props.direction === 'left' },
        props.className
    );

    return (
        <img
            src={arrowIcon}
            className={iconClasses}
            alt={props.alt || 'Arrow icon'}
            {...other}
        />
    );
};


export default ArrowIcon;