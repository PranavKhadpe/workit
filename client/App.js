import React from 'react';
import GifPicker from 'gifpicker';
import './app.css';

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
            console.log(this.gifRef.current);
          }}
        />
      </>
    );
  }
}

export default App;