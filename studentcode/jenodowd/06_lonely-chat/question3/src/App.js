import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = { inputContent: "", msgs: [] }
    this.response = [" ", "that's cool", "love it!", "that's interesting...", "sounds fun!", "great idea", "lol", "..."]
    //this.random = Math.floor(Math.random() * 3) + 0
  }


  handleSubmit = (event) => {
    let content = this.state.inputContent;
    let newMsgs = this.state.msgs.concat("John: " + content);
    this.clearForm()
    setTimeout(this.bobResponse, 1000)
    this.setState({ msgs: newMsgs })
    event.preventDefault() // STOPS PAGE FROM RELOADING
  }

  bobResponse = () => {
    let random = Math.floor(Math.random() * 7) + 1
    let newMsgs = this.state.msgs.concat("Bob: " + this.response[random]);
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
