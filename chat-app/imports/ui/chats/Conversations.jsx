import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Moment from 'moment';
import { _ } from 'underscore';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
// API
import { Chats } from '/imports/api/chats.js';
import { Messages } from '/imports/api/messages.js';
import { User } from '/imports/api/users.js';

import Chat from '/imports/ui/chats/Chat.jsx';
import Conversation from '/imports/ui/chats/Conversation.jsx';
// Components
import Message from '/imports/ui/messages/Message.jsx';


export default class Conversations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: !(_.isEmpty(this.props.chatsSecondUser)),
    };
  }
  deleteChat(chat) {
    Chats.remove(chat._id);
  }

  renderChats() {
    return this.props.chats.map((chat) => (
      <Chat
        key={chat._id}
        chat={chat}
        deleteChat={this.deleteChat.bind(this)} />
    ));
  }

  renderConversations() {
    return  <Conversation params={{chatId: FlowRouter.current().params.chatId}}/>;
  }
  handleOpen () {
    this.setState({openDialog: true});
  };

  handleClose() {
    this.setState({openDialog: false});
  };
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={()=>this.handleClose()}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={()=>this.handleClose()}
      />,
    ];
    return (
      <div>
      <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.handleClose}
        >
          The actions in this window were passed in as an array of React objects.
        </Dialog>
        <div className="cards-container">
          {this.renderChats()}
          <div className="plus">
            <FloatingActionButton onClick={()=>FlowRouter.go('users')}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
        <div className="conv">
          {this.renderConversations()}
        </div>
      </div>
    );
  }
}

Conversations.propTypes = {
  chats: PropTypes.array.isRequired,
};

export default createContainer(() => {

  return {
    chats: Chats.find({ $or: [{ firstUser: Meteor.user()._id}, { secondUser:Meteor.user()._id}] }).fetch(),
    currentUser: Meteor.user(),
    chatsSecondUser: Chats.find({ $and: [{secondUser:Meteor.user()._id },{status:'loading'}]}),
  };
}, Conversations);