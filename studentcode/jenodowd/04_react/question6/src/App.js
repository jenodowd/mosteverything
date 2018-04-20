import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = { input: [] }
  }

  changeInput = () => {
    var x = document.getElementById("input").value
    this.setState({ input: this.state.input.concat(x) })
  }

  makeLi = () => {
    return this.state.input.map(input => (<li> {input} </li>));
  }

  render() {
    return (
      <div>
        <input id="input" />
        <button onClick={this.changeInput}> CLICK </button>
        <ul>{this.makeLi()}</ul>
      </div>
    );
  }
}

export default App;
