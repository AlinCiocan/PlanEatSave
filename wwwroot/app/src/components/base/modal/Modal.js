import React from 'react';
import ReactModal from 'react-modal';

const Modal = (props) => {
    return (
        <ReactModal
            isOpen={props.isOpen}
            contentLabel={props.contentLabel}
            className="pes-modal"
            overlayClassName="pes-modal-overlay"
        >
            {props.children}
        </ReactModal>
    );
};

export default Modal;