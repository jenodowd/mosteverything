import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {

  constructor() {
    super()
    this.state = { inputContent: "", msgs: [] }
    this.bresponse = [" ", "that's cool", "love it!", "that's interesting...", "sounds fun!", "great idea", "lol", "..."]
    this.fresponse = [" ", "ok", "how do you feel about it?", "nice!", "I guess", "Bob's right", "haha", "?"]
  }


  handleSubmit = (event) => {
    let content = this.state.inputContent;
    let newMsgs = this.state.msgs.concat("John: " + content);
    this.clearForm()
    setTimeout(this.bobResponse, 1000)
    setTimeout(this.fredResponse, 2000)
    this.setState({ msgs: newMsgs })
    event.preventDefault() // STOPS PAGE FROM RELOADING
  }

  bobResponse = () => {
    let bobrandom = (Math.floor(Math.random() * 7) + 1)
    let newMsgs = this.state.msgs.concat("Bob: " + this.bresponse[bobrandom]);
    this.setState({ msgs: newMsgs })
  }

  fredResponse = () => {
    let fredrandom = (Math.floor(Math.random() * 7) + 1)
    let newMsgs = this.state.msgs.concat("Frederic: " + this.fresponse[fredrandom]);
    this.setState({ msgs: newMsgs })
  }

  updateInputContent = (event) => {
    this.setState({ inputContent: event.target.value })
  }

  clearForm = () => {
    this.setState({ inputContent: "" })
  }

  render() {
    let makeLi = elem => (<li> {elem} </li>);
    return (
      <div>
        <ul style={{ "list-style-type": "none" }}>
          <li>John: Hello</li>
          <li>Bob: Hey</li>
          {this.state.msgs.map(makeLi)}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.inputContent} onChange={this.updateInputContent} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default App;
