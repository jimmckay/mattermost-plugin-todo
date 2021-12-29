import React from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import PropTypes from 'prop-types';

const AcceptButton = (props) => {
    let button;
    if (props.useIconButtons) {
        button = (
            <i
                className='icon icon-playlist-check  btn-icon'
                onClick={() => props.accept(props.issueId)}
            > </i>);
    } else {
        button = (
            <button
                className='btn btn-primary'
                onClick={() => props.accept(props.issueId)}
            > {'Accept this task'}</button>
        );
    }

    return (
        <OverlayTrigger
            delay='750'
            placement='left'
            overlay={<Tooltip id='button-done-tooltip'>{'Accept this task and add to your Todos'}</Tooltip>}
        >{button}</OverlayTrigger>
    );
};

AcceptButton.propTypes = {
    issueId: PropTypes.string.isRequired,
    accept: PropTypes.func.isRequired,
    useIconButtons: PropTypes.bool.isRequired,
};

export default AcceptButton;
