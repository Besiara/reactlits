import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL',
});

Accounts.onLogin(() => FlowRouter.go('chats'));

// Logout
Tracker.autorun(() => {
    if (!Meteor.userId()) FlowRouter.go('root');
});