// Meteor Dependencies and collections
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
// React Dependencies
import React from 'react';
import { mount } from 'react-mounter';

// App Components
import Main from '/imports/ui/Main.jsx';
import Layout from '/imports/ui/Layout.jsx';
import Conversations from '/imports/ui/Conversations.jsx';
import Conversation from '/imports/ui/Conversation.jsx';

// Tap Events Hack
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Routes
FlowRouter.route('/', {
  name: 'root',
  action() {
    mount(Main, {
      content: (<Conversations />),
    });
  },
});

FlowRouter.route('/chats', {
  name: 'chats',
  action() {
    mount(Layout, {
      content: (<Conversations />),
    });
  },
});

const chatRoutes = FlowRouter.group({
  prefix: '/chats',
  name: 'chat',
  triggersEnter: [function(context, redirect) {
    console.log('running group triggers');
  }]
});

chatRoutes.route('/:chatId', {
  name: 'chat',
  action() {
    mount(Layout, {
      content: (<Conversation />),
    });
  },
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