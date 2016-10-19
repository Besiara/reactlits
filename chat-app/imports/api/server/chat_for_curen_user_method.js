import { Meteor } from 'meteor/meteor';

// API
import { Chats } from '/imports/api/chats.js';
import { Messages } from '/imports/api/messages.js';

Meteor.methods({
  currentUserChats() {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in', 'Must be logged in to send message.');
    }
    Meteor.publish('current-user-chats', function publishFunction() {
      return Chats.find({ $or: [{ firstUser: this.userId }, { secondUser: this.userId }] });
    })
  }
});