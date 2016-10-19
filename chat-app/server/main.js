import Moment from 'moment';
import { Meteor } from 'meteor/meteor';


import { Messages } from '/imports/api/messages.js';
import { Chats } from '/imports/api/chats.js';

import '/imports/api/server/message_methods.js';
import '/imports/api/server/chat_method.js';

Meteor.startup(() => {

  if (Chats.find().count() !== 0) return;

});