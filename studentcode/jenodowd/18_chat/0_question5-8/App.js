import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    //let random = 'user' + Math.floor(Math.random() * 10000);
    this.state = {
      inputValue: "",
      messages: [],
      username : undefined,
      usernameInput: undefined,
      passwordInput: undefined
    }
  }

  componentDidMount = () => {
    setInterval(this.getMessages, 500)
  }

  //POST MESSAGES
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



    let welcomebod = JSON.stringify(
        {
          contents: this.state.usernameInput + " has entered the chat!"
        }
      )
      fetch('/welcome', { method: 'POST', body: welcomebod });

  }

  //USER SIGN UP
  handleSignUpSubmit = (event) => {
    event.preventDefault();
    let bod = JSON.stringify(
      {
        username: this.state.usernameInput,
        password: this.state.passwordInput
      }
    )
    fetch('/createaccount', { method: 'POST', body: bod })
      .then(response => response.text())
      .then(responseBody => {
        if (responseBody === "failure") {
          this.setState({ signUpFailed: true })
        }
      })
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
    return this.state.messages.slice(Math.max(this.state.messages.length - 10, 1)).map((msg, id) => 
    (<li key={id}> <strong>{msg.username}</strong> {msg.contents} </li>)
    )
  }

  renderUsers = () => {
    let userArray = [];
    this.state.messages.slice(Math.max(this.state.messages.length - 100, 1)).map((msg, id) => 
    userArray.push(msg.username)
    )
    let unique = [...new Set(userArray)]; 
    
    return unique.map((user, id) => 
    (<li key = {id}>{user}</li>)
  )
  }


  render() {
    if (!this.state.username) {
      return this.renderLoginForm() 
    }
    if (this.state.loginFailed) {
      return (<h1>Login Failed</h1>)
    }
    if (this.state.signUpFailed) {
      return (<h1>You already have an account</h1>)
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
        <br />
        <br />
        ACTIVE USERS:
        <div>
          <ul>
            {this.renderUsers()}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
