import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import oneLinerJoke from 'one-liner-joke'

class App extends Component {
  constructor(){
    super()
    this.state = {random: "GET RANDOM JOKE"}
  }

  click = () => {
    var getRandomJoke = oneLinerJoke.getRandomJoke().body;
    var getRandomJokeWithTag = oneLinerJoke.getRandomJokeWithTag('stupid');

    this.setState({random: getRandomJoke})
  }

  render() {
    return (
      <button onClick = {this.click}>{this.state.random}</button>
    );
  }
}

export default App;
