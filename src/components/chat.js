import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import logo from './logo.svg';
import '../App.css';

// Components
import Messages from './messages';
import Channels from './channels';

import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}

const DEFAULT_CHANNEL = "general";

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            channels: [],
            messages: {},
            currentChannel: null
        }
    }

    componentDidMount() {
      this.createChannel(DEFAULT_CHANNEL);

      let messages = {};
      messages[DEFAULT_CHANNEL] = [
          {
              name: 'rahulv90',
              time: new Date(),
              text: 'Hi there'
          }, {
              name: 'rahulv90',
              time: new Date(),
              text: 'Welcome to your chat app'
          }
      ]

      this.setState({
        messages: messages
      })
    }

    componentDidUpdate() {
        // Using JQuery to auto scroll to bottom, i.e most recent text
        $("#message-list").scrollTop($("#message-list")[0].scrollHeight);
    }

    sendMessage(event) {
        let text = event.target.value;
        if (event.keyCode === 13 && text !== "") {
            let message = {
                name: this.state.name,
                time: new Date(),
                text: text
            }

            let messages = this.state.messages;
            messages[this.state.currentChannel].push(message);
            this.setState({messages: messages})

            text = '';
            // Using JQuery to set the input field to ''
            $('#msg-input').val('');
        }
    }

    createChannel(channelName) {
      if (!(channelName in this.state.channels)) {
        // Add new channel is it does not exist
        let messages = this.state.messages;
        messages[channelName] = [];

        this.setState({
          channels: this.state.channels.concat(channelName),
          messages: messages
        });
        this.joinChannel(channelName);
      }
    }

    joinChannel(channelName) {
      this.setState({currentChannel: channelName});
    }

    enterName(event) {
        let newName = $('#new-name').val().trim();
        if (newName == "") {
            let randomId = 0;
            randomId = Math.floor((Math.random() * 99) + 1);
            newName = "anonymous" + randomId;
        }
        this.state.name = '';
        this.setState({name: newName});
    }

    // If user 'enters' instead of clicks for adding Twitter ID
    onEnter(event) {
        if (event.nativeEvent.keyCode != 13)
            return;
        this.enterName();
    }

    render() {
        return (
            <div>
                <Modal isOpen={!this.state.name} style={customStyles}>

                    <h2 className="text-center">Enter a Twitter ID</h2>
                    <div>
                        <input id="new-name" type="text " onKeyPress={this.onEnter.bind(this)}/>
                        <button className="btn" onClick={this.enterName.bind(this)}>Join</button>
                    </div>
                </Modal>

                <div className="header">
                    <div className="team-menu">
                        <img className="connection_icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABmFBMVEUAAAD////////////////////////////////////2+/LR5bKw1Hmfy1KUxz2VyD2izVKz1nnS5rP////A3JuOw0qKwkCNxD+QxT6Sxj6Txz6SxUnC3Jv1+fGXx2GDvkCGwECIwUCLwj+PxD6PxT+JwUCFwECZyGD2+vGSxWF9vEGAvkGDv0CMwz+Wx2GPw2F4ukJ7u0J+vUGBvkGHwUB8u0KSxGG31pp0uEN3uUJ5u0KFv0CCv0B6u0K415p5uU1yt0N/vUF1uEN8u0zG3bFttURwtkR5ukLH3rGWxnlqtERutUR2uUOZx3l6uVZos0VvtkRxt0Nzt0N8ulVisUVlskVns0VzuENmskVfsEVps0VztlZer0VhsEVjsUVstER1t1aOwXhcrkZdr0VgsEaQwnm/2a9YrUZbrka/2rDz+PFhr09XrEZksE6pzplUq0ZVrEZarUaqzpl0tWJRq0dWrEZ1tmJztWJOqUdSq0dxtGJMqEdNqUdQqkdytWKmzJhXrFBKqEdZrU+716+GvXhjr1dIp0hkr1dYtVOVAAAAFHRSTlMAV8/v/wCH+x/n////////////9kvBHZAAAAG7SURBVHgBvdOxjtNAEIDhGe/MZO3sxVaiIJkiSNdQUPJOeQlqXoCCIg/EU9BQHRKg5CT7ErzrHTa+aBOqaxC/tdLK+2kbj+H/hoWhlCmQr0HeyYxyM8mvkWHKoAfBS6cBWEeYugAzf4QGp1SV8DvU/ZjBdN7iud6hdnOTdl+TuALyrUPEwfdu3nc1ipr9AwdIFZPysJylRDfa6cZL2rfgMd9QjO8R0Y+/u7sa4LHZz4wN/MXEyw1hbK1VZdV7PZ1OyufzktsxXADCW5EkXq06Paan02Uoo3kHmAEzJ8HBN6v5qlkqaxTmCdAzQK8Noi6rXwCrJyutepUMAARnXS++3cvm2xvftR0PzAyQAXtwdNChifvFHppBdR003IDCIg6JDOse4DX8WIdo1TwfpaUgqWC9c4eqqg5HF20QZdAMmDlasdHWkrKR03J0A4iIXRTrpba29laiY8YMyOyMKYkXroyROZZuwVTyztAFJPmZKBGq+FxFVBr5BHr7ubd3GICfAM+88qDHHYe/BmbbIAaGKU/Fz10emDxyHxBhgJTg+DGP3O3QbltMBkd92F2H9sWxB772wo9z2z8FfwDHWbdKLDfq1AAAAABJRU5ErkJggg=="/> {this.state.name}
                    </div>

                    <div className="channel-menu">
                        <span className="channel-menu_name">
                            <span className="channel-menu-prefix">#</span>
                            {this.state.currentChannel}
                        </span>
                    </div>
                </div>

                <div className="main">
                    <div className="listings">
                        <Channels
                          channels={this.state.channels}
                          createChannel={this.createChannel.bind(this)}
                          currentChannel={this.state.currentChannel}
                          joinChannel={this.joinChannel.bind(this)}
                        />
                    </div>
                    <div className="listings_direct-messages"></div>

                    <div className="message-history">
                        <Messages messages={this.state.messages[this.state.currentChannel]}/>
                    </div>
                </div>

                <div className="footer">
                    <div className="user-menu">
                        <p className="disclaimer">This demo is not created, affiliated or supported by Slack.</p>
                    </div>
                    <div className="input-box">
                        <input id="msg-input" type="text" className="input-box_text" onKeyDown={this.sendMessage.bind(this)}/>
                    </div>
                </div>
            </div>

        );
    }
}

export default Chat;
