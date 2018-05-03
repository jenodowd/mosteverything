import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    //let random = 'user' + Math.floor(Math.random() * 10000);
    this.state = {
      username: "",
      usernameValue: "",
      inputValue: "",
      messages: []
    }
  }

  componentDidMount = () => {
    setInterval(this.getMessages, 500)
  }

  getMessages = () => {
    fetch('/messages')
      .then(response => response.text())
      .then(msgs => {
        this.setState({ messages: JSON.parse(msgs) })
      })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let bod = JSON.stringify(
      {
        username: this.state.username,
        contents: this.state.inputValue
      }
    )
    this.setState({ inputValue: "" })
    fetch('/sendmsgs', { method: 'POST', body: bod });
  }

  handleNewUser = (event) => {
    event.preventDefault();
    let bod = JSON.stringify(
      {
        username: this.state.username
      }
    )
    //this.setState({ username: "" })
    fetch('/newuser', { method: 'POST', body: bod });
  }

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value })
  }

  handleUsernameChange= (event) => {
    this.setState({ username: event.target.value })
  }

  renderMessage = () => {
    return this.state.messages.map(msg => (
    <li> {msg.username}: {msg.contents} </li>)
    )
  }

  render() {
    return (
      <div>
        Username:
        <form onSubmit={this.handleNewUser} >
          <input type="text" value={this.state.username} onChange={this.handleUsernameChange}></input>
          <input type="submit"></input>
        </form>
        <br />
        CHAT:
        <div>
          <ul>
            {this.renderMessage()}
          </ul>
        </div>
        <form onSubmit={this.handleSubmit} >
          <input type="text" value={this.state.inputValue} onChange={this.handleChange}></input>
          <input type="submit"></input>
        </form>
      </div>
    );
  }
}

export default App;
