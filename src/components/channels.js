import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import logo from './logo.svg';
import '../App.css';

import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Channels extends Component {

    constructor(props) {
        super(props);

        this.state = {
          modalIsOpen: false
        };
    }

    getInitialState() {
      // references are now sync'd and can be accessed.
      return { modalIsOpen: false};
    }

    openModal() {
      this.setState({modalIsOpen: true});
    }

    closeModal() {
      this.setState({modalIsOpen: false});
    }

    joinNewChannel() {
      let new_channel = $('#new-channel-name').val();
      if(new_channel.trim() != "") {
          this.props.createChannel(new_channel);
          this.closeModal();
      }
    }

    // If user 'enters' instead of clicks for adding new channel
    onEnter(event) {
        if (event.nativeEvent.keyCode != 13) return;
        this.joinNewChannel();
    }

    switchChannel(channelName) {
      this.props.joinChannel(channelName);
    }

    render() {
        // First line: a way to ref the scope of the entire component
        let that = this;
        let currentChannel = this.props.currentChannel;
        let channelList = this.props.channels.map(function(channel, i) {
            return (
                <li key={i} className={channel === currentChannel ? 'channel active' : 'channel'} onClick={that.switchChannel.bind(that, channel)}>
                    <a className="channel_name">
                        <span className="unread">0</span>
                        <span>
                            <span className="prefix">#</span>{channel}</span>
                    </a>
                </li>
            )
        })

        return (
            <div className="listings_channels">
                <span className="add_icon" onClick={this.openModal.bind(this)}>+</span>
                <h2 className="listings_header">Channels</h2>
                <ul className="channel_list">
                    {channelList}
                </ul>
                <Modal
                  isOpen={this.state.modalIsOpen}
                  onRequestClose={this.closeModal}
                  style={customStyles} >

                  <h2 className="text-center">Enter a channel to join</h2>

                  <div>
                    # <input id="new-channel-name" type="text" onKeyPress={this.onEnter.bind(this)} />
                    <button className="btn" onClick={this.joinNewChannel.bind(this)}>Join</button>
                  </div>
                </Modal>
            </div>
        );
    }
}

export default Channels;
