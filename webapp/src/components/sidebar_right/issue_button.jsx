import React from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import PropTypes from 'prop-types';

const IssueButton = (props) => {
    let button;
    let iconClass = 'icon btn-icon ' + props.icon;
    if (props.useIconButtons) {
        button = (
            <i
                className={iconClass}
                onClick={() => props.actionFunc(props.issueId)}
            > </i>);
    } else {
        button = (
            <button
                className='btn btn-primary'
                onClick={() => props.actionFunc(props.issueId)}
            > {props.caption}</button>
        );
    }

    return (
        <OverlayTrigger
            delay='750'
            placement='left'
            overlay={<Tooltip id='button-done-tooltip'>{props.tooltip}</Tooltip>}
        >{button}</OverlayTrigger>
    );
};

IssueButton.propTypes = {
    issueId: PropTypes.string.isRequired,
    actionFunc: PropTypes.func.isRequired,
    useIconButtons: PropTypes.bool.isRequired,
    icon: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired
};

export default IssueButton;
