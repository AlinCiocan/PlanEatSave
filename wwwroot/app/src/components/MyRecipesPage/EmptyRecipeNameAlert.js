import React from 'react';
import AlertModal from '../base/modal/AlertModal';

const EmptyRecipeNameAlert = (props) => (
    <AlertModal
        isOpen={props.isOpen}
        title="You must specify a name for your recipe."
        actionButtonText="OK"
        onAction={props.onAction}
    />
);

export default EmptyRecipeNameAlert;