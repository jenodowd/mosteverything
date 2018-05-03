import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    //let random = 'user' + Math.floor(Math.random() * 10000);
    this.state = {
      inputValue: "",
      messages: [],
      //username: "Simon"
    }
  }

  componentDidMount = () => {
    setInterval(this.getMessages, 100)
  }

  //POST MESSAGES

  getMessages = () => {
    console.log("B1")
    fetch('/messages')
      .then(response => response.text())
      .then(msgs => {
        console.log("B4",msgs)
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

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value })
  }



  //USER LOGIN

  handleUsernameChange = (event) => {
    this.setState({ usernameInput: event.target.value })
  }

  handlePasswordChange = (event) => {
    this.setState({ passwordInput: event.target.value })
  }

  handleLoginSubmit = (event) => {
    event.preventDefault();
    let bod = JSON.stringify(
      {
        username: this.state.usernameInput,
        password: this.state.passwordInput
      }
    )
    fetch('/login', { method: 'POST', body: bod })
      .then(response => response.text())
      .then(responseBody => {
        if (responseBody === "success") {
          this.setState({ username: this.state.usernameInput });
        } else {
          this.setState({ loginFailed: true })
        }
      })
    this.setState({ username: this.state.usernameInput })
  }

  handleSignUpSubmit = (event) => {
    event.preventDefault();
    let bod = JSON.stringify(
      {
        username: this.state.usernameInput,
        password: this.state.passwordInput
      }
    )
    console.log("A1", bod)
    fetch('/createaccount', { method: 'POST', body: bod })
    .then(e => { e.text() })
    .then(e => console.log("A4", e))
      //.then(e => { this.setState({ username: this.state.usernameInput, password: this.state.passwordInput }) })
  }


  renderLoginForm = () => {
    return (
      <div>
        <div>
          Sign Up:
    <form onSubmit={this.handleSignUpSubmit} >
            <input type="text" value={this.usernameInput} onChange={this.handleUsernameChange}></input>
            <input type="password" value={this.passwordInput} onChange={this.handlePasswordChange}></input>
            <input type="submit"></input>
          </form>
        </div>
        <div>
          Login:
    <form onSubmit={this.handleLoginSubmit} >
            <input type="text" value={this.usernameInput} onChange={this.handleUsernameChange}></input>
            <input type="password" value={this.passwordInput} onChange={this.handlePasswordChange}></input>
            <input type="submit"></input>
          </form>
        </div>
      </div>)
  }

  renderMessage = () => {
    return this.state.messages.map((msg, id) => (
      <li key={id}> {msg.username}: {msg.contents} </li>)
    )
  }

  render() {
    if (!this.state.username) {
      return this.renderLoginForm()
    }
    if (this.state.loginFailed) {
      return (<h1>login failed</h1>)
    }
    console.log(this.state)
    return (
      <div>
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
