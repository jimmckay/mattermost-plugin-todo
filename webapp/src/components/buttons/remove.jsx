import React from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import PropTypes from 'prop-types';

const RemoveButton = (props) => {
    let button;
    if (props.useIconButtons) {
        button = (
            <i
                className='icon icon-trash-can-outline  btn-icon'
                onClick={() => props.remove(props.issueId)}
            > </i>);
    } else {
        button = (
            <button
                className='btn btn-primary'
                onClick={() => props.remove(props.issueId)}
            > {'Delete'}</button>
        );
    }

    return (
        <OverlayTrigger
            delay='750'
            placement='left'
            overlay={<Tooltip id='button-done-tooltip'>{'Delete Item'}</Tooltip>}
        >{button}</OverlayTrigger>
    );
};

RemoveButton.propTypes = {
    issueId: PropTypes.string.isRequired,
    remove: PropTypes.func.isRequired,
    useIconButtons: PropTypes.bool.isRequired,
};

export default RemoveButton;
