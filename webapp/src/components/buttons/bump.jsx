import React from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import PropTypes from 'prop-types';

const BumpButton = (props) => {
    let button;
    if (props.useIconButtons) {
        button = (
            <i
                className='icon icon-update  btn-icon'
                onClick={() => props.bump(props.issueId)}
            > </i>);
    } else {
        button = (
            <button
                className='btn btn-primary'
                onClick={() => props.bump(props.issueId)}
            > {'Bump'}</button>
        );
    }

    return (
        <OverlayTrigger
            delay='750'
            placement='left'
            overlay={<Tooltip id='button-done-tooltip'>{'Bump Item to top'}</Tooltip>}
        >{button}</OverlayTrigger>
    );
};

BumpButton.propTypes = {
    issueId: PropTypes.string.isRequired,
    bump: PropTypes.func.isRequired,
    useIconButtons: PropTypes.bool.isRequired,
};

export default BumpButton;
