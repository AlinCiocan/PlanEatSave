import React from 'react';
import AlertModal from '../base/modal/AlertModal';

const EmptyItemNameAlert = (props) => (
    <AlertModal
        isOpen={props.isOpen}
        title="You must specify a name for your item."
        actionButtonText="OK"
        onAction={props.onAction}
    />
);

export default EmptyItemNameAlert;