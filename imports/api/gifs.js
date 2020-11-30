import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Gifs = new Mongo.Collection('gifs');

Meteor.methods({
    'gifs.insert'(link, assignedTo){
        check(link, String);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Gifs.insert({
            link: link,
            assignedBy: Meteor.userId(),
            assignedTo: assignedTo,
            createdAt: new Date()
        });
    }
})