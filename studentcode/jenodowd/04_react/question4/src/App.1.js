import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      number : 0
    }
    this.getRandomNumber = this.getRandomNumber.bind(this)
    this.IsNumber = this.IsNumber.bind(this)
    this.callTwoFunctions = this.callTwoFunctions.bind(this)
  }

  callTwoFunctions(){
    this.getRandomNumber()
    this.IsNumber()
  }

  getRandomNumber () {
    this.setState({
      number : Math.floor(Math.random() * 100) + 1
    })
  }

  IsNumber() {
    console.log(this.state.number)
    var x = document.getElementById("input").value

    if (x == this.state.number) {
      return alert("You guessed correctly")
    }
    if (x > this.state.number) {
      return alert("Your guess is too high")
    }
    return alert("Your guess is too low")
  }

  render() {

    return (<div><input id="input" onChange={this.getRandomNumber}/><button onClick={this.IsNumber} type="submit"> CLICK </button></div>);
  }
}

export default App;
