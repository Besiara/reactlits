import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Moment from 'moment';
import { _ } from 'underscore';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
// API
import { Chats } from '/imports/api/chats.js';
import { Messages } from '/imports/api/messages.js';

import Chat from '/imports/ui/chats/Chat.jsx';
import Conversation from '/imports/ui/chats/Conversation.jsx';
// Components
import Message from '/imports/ui/messages/Message.jsx';


export default class Conversations extends Component {

  deleteChat(chat) {
    Chats.remove(chat._id);
  }
  addChat() {
    const time = new Date();
    Meteor.call('newChat', {
        name: 'Unknown',
        picture: 'https://randomuser.me/api/portraits/lego/6.jpg',
        lastMessage: {
          text: "No messages till Today",
          timestamp: time
        }
    });
    this.forceUpdate();
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

  render() {
    return (
      <div>
        <div className="cards-container">
          {this.renderChats()}
          <div className="plus">
            <FloatingActionButton onClick={()=>this.addChat()}>
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
    chats: Chats.find({}).fetch(),
    currentUser: Meteor.user(),
  };
}, Conversations);