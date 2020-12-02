import { Template } from 'meteor/templating';
import {Messages} from '../imports/api/messages';
import {Gifs} from '../imports/api/gifs';
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
  num(){
    return Meteor.users.find().count()-1;
  },
  more(){
    return (4-Meteor.users.find().count());
  },
  checkAdmin(username){
      if(username == 'admin'){
          return true;
      }
  },
  notthree(){
    if (Meteor.users.find().count() < 4){
      return true;
    }
    else{ 
      return false;
    }
  }
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
  checkAdmin(userId){
    if(userId){
      const user = Meteor.users.findOne(userId);
      if(user){
        username = user.username;
        if(username == 'admin'){
          console.log("admin");
          return true;
        }
      }
    }
  },
  showcommand(text){
    if(text == '/showgifs'){
      return true;
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
  },
  groupgif(){
    return Gifs.find({assignedTo: 'admin'}, {sort: {createdAt: -1}, limit: 3, reactive: false});
  }
});

Template.picking.helpers({
  App(){
    return App;
  },
  users(){
    return Meteor.users.find();
  },
  initialise(){
    Tracker.afterFlush(function (){
      var x = document.getElementsByClassName("gifpicker__input");
      console.log("Initialiser called");
      x[0].value = "excited";
    });
  },
  checkAdmin(username){
    if(username == 'admin'){
        return true;
    }
  },
  test(){
    console.log(this);
    var y = document.getElementById("giflink");
    y.value = this;
    var x = document.getElementById("gifsend");
    x.style.display = "inline";
    Tracker.afterFlush(function (){
      parent = document.querySelector(".gifpicker__chosengif");
      button = parent.children[1];
      button.addEventListener("click", function(){ 
        console.log("hidesend");
        var x = document.getElementById("gifsend");
        x.style.display="none";
        // setTimeout(function(){ x.style.display = "none";}, 1000);
      });
    });
  },
  onClick() {
    const instance = Template.instance();

    // Return a function from this helper, where the template instance is in
    // a closure
    return () => {
      console.log(Template.instance().data.gifUrl);
      instance.hasBeenClicked.set(true);
    }
  }
});

Template.displaying.helpers({
  gifcollection(current){
    // const gif = Gifs.findOne({assignedTo: current}, {sort: {createdAt: -1}});
    return Gifs.find({assignedTo: current}, {sort: {createdAt: -1}});
    // return gif.link;
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
  // getgif(){

  // }
});

Template.admincontrols.helpers({
  isadmin(username){
    if(username == 'admin'){
      return true;
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

Template.picking.events({
  'submit #gifselection'(event, instance){
    event.preventDefault();
    const link = event.target.link.value;
    const assignedTo = event.target.username.value;
    Meteor.call('gifs.insert', link, assignedTo, (err)=>{
      if (err){
        alert(err.message);
      }
      else{
        event.target.reset();
      }
    })
    var x = document.getElementById("gifsend");
    x.innerHTML = "Sent!";
    setTimeout(function(){ 
      x.style.display = "none"; 
      x.innerHTML="Send";
      parent = document.querySelector(".gifpicker__chosengif");
      button = parent.children[1];
      button.click();
    }, 1000);
    // x.style.display = "none";
  },
});

Template.displaying.events({
  'click #right-button'(event, instance){
    event.preventDefault();
  }
});

Template.admincontrols.events({
  'click #groupgifcollection'(event, instance){
    var x = document.getElementById("groupgif");
    x.style.display = "inline";
  }
});
