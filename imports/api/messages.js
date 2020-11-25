import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Messages = new Mongo.Collection('messages');

Meteor.methods({
    'messages.insert'(text){
        check(text, String);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Messages.insert({
            text,
            userId: Meteor.userId(),
            createdAt: new Date()
        });
    }
})