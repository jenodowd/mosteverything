import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//var form = document.getElementById("form")

class App extends Component {

  IsNumber(){
    if(document.getElementById("input").value == "42"){
      alert("You guessed correctly");
      return false;
    }
      return alert("Wrong guess. Try again!");;
  }

  render() {
    return (<div><input id="input" /><button onClick={this.IsNumber} type="submit"> CLICK </button></div>); 
  }

}


export default App;