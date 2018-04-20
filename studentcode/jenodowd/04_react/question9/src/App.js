import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {a: "" , b: "", c: ""}
    this.x = {x: "X"}
    this.switch = {sw: true}
  }

  click = () => {
    this.setState({a: this.x.x }) 
    this.setState({sw: false }) 
  }
  click2 = () => {
    this.setState({b: this.x.x }) 
    this.setState({sw: false }) 
  }
  click3 = () => {
    this.setState({c: this.x.x }) 
    this.setState({sw: false }) 
  }




  render() {
    return (<div><button onClick ={this.click}>{this.state.a}</button><button onClick ={this.click2}>{this.state.b}</button><button onClick ={this.click3}>{this.state.c}</button></div>);
  }
}

export default App;
