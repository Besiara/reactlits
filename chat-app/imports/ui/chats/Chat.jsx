import { getTime } from '/imports/ui/shared/getTime.js';

import React, { Component, PropTypes } from 'react';

import { Card, CardHeader, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { FlowRouter } from 'meteor/kadira:flow-router';

export default class Chat extends Component {
  constructor(props) {
      super(props);
      this.state = {isActive:false};
  }
  onClickView(){
    FlowRouter.go('chat', { chatId: this.props.chat._id });
    this.setState({isActive: true});
  }
  render() {
    const cardStyles = {
      marginBottom: 10,
    };
    const activeCardStyles= {
       marginBottom: 10,
       background:"rgb(232,232,232)"
    }
    const time = getTime(this.props.chat.lastMessage.timestamp);

    return (
      <Card style={this.state.isActive?activeCardStyles:cardStyles}>
        <CardHeader
          title={this.props.chat.name}
          subtitle={<p>{this.props.chat.lastMessage.text} <b>{time}</b></p>}
          avatar={this.props.chat.picture}
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