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
    this.setState({ items: newItems });
  }

  deleteEverything = () => {
    this.setState({ items: [] });
  }

  swapElements = (arr, i, j) => {
    let newArr = arr.slice();
    newArr[i] = arr[j];
    newArr[j] = arr[i];
    this.setState({ items: newArr });
  }

  // moveUp = (arr, i, j) => {
  //   let newArr = arr.slice();
  //   console.log(newArr, i, j);
  //   newArr[j] = arr[i];
  //   console.log(newArr)
  //   newArr[i] = arr[j];
  //   console.log(newArr)
  //   this.setState({ items: newArr });
  // }

  makeItem = (text, ind) => {
    return (<TodoItem
      deleteItem={this.itemDeleter}
      swapItem={this.swapElements}
      //moveUp={this.moveUp}
      arr={this.state.items}
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
