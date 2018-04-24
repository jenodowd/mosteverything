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
      newusername: "",
      botMessage: "interesting",
      PbotMessage: "is that so",
      allMsgs: [],
      currentMsg: "",
      buttonCount: 0 
    }
  }
  loginFinished = (name) => {
    this.setState({ username: name, screen: CHAT_SCREEN });
  }
  settingsFinished = (name) => {
    let newMessages = this.state.allMsgs.map((elem)=> {
      let splitString = elem.split(":")
      if(splitString[0] === this.state.username) {
        splitString[0] = name
      }
      return splitString.join(":")
    })
    this.setState({ username: name, screen: CHAT_SCREEN, allMsgs: newMessages });
  }

  gotoSettings = () => {
    this.setState({ screen: SETTINGS_SCREEN })
    this.buttonCounter();
  }
  setBotMessage = (msg) => {
    this.setState({ botMessage: msg })
  }
  setPBotMessage = (msg) => {
    this.setState({ PbotMessage: msg })
  }
  updateCurrentMsg = (msg) => {
    this.setState({ currentMsg: msg })
  }
  updateAllMsgs = (newMsgs) => {
    this.setState({allMsgs: newMsgs})
  }
  buttonCounter = () => {
    this.setState({buttonCount: this.state.buttonCount + 1})
  }
  clearChat = () => {
    this.setState({ allMsgs: [] })
  }
  changeName = (newName) => {
    this.setState({newusername: newName})
  }

  render() {
    console.log(this.state)
    if (this.state.screen === LOGIN_SCREEN)
      return (<div><div>Button Count: {this.state.buttonCount}</div>
        <Login
        loginSubmit={this.loginFinished}
        buttonCounter = {this.buttonCounter} />
        </div>);
    if (this.state.screen === CHAT_SCREEN)
      return (
        <div><div>Button Count: {this.state.buttonCount}</div>
        <Chat
        botMessage={this.state.botMessage}
        PbotMessage={this.state.PbotMessage}
        gotoSettings={this.gotoSettings}
        username={this.state.username}
        allMsgs = {this.state.allMsgs}
        currentMsg = {this.state.currentMsg}
        updateCurrentMsg={this.updateCurrentMsg}
        updateAllMsgs = {this.updateAllMsgs}
        buttonCounter = {this.buttonCounter} 
        clearChat = {this.clearChat}
        deleteItem = {this.itemDeleter} />
      </div>);
    if (this.state.screen === SETTINGS_SCREEN)
      return (
        <div><div>Button Count: {this.state.buttonCount}</div>
        <Settings
        botMessage={this.state.botMessage}
        PbotMessage={this.state.PbotMessage}
        username={this.state.username}
        settingsSubmit={this.settingsFinished}
        setBotMessage={this.setBotMessage}
        setPBotMessage={this.setPBotMessage} 
        buttonCounter={this.buttonCounter}
        changeName={this.changeName}
        /></div>);
  }
}

export default App;
