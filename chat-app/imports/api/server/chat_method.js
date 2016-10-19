import { Meteor } from 'meteor/meteor';

// API
import { Chats } from '/imports/api/chats.js';
import { Messages } from '/imports/api/messages.js';

Meteor.methods({
  newChat(chat) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in', 'Must be logged in to send message.');
    }
    check(chat, {
      name: String,
      firstUser: String,
      secondUser: String,
      picture: String,
      status: String,
      lastMessage: Object
    });
    const chatId = Chats.insert(Object.assign(chat));
    Chats.update(chat.chatId, { $set: { newChat: chat } });
    return chatId;
  }

});