import { Meteor } from 'meteor/meteor';

export const Users = Meteor.users.find({});
export const CurrentUserId = Meteor.user();