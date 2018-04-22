import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = { user: "", inputContentLeft: "", inputContentRight: "", msgsLeft: [], msgsRight: [], shown: true }
    this.bresponse = [" ", "that's cool", "love it!", "that's interesting...", "sounds fun!", "great idea", "lol", "..."]
    this.fresponse = [" ", "ok", "how do you feel about it?", "nice!", "I guess", "Bob's right", "haha", "?"]
  }

  handleSubmitLeft = (event) => {
    let contentLeft = this.state.inputContentLeft;
    let newMsgsLeft = this.state.msgsLeft.concat(this.state.user + ": " + contentLeft);
    this.clearFormLeft()
    setTimeout(this.bobResponse, 1000)
    this.setState({ msgsLeft: newMsgsLeft })
    event.preventDefault() // STOPS PAGE FROM RELOADING
  }

  handleSubmitRight = (event) => {
    let contentRight = this.state.inputContentRight;
    let newMsgsRight = this.state.msgsRight.concat(this.state.user + ": " + contentRight);
    this.clearFormRight()
    setTimeout(this.fredResponse, 1000)
    this.setState({ msgsRight: newMsgsRight })
    event.preventDefault() // STOPS PAGE FROM RELOADING
  }

  bobResponse = () => {
    let bobrandom = (Math.floor(Math.random() * 7) + 1)
    let newMsgsLeft = this.state.msgsLeft.concat("Bob: " + this.bresponse[bobrandom]);
    this.setState({ msgsLeft: newMsgsLeft })
  }

  fredResponse = () => {
    let fredrandom = (Math.floor(Math.random() * 7) + 1)
    let newMsgsRight = this.state.msgsRight.concat("Frederic: " + this.fresponse[fredrandom]);
    this.setState({ msgsRight: newMsgsRight })
  }

  updateInputContentLeft = (event) => {
    this.setState({ inputContentLeft: event.target.value })
  }

  updateInputContentRight = (event) => {
    this.setState({ inputContentRight: event.target.value })
  }

  changeUserName = (event) => {
    this.setState({ user: event.target.value })
  }

  clearFormLeft = () => {
    this.setState({ inputContentLeft: "" })
  }

  clearFormRight = () => {
    this.setState({ inputContentRight: "" })
  }


  clickFalse = () => {
    this.setState({ shown: false })
  }

  clickTrue = () => {
    this.setState({ shown: true })
  }

  render() {
    let makeLi = elem => (<li> {elem} </li>);
    if (this.state.shown) {
      return (
        <div>
          <div className="user">
            User Name: <input type="text" value={this.state.user} onChange={this.changeUserName} />
          </div>
          <div className="container">

            <div className="chat1">
              <ul style={{ "list-style-type": "none" }}>
                <li>Bob: Hey</li>
                {this.state.msgsLeft.map(makeLi)}
              </ul>
              <form onSubmit={this.handleSubmitLeft}>
                <div>
                  <input type="text" value={this.state.inputContentLeft} onChange={this.updateInputContentLeft} />
                  <input type="submit" />
                </div>
              </form>
            </div>

          </div>
          <button onClick={this.clickFalse}>Show Left</button>
          <button onClick={this.clickTrue}>Show Right</button>
        </div>
      );

    }

    return (
      <div>
        <div className="user">
          User Name: <input type="text" value={this.state.user} onChange={this.changeUserName} />
        </div>
        <div className="container">

          <div className="chat2">
            <ul style={{ "list-style-type": "none" }}>
              <li>Frederic: Hey</li>
              {this.state.msgsRight.map(makeLi)}
            </ul>
            <form onSubmit={this.handleSubmitRight}>
              <div>
                <input type="text" value={this.state.inputContentRight} onChange={this.updateInputContentRight} />
                <input type="submit" />
              </div>
            </form>
          </div>

        </div>
        <button onClick={this.clickFalse}>Show Left</button>
        <button onClick={this.clickTrue}>Show Right</button>
      </div>
    );
  }

}

export default App;
