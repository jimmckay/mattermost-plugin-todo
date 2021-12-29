// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';

import ToDoIssues from './todo_issues';

import './sidebar_right.scss';

export function renderView(props) {
    return (
        <div
            {...props}
            className='scrollbar--view'
        />);
}

export function renderThumbHorizontal(props) {
    return (
        <div
            {...props}
            className='scrollbar--horizontal'
        />);
}

export function renderThumbVertical(props) {
    return (
        <div
            {...props}
            className='scrollbar--vertical'
        />);
}

const MyListName = 'my';
const OutListName = 'out';
const InListName = 'in';
const DoneListName = 'done';

export default class SidebarRight extends React.PureComponent {
    static propTypes = {
        todos: PropTypes.arrayOf(PropTypes.object),
        inTodos: PropTypes.arrayOf(PropTypes.object),
        doneTodos: PropTypes.arrayOf(PropTypes.object),
        outTodos: PropTypes.arrayOf(PropTypes.object),
        theme: PropTypes.object.isRequired,
        siteURL: PropTypes.string.isRequired,
        rhsState: PropTypes.string,
        useIconButtons: PropTypes.bool.isRequired,
        actions: PropTypes.shape({
            remove: PropTypes.func.isRequired,
            complete: PropTypes.func.isRequired,
            accept: PropTypes.func.isRequired,
            bump: PropTypes.func.isRequired,
            list: PropTypes.func.isRequired,
            openRootModal: PropTypes.func.isRequired,
            setVisible: PropTypes.func.isRequired,
            telemetry: PropTypes.func.isRequired,
        }).isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            list: props.rhsState || MyListName,
            showInbox: true,
            showMy: true,
            useIconButtons: props.useIconButtons,
        };
    }

    openList(listName) {
        if (this.state.list !== listName) {
            this.setState({list: listName});
        }
    }

    toggleInbox() {
        this.props.actions.telemetry('toggle_inbox', {action: this.state.showInbox ? 'collapse' : 'expand'});
        this.setState({showInbox: !this.state.showInbox});
    }

    toggleMy() {
        this.props.actions.telemetry('toggle_my', {action: this.state.showMy ? 'collapse' : 'expand'});
        this.setState({showMy: !this.state.showMy});
    }

    componentDidMount() {
        this.props.actions.list(false, 'my');
        this.props.actions.list(false, 'in');
        this.props.actions.list(false, 'out');
        this.props.actions.list(false, 'done');
        this.props.actions.setVisible(true);
    }

    componentWillUnmount() {
        this.props.actions.setVisible(false);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.rhsState !== this.props.rhsState) {
            this.openList(this.props.rhsState);
        }
    }

    getInIssues() {
        return this.props.inTodos.length;
    }

    getDoneIssues() {
        return this.props.doneTodos.length;
    }

    getOutIssues() {
        return this.props.outTodos.length;
    }

    getMyIssues() {
        return this.props.todos.length;
    }

    render() {
        // console.log(this.props.useIconButtons);
        let todos = [];
        let addButton = '';
        let theList = this.state.list;

        addButton = 'New Todo';
        switch (theList) {
        case MyListName:
            todos = this.props.todos || [];
            break;
        case InListName:
            todos = this.props.inTodos || [];
            break;
        case OutListName:
            todos = this.props.outTodos || [];
            break;
        case DoneListName:
            todos = this.props.doneTodos || [];
            break;
        }
        if (todos.length === 0) {
            todos = this.props.todos;
            theList = (MyListName);
        }

        // let inbox;
        // if (inboxList.length > 0) {
        //     const actionName = this.state.showInbox ? 'collapse' : 'expand';
        //     inbox = (
        //         <div>
        //             <div
        //                 className='todo-separator'
        //                 onClick={() => this.toggleInbox()}
        //             >
        //                 {`Incoming Todos (${inboxList.length}) (${actionName})`}
        //             </div>
        //             {this.state.showInbox ? (
        //                 <ToDoIssues
        //                     issues={inboxList}
        //                     theme={this.props.theme}
        //                     list={InListName}
        //                     remove={this.props.actions.remove}
        //                     complete={this.props.actions.complete}
        //                     accept={this.props.actions.accept}
        //                     bump={this.props.actions.bump}
        //                     useIconButtons={this.props.useIconButtons}
        //                 />) : ''}
        //         </div>
        //     );
        // }

        // let separator;
        // if ((inboxList.length > 0) && (todos.length > 0)) {
        //     const actionName = this.state.showMy ? 'collapse' : 'expand';
        //     separator = (
        //         <div
        //             className='todo-separator'
        //             onClick={() => this.toggleMy()}
        //         >
        //             {`My Todos (${todos.length}) (${actionName})`}
        //         </div>
        //     );
        // }

        return (
            <React.Fragment>
                <Scrollbars
                    autoHide={true}
                    autoHideTimeout={500}
                    autoHideDuration={500}
                    renderThumbHorizontal={renderThumbHorizontal}
                    renderThumbVertical={renderThumbVertical}
                    renderView={renderView}
                    className='SidebarRight'
                >
                    <div className='header-menu'>
                        <div
                            className={'btn btn-primary' + (theList === MyListName ? ' selected' : '')}
                            onClick={() => this.openList(MyListName)}
                        >
                            {'Todos'} {this.getMyIssues() > 0 ? ' (' + this.getMyIssues() + ')' : ''}
                        </div>
                        {this.getInIssues() > 0 ? (
                            <div
                                className={'btn btn-primary' + (theList === InListName ? ' selected' : '')}
                                onClick={() => this.openList(InListName)}
                            >
                                {'Incoming'} { this.getInIssues() > 0 ? (' (' + this.getInIssues() + ')') : '' }
                            </div>) : '' }
                        {this.getOutIssues() > 0 ? (
                            <div
                                className={'btn btn-primary' + (theList === OutListName ? ' selected' : '')}
                                onClick={() => this.openList(OutListName)}
                            >
                                {'Sent'} { this.getOutIssues() > 0 ? (' (' + this.getOutIssues() + ')') : '' }
                            </div>) : ''}
                        {this.getDoneIssues() > 0 ? (
                            <div
                                className={'btn btn-primary' + (theList === DoneListName ? ' selected' : '')}
                                onClick={() => this.openList(DoneListName)}
                            >
                                {'Done'} { this.getDoneIssues() > 0 ? (' (' + this.getDoneIssues() + ')') : '' }
                            </div>) : ''}
                    </div>
                    <div
                        className='section-header'
                        onClick={() => {
                            this.props.actions.telemetry('rhs_add', {list: theList});
                            this.props.actions.openRootModal('');
                        }}
                    >
                        {addButton + ' '}
                        <i className='icon fa fa-plus-circle'/>
                    </div>
                    <div>
                        {/* {inbox} */}
                        {/* {separator} */}
                        {(todos.length > 0) ? (
                            <ToDoIssues
                                issues={todos}
                                theme={this.props.theme}
                                list={theList}
                                remove={this.props.actions.remove}
                                complete={this.props.actions.complete}
                                accept={this.props.actions.accept}
                                bump={this.props.actions.bump}
                                siteURL={this.props.siteURL}
                                useIconButtons={this.state.useIconButtons}
                            />) : <div>{'Nothing here!'}</div>}
                    </div>
                </Scrollbars>
            </React.Fragment>
        );
    }
}
