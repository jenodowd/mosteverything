import React, { Component } from 'react';
import Login from './Login.js'
import Chat from './Chat.js'
import Settings from './Settings.js'
import './App.css';

// There are three different screens. The first screen shown to the user is the login.
let LOGIN_SCREEN = "login"
let CHAT_SCREEN = "chat"
let SETTINGS_SCREEN = "settings"

class App extends Component {
  constructor() {
    super();

    this.state = {
      screen: LOGIN_SCREEN, // The first screen the user sees is the login screen
      username: "noname",
      botMessage: "interesting",
      PbotMessage: "is that so"
    }
  }
  loginFinished = (name) => {
    this.setState({ username: name, screen: CHAT_SCREEN });
  }
  settingsFinished = (name) => {
    this.setState({ username: name, screen: CHAT_SCREEN });
  }
  gotoSettings = () => {
    this.setState({ screen: SETTINGS_SCREEN })
  }
  setBotMessage = (msg) => {
    this.setState({ botMessage: msg })
  }
  setPBotMessage = (msg) => {
    this.setState({ PbotMessage: msg })
  }
  render() {
    if (this.state.screen === LOGIN_SCREEN)
      return (<Login
        loginSubmit={this.loginFinished} />);
    if (this.state.screen === CHAT_SCREEN)
      return (<Chat
        botMessage={this.state.botMessage}
        PbotMessage={this.state.PbotMessage}
        gotoSettings={this.gotoSettings}
        username={this.state.username} />);
    if (this.state.screen === SETTINGS_SCREEN)
      return (<Settings
        botMessage={this.state.botMessage}
        PbotMessage={this.state.PbotMessage}
        username={this.state.username}
        settingsSubmit={this.settingsFinished}
        setBotMessage={this.setBotMessage}
        setPBotMessage={this.setPBotMessage} />);
  }
}

export default App;
