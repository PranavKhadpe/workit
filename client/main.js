import { Template } from 'meteor/templating';
import {Messages} from '../imports/api/messages';
import { Accounts } from 'meteor/accounts-base';
import { Tracker } from 'meteor/tracker'

import './main.html';
import App from './App.js';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

Template.participantlist.helpers({
  users(){
    return Meteor.users.find();
  },
});

Template.chat.helpers({
  messages() {
    return Messages.find();
  },
  scroll(){
    Tracker.afterFlush(function () {
      var elem = document.getElementById('window');
      elem.scrollTop = elem.scrollHeight;
  });
  
  },
  getUsername(userId){
    if(userId){
      const user = Meteor.users.findOne(userId);
      if(user){
        username = user.username;
        username = username.charAt(0).toUpperCase() + username.slice(1);
        return username;
      }
    }
  },
  formatDate(date){
    return date.toLocaleString([], {timeStyle: 'short'});
  },
  checkUser(current, userId){
    if(current){
      if(current == Meteor.users.findOne(userId).username){
        return true;
      }
      else{
        return false;
      }
    }
  }
});

Template.picking.helpers({
  App(){
    return App;
  },
  initialise(){
    Tracker.afterFlush(function (){
      var x = document.getElementsByClassName("gifpicker__input");
      console.log("Initialiser called");
      x[0].value = "excited";
    });
  },
  onClick() {
    const instance = Template.instance();

    // Return a function from this helper, where the template instance is in
    // a closure
    return () => {
      instance.hasBeenClicked.set(true)
    }
  }
});

Template.chat.events({
  'submit #chat-form'(event, instance) {
    event.preventDefault();
    const text = event.target.text.value;
    Meteor.call('messages.insert', text, (err)=>{
      if (err) {
        alert(err.message);
      }
      else{
        event.target.reset();
      }
    })
  },
});
