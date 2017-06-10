import React from 'react';
import classNames from 'classnames';
import { Link as ReactRouterLink } from 'react-router';

const Link = (props) => {
    const linkClasses = classNames(props.className, 'pes-link', {
        'pes-link--undecorated': props.undecorated
    });

    const linkProps = { ...props, className: linkClasses };

    return (
        <ReactRouterLink {...linkProps} />
    );
};

export default Link;