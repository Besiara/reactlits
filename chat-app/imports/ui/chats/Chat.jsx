import {getTime} from '/imports/ui/shared/getTime.js';

import React, { Component, PropTypes } from 'react';

import { Card, CardHeader, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { FlowRouter } from 'meteor/kadira:flow-router';

import RefreshIndicator from 'material-ui/RefreshIndicator';

export default class Chat extends Component {

  onClickView(){
    FlowRouter.go('chat', { chatId: this.props.chat._id });
  }

  render() {
    const cardStyles = {
      marginBottom: 10,
      background: 'none',
      position:  'relative'
    };
    const time = getTime(this.props.chat.lastMessage.timestamp);
    return (
      <Card style={cardStyles}>
        <CardHeader
          title={this.props.chat.name}
          subtitle={<p>{this.props.chat.lastMessage.text} <b>{time}</b></p>}
          avatar={this.props.chat.picture}
        />
          <RefreshIndicator
            percentage={99}
            size={40}
            left={480}
            top={20}
            status={this.props.chat.status}
            color="#8BC34A"
          />
        <CardActions>
          <FlatButton
            label="Delete Chat"
            onClick={() => this.props.deleteChat(this.props.chat)}
          />
          <FlatButton
            label="View"
            onClick={() => this.onClickView()}
          />
        </CardActions>
      </Card>
    );
  }
}

Chat.propTypes = {
  chat: PropTypes.object.isRequired,
  deleteChat: PropTypes.func.isRequired
};