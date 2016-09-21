// Meteor Dependencies and collections
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Tracker } from 'meteor/tracker';
import { Accounts } from 'meteor/accounts-base';
import '/imports/startup/accounts-config.js';

import { Meteor } from 'meteor/meteor';
// React Dependencies
import React from 'react';
import { mount } from 'react-mounter';

// App Components
import Layout from '/imports/ui/layouts/Layout.jsx';
import Landing from '/imports/ui/pages/Landing.jsx';
import Conversations from '/imports/ui/chats/Conversations.jsx';
import Conversation from '/imports/ui/chats/Conversation.jsx';
import {getTime} from '/imports/ui/shared/getTime.js';

// Tap Events Hack
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Routes
FlowRouter.route('/', {
  name: 'root',
  action() {
    mount(Layout, {
      content: (<Landing />),
    });
  },
});


const chatRoutes = FlowRouter.group({
  prefix: '/chats',
  triggersEnter: [() => {
    if (!Meteor.userId()) FlowRouter.go('root');
  }],
});
chatRoutes.route('/', {
   name: 'chats',
   action(chatId) {
     mount(Layout, {
       content: (<Conversations/>),
     });
   },
});
chatRoutes.route('/:chatId', {
  name: 'chat',
  action(chatId) {
    mount(Layout, {
      content: (<Conversations chatId={chatId}/>),
    });
  },
});


// triggers

// Login
Accounts.onLogin(() => FlowRouter.go('chats'));

// Logout
Tracker.autorun(() => {
  if (!Meteor.userId()) FlowRouter.go('root');
});

Meteor.startup(() => {
    WebFontConfig = {
        google: { families: ['Roboto:400,300,500:latin'] }
    };

    (() => {
        const wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
            '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        const s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
        //console.log("async fonts loaded", WebFontConfig);
    })();
});