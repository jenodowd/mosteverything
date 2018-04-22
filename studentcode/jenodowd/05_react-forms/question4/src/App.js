import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { firstname: '', lastname: '' };
  }

  handleChangeFirst = (event) => {
    this.setState({ firstname: event.target.value });
  }

  handleChangeSecond = (event) => {
    this.setState({ lastname: event.target.value });
  }

  handleSubmit = (event) => {
    alert('A name was submitted: ' + this.state.firstname + ' ' + this.state.lastname);
    event.preventDefault();
  }

  checkEmpty = () => {
    if (this.state.firstname !== "" && this.state.lastname !== "") {
      return <input type="submit" value="Submit" />
    }
  }

  swapInput = () => {
    this.setState({firstname: this.state.lastname, lastname: this.state.firstname})
  }

  render = () => {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          First Name:
          <input type="text" value={this.state.firstname} onChange={this.handleChangeFirst} />
          Last Name:
          <input type="text" value={this.state.lastname} onChange={this.handleChangeSecond} />
          {this.checkEmpty()}
        </form>
        <button onClick={this.swapInput}>Swap</button>
      </div>
    );
  }
}


export default App;
