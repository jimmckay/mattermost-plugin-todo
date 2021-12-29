import React from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import PropTypes from 'prop-types';

const CompleteButton = (props) => {
    let button;
    if (props.useIconButtons) {
        button = (
            <i
                className='icon icon-check  btn-icon'
                onClick={() => props.complete(props.issueId)}
            > </i>);
    } else {
        button = (
            <button
                className='btn btn-primary'
                onClick={() => props.complete(props.issueId)}
            > {'Done'}</button>
        );
    }

    return (
        <OverlayTrigger
            delay='750'
            placement='left'
            overlay={<Tooltip id='button-done-tooltip'>{'Mark as Done'}</Tooltip>}
        >{button}</OverlayTrigger>
    );
};

CompleteButton.propTypes = {
    issueId: PropTypes.string.isRequired,
    complete: PropTypes.func.isRequired,
    useIconButtons: PropTypes.bool.isRequired,
};

export default CompleteButton;
