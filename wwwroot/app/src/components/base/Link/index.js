import React from 'react';
import classNames from 'classnames';
import { Link as ReactRouterLink } from 'react-router';

const Link = (props) => {
    const linkClasses = classNames(props.className, 'pes-link', {
        'pes-link--undecorated': props.undecorated
    });

    return (
        <ReactRouterLink to={props.to} className={linkClasses}>
            {props.children}
        </ReactRouterLink>
    );
};

export default Link;