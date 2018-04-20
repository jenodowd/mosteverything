import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {sw: true}
  }

  clickFalse = () => {
    this.setState({sw: false})
  }

  clickTrue= () => {
    this.setState({sw: true})
  }

  render() {
    if(this.state.sw) {
      return (<button onClick = {this.clickFalse}> BUTTON 1 </button>);
      } return (<button onClick = {this.clickTrue}> BUTTON 2 </button>);
  }
}

export default App;
