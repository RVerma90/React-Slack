import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import logo from './logo.svg';
import '../App.css';

class Messages extends Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    // Using JQuery to auto scroll to bottom, i.e most recent text
    $("#message-list").scrollTop($("#message-list")[0].scrollHeight);
  }

  render() {
    let messageList = this.props.messages.map(function(message, i ) {
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
      <div id="message-list">
        <div className="time-divide">
          <span className="date">
          </span>
        </div>
          {messageList}
      </div>
    );
  }
}

export default Messages;
