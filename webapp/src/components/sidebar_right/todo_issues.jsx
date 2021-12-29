// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import PropTypes from 'prop-types';

import {makeStyleFromTheme, changeOpacity} from 'mattermost-redux/utils/theme_utils';
import {canComplete, canRemove, canAccept, canBump, canDecline, handleFormattedTextClick} from '../../utils';
import IssueButton from './issue_button';

const PostUtils = window.PostUtils; // import the post utilities

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function ToDoIssues(props) {
    const style = getStyle(props.theme);
    const handleClick = (e) => handleFormattedTextClick(e);

    return props.issues.length > 0 ? props.issues.map((issue) => {
        const date = new Date(issue.create_at);
        const year = date.getFullYear();
        const month = MONTHS[date.getMonth()];
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = '0' + date.getMinutes();
        const seconds = '0' + date.getSeconds();
        const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        const formattedDate = month + ' ' + day + ', ' + year;
        const htmlFormattedText = PostUtils.formatText(issue.message, {siteURL: props.siteURL});
        const issueComponent = PostUtils.messageHtmlToComponent(htmlFormattedText);

        let createdMessage = 'Created ';
        let listPositionMessage = '';
        if (issue.user !== '') {
            switch (issue.list) {
            case 'in' :
                createdMessage = 'Sent to ' + issue.user;
                listPositionMessage = 'In Inbox at position ' + (issue.position + 1) + '.';
                break;
            case 'done':
                createdMessage = 'Completed by ' + issue.user;
                listPositionMessage = '';
                break;
            case 'out' :
                createdMessage = 'Received from ' + issue.user;
                listPositionMessage = '';
                break;
            default:
                createdMessage = 'Sent to ' + issue.user;
                listPositionMessage = 'Accepted. At position ' + (issue.position + 1) + '.';
            }
        } else if (props.list === 'out') {
            createdMessage = 'User declined ';
            listPositionMessage = '';
        }

        const listDiv = (
            <div
                className='light'
                style={style.subtitle}
            >
                {listPositionMessage}
            </div>
        );

        const removeButton = (
            <IssueButton
                issueId={issue.id}
                actionFunc={props.remove}
                list={props.list}
                useIconButtons={props.useIconButtons}
                icon='icon-trash-can-outline'
                caption='Delete'
                tooltip='Delete Item'
            />
        );

        const acceptButton = (
            <IssueButton
                issueId={issue.id}
                actionFunc={props.accept}
                useIconButtons={props.useIconButtons}
                icon='icon-playlist-check'
                caption='Accept this task'
                tooltip='Accept this task and add to your Todos'
                            />
        );

        const completeButton = (
            <IssueButton
                issueId={issue.id}
                actionFunc={props.complete}
                useIconButtons={props.useIconButtons}
                icon='icon-check'
                caption='Done'
                tooltip='Mark as Done'
            />
        );

        const bumpButton = (
            <IssueButton
                issueId={issue.id}
                actionFunc={props.bump}
                useIconButtons={props.useIconButtons}
                icon='icon-update'
                caption='Bump'
                tooltip='Bump item to top of Users list'
            />
        );
        const declineButton = (
            <IssueButton
                issueId={issue.id}
                action={props.remove}
                useIconButtons={props.useIconButtons}
                icon='icon-cancel'
                caption='Decline'
                tooltip='Decline this task'
            />
        );

        const actionButtons = (
            <div
                className='action-buttons'
            >
                {canComplete(props.list) && (completeButton)}
                {canAccept(props.list, issue.list) && acceptButton}
                {canBump(props.list, issue.list) && bumpButton}
                {canRemove(props.list) && removeButton}
                {canDecline(props.list) && declineButton}
            </div>);

        return (
            <div
                key={issue.id}
                style={style.container}
            >
                <div
                    style={style.subcontainer}
                >
                    <div
                        className='todo-text'
                        onClick={handleClick}
                    >
                        {issueComponent}
                    </div>
                    <div
                        className='light'
                        style={style.subtitle}
                    >
                        {createdMessage + ' on ' + formattedDate + ' at ' + formattedTime}
                        {listPositionMessage && listDiv}
                    </div>
                </div>
                {(canRemove(props.list, issue.list) || canComplete(props.list) || canAccept(props.list) || canBump(props.list, issue.list) || canDecline(props.list)) && actionButtons}
            </div>
        );
    }) : <div style={style.container}>{'Nothing to display.'}</div>;
}

ToDoIssues.propTypes = {
    issues: PropTypes.array.isRequired,
    theme: PropTypes.object.isRequired,
    list: PropTypes.string.isRequired,
    remove: PropTypes.func.isRequired,
    complete: PropTypes.func.isRequired,
    accept: PropTypes.func.isRequired,
    bump: PropTypes.func.isRequired,
    siteURL: PropTypes.string.isRequired,
    useIconButtons: PropTypes.bool.isRequired,
};

const getStyle = makeStyleFromTheme((theme) => {
    return {
        container: {
            display: 'flex',
            padding: '5px',
            paddingLeft: '15px',
            borderTop: `1px solid ${changeOpacity(theme.centerChannelColor, 0.2)}`,
        },
        subcontainer: {
            flex: '1',
            paddingRight: '5px',
        },
        issueTitle: {
            color: theme.centerChannelColor,
            lineHeight: 1.7,
            fontWeight: 'bold',
        },
        subtitle: {
            margin: '5px 0 0 0',
            fontSize: '13px',
        },
        message: {
            width: '100%',
            overflowWrap: 'break-word',
            whiteSpace: 'pre-wrap',
        },
    };
});

export default ToDoIssues;
