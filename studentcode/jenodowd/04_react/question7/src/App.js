import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {input: 0}
  }

  getInput = () => {
    var inp = document.getElementById("input").value
    this.setState({input: parseInt(inp)})
    this.interval = setInterval(this.updateTime, 1000)
  }

  updateTime = () => {
    this.setState({input: this.state.input - 1});
    if(this.state.input === 0) {
      clearInterval(this.interval)
    }
  }

  render() {
    return (
    <div>
      <input id="input" />
      <button onClick = {this.getInput}> CLICK </button>
      <div>
        {this.state.input}
      </div>
    </div>);
}
}

export default App;
