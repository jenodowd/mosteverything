import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();

    //let random = 'user' + Math.floor(Math.random() * 10000);
    this.state = {
      inputValue: "",
      messages: [],
      activeUsers: [],
      username: undefined,
      usernameInput: undefined,
      passwordInput: undefined,
    }

  }

  componentDidMount = () => {

    fetch('/checksession', { method: 'GET', credentials: "same-origin" })
      .then(x => x.text())
      .then(x => JSON.parse(x))
      .then(x => this.setState({ username: x }))

    setInterval(this.handleActiveUsers, 1000)

    setInterval(this.getMessages, 500)

  }

  //POST MESSAGES
  getMessages = () => {
    fetch('/messages', { method: 'GET', credentials: "same-origin" })
      .then(response => response.text())
      .then(msgs => {
        this.setState({ messages: JSON.parse(msgs) })
      })
  }

  handleActiveUsers = () => {
    fetch('/activeusers', { method: 'GET' })
      .then(response => response.text())
      .then(activeUsers => {
        this.setState({ activeUsers: JSON.parse(activeUsers) })
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

    fetch('/sendmsgs', { method: 'POST', credentials: "same-origin", body: bod })
      .then(response => response.text())
      //.then(x => console.log(x))
      .then(responseBody => {
        if (responseBody !== "success") {
          this.setState(console.log('session ID does not exist'))
        }
      })

    let timeBod = JSON.stringify(
      {
        username: this.state.username,
        time: new Date().getTime()
      }
    )

    fetch('/timesent', { method: 'POST', body: timeBod })
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

    fetch('/login', { method: 'POST', body: bod, credentials: "same-origin" })
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
      { contents: this.state.usernameInput + " has entered the chat!" }
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
      <div className="loginContainer">
        <div>
          <div className="login">
            Login:
         <form onSubmit={this.handleLoginSubmit} >
              <input type="text" value={this.usernameInput} onChange={this.handleUsernameChange}></input>
              <input type="password" value={this.passwordInput} onChange={this.handlePasswordChange}></input>
              <input type="submit"></input>
            </form>
          </div>
          <div className="signup">
            Sign Up:
          <form onSubmit={this.handleSignUpSubmit} >
              <input type="text" value={this.usernameInput} onChange={this.handleUsernameChange}></input>
              <input type="password" value={this.passwordInput} onChange={this.handlePasswordChange}></input>
              <input type="submit"></input>
            </form>
          </div>
        </div>
      </div>
    )
  }

  renderMessage = () => {
    return this.state.messages.slice(Math.max(this.state.messages.length - 10, 1)).map((msg, id) =>
      (<li key={id}> <strong>{msg.username}</strong> {msg.contents} </li>)
    )
  }

  // renderUsers = () => {
  //   let userArray = [];
  //   let finalArray = []
  //   let active = this.state.activeUsers.reverse()
  //   let time = new Date().toLocaleTimeString()
  //   let newArray;


  //   active.slice(Math.max(active.length - 100, 1)).map((x, id) =>
  //     userArray.push(x.username + " " + new Date(x.time).toLocaleTimeString())
  //   )


  //   if(userArray.length > 1) {
  //   //  var newArray = userArray[0].split(" ")
  //   //  console.log(newArray[0])
  //     for (var i = 0; i < userArray.length; i++) {
  //       newArray = userArray[i].split(" ")
  //       finalArray.push(userArray[i])
  //     }
  //   }
  //   console.log(finalArray)

  //   let unique = [...new Set(userArray)];

  //   return unique.map((user, id) =>
  //     (<li key={id}>{user}</li>)
  //   )
  // }


  onlineUsers = () => {

    let time = new Date().getTime()
    let active = []
    let userArray = this.state.activeUsers

    for (var i = 0; i < userArray.length; i++) {
      if (userArray[i].time >= time - 30000)
        active.push(userArray[i])
    }

    let unique = [...new Set(active.map(item => item.username))];

    return unique.map((user, id) =>
      (<li key={id}> {user} </li>)
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

        {/* ACTIVE USERS:
        <div>
          <ul>
            {this.renderUsers()}
          </ul>
        </div> */}

        ONLINE:
        <div>
          <ul>
            {this.onlineUsers()}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
