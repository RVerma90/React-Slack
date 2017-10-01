import React, { Component } from 'react';
import $ from 'jquery';
// import logo from './logo.svg';
import './App.css';

import Chat from './components/chat.js';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Chat />
    );
  }
}

export default App;
