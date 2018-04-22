import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(){
    super()
    this.state = {items: []}
  }

  changeInput = () => {
    var inp = document.getElementById("input").value
    this.setState({items: this.state.items.concat(inp)})
    document.getElementById("input").value = ""
  }

  makeLi = (x) => {
    return (<li>{x}</li>)
  }

  render() {
    return (
      <div>
        <input id = "input"></input>
        <button onClick = {this.changeInput} type = "submit"> CLICK </button>
        <ul>{this.state.items.map(this.makeLi)}</ul>
      </div>
    );
  }
}

export default App;
