import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import GifPicker from 'gifpicker';
import './app.css';

import './main.js';

class App extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <GifPicker
          apikey="JRRPJW2OJT6Q"
          onSelect={gifUrl => {
            console.log(gifUrl);
            Template.picking.__helpers.get('test').call(gifUrl);
            // console.log(this.gifRef.current);
          }}
        />
      </>
    );
  }
}

export default App;