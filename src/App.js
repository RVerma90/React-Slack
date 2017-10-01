import React, { Component } from 'react';
import $ from 'jquery';
// import logo from './logo.svg';
import './App.css';

import Chat from './components/chat.js';

class App extends Component {

  constructor(props) {
    super(props);

    // this.setName = this.setName.bind(this);
    // this.sendMessage = this.sendMessage.bind(this);

    this.state = {
      name: 'anonymous',
      messages: [{
        name: 'rahulv90',
        time:  new Date(),
        text: 'Hi there 😘'
      },
      {
        name: 'rahulv90',
        time:  new Date(),
        text: 'Welcome to your chat app'
      }]
    }
  }

  componentDidUpdate() {
    // Using JQuery to auto scroll to bottom, i.e most recent text
    $("#message-list").scrollTop($("#message-list")[0].scrollHeight);
  }

  setName() {
    let myName = window.prompt("Please enter a name", "anonymous");
    this.setState({name:myName});
  }

  sendMessage(event) {
    let text = event.target.value;
    if (event.keyCode == 13 && text!== "") {
      let message = {
        name: this.state.name,
        time: new Date(),
        text: text
      }

      this.setState({messages: this.state.messages.concat(message)})
      text = '';
      // Using JQuery to set the input field to ''
      $('#msg-input').val('');
    }
  }

  render() {
    let messageList = this.state.messages.map(function(message, i ) {
      let text = message.text;
      return (
        <div key={i} className="message">
          <a href={"https://twitter.com/" + message.name + "/"} target="_blank">
            <img src={"https://twitter.com/" + message.name + "/profile_image/"} className="message_profile-pic" />
          </a>
          <a href={"https://twitter.com/" + message.name + "/"} target="_blank" className="message_username">{message.name}</a>
          <span className="message_timestamp">{message.time.toLocaleTimeString()}</span>
          <span className="message_content" dangerouslySetInnerHTML={{__html:text}}></span>
        </div>
      )
    })

    return (

        <Chat />

    );
  }
}

export default App;
