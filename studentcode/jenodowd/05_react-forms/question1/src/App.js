import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor() {
      super();
      this.state = {firstname: '', lastname: ''};
    }
   
    handleChangeFirst = (event) => {
      this.setState({firstname: event.target.value});
    }

    handleChangeSecond = (event) => {
      this.setState({lastname: event.target.value});
    }
   
    handleSubmit = (event) => {
      alert('A name was submitted: ' + this.state.firstname + ' ' + this.state.lastname);
      event.preventDefault();
    }
   
    render = () => {
      return (
        <form onSubmit={this.handleSubmit}>
            First Name:
            <input type="text" firstname={this.state.firstname} onChange={this.handleChangeFirst} />
            Last Name:
            <input type="text" lastname={this.state.lastname} onChange={this.handleChangeSecond} />
          <input type="submit" value="Submit" />
        </form>
      );
    }
   }

export default App;
