// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getIssues, getInIssues, getOutIssues, getDoneIssues, getSiteURL, getUsingIconButtons} from '../../selectors';
import {remove, list, openRootModal, complete, bump, accept, telemetry, setRhsVisible} from '../../actions';

import SidebarRight from './sidebar_right.jsx';

function mapStateToProps(state) {
    return {
        todos: getIssues(state),
        inTodos: getInIssues(state),
        doneTodos: getDoneIssues(state),
        outTodos: getOutIssues(state),
        siteURL: getSiteURL(),
        rhsState: state['plugins-com.mattermost.plugin-todo'].rhsState,
        useIconButtons: getUsingIconButtons(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            remove,
            complete,
            accept,
            bump,
            list,
            openRootModal,
            telemetry,
            setVisible: setRhsVisible,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarRight);
