import { Meteor } from 'meteor/meteor';
import {Messages} from '../imports/api/messages';
import {Gifs} from '../imports/api/gifs';


Meteor.startup(() => {
  // code to run on server at startup
  Messages.remove({});
  // var globalObject=Meteor.isClient?window:global;
  // for(var property in globalObject){
  //     var object=globalObject[property];
  //     if(object instanceof Meteor.Collection){
  //         object.remove({});
  //     }
  // }
});
