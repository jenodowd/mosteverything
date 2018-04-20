import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import oneLinerJoke from 'one-liner-joke'

class App extends Component {
  constructor() {
    super();
    this.state = {sw: false}
  }

  clickTrue = () => {
    this.setState({sw: false})
  }

  clickFalse= () => {
    this.setState({sw: true})
  }


  render() {
    if(this.state.sw) {
      return (<button onClick = {this.clickTrue}> BUTTON 1 </button>);
      } return (<button onClick = {this.clickFalse}> BUTTON 2 </button>);
  }
}

export default App;
