import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import logo from './logo.svg';
import '../App.css';

class Channels extends Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        // Using JQuery to auto scroll to bottom, i.e most recent text
        $("#message-list").scrollTop($("#message-list")[0].scrollHeight);
    }

    render() {
        let channelList = this.props.channels.map(function(channel, i) {
            return (
              <li key={i} className="channel active">
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
                <h2 className="listings_header">Channels</h2>
                <ul className="channel_list">
                  {channelList}
                </ul>
            </div>
        );
    }
}

export default Channels;
