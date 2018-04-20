import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.randomNumber = (Math.floor(Math.random() * 100) + 1)
  }

  IsNumber = () => {
    var inp = document.getElementById("input").value

    if (inp == this.randomNumber) {
      return alert("You guessed correctly")
    }
    if (inp > this.randomNumber) {
      return alert("Your guess is too high")
    }
    return alert("Your guess is too low")
  }

  render() {
    return (<div><input id="input" /><button onClick={this.IsNumber} type="submit"> CLICK </button></div>);
  }
}

export default App;
