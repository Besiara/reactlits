import { Mongo } from 'meteor/mongo';

export const currentChats = new Mongo.Collection('currentChats');