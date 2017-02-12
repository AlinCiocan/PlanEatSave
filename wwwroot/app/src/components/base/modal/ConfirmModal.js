import React from 'react';
import Modal from './Modal';
import Button from '../button/Button';

const ConfirmModal = (props) => {
    return (
        <Modal
            isOpen={props.isOpen}
            contentLabel={props.title}
        >
            <div className="pes-confirm-modal">
                <h2 className="pes-modal__title"> {props.title} </h2>
                <div className="pes-modal__buttons">
                    <Button
                        ghostButton
                        text={props.cancelButtonText}
                        onClick={props.onCancel}
                    />
                    <Button
                        text={props.actionButtonText}
                        onClick={props.onAction}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmModal;