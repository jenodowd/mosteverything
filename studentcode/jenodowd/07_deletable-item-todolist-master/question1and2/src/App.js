import React, { Component } from 'react';
import './App.css';
import TodoItem from './TodoItem.js';

class App extends Component {
  constructor() {
    super();
    this.state = { items: [], textEntered: "" }
  }

  handleChange = (event) => {
    this.setState({ textEntered: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ items: this.state.items.concat(this.state.textEntered) })
  }

  itemDeleter = ind => {
    let newItems = this.state.items.filter((item, i) => ind !== i); // Removes the element at index ind
    this.props.updateAllMessages(newItems);
  }

  deleteEverything = () => {
    this.setState({ items: [] });
  }

  makeItem = (text, ind) => {
    return (<TodoItem
      deleteItem={this.itemDeleter}
      description={text}
      index={ind} />)
  }

  render() {
    return (
      <div className="App">
        <ul>
          {this.state.items.map((itemText, index) => this.makeItem(itemText, index))}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} value={this.state.textEntered} />
          <input type="submit" />
        </form>
        <button onClick={this.deleteEverything}>Delete Everything</button>
      </div>
    );
  }
}

export default App;
