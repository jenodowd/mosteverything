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
    let newItem = { description: this.state.textEntered, highlighted: false }
    this.setState({ items: this.state.items.concat(newItem) })
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

  highlight = ind => {
    // this.state.items[ind].highlighted = !this.state.items[ind].highlighted;
    // this.setState({items: this.state.items})
    let newItems = this.state.items.slice();
    newItems[ind] = { ...newItems[ind] } //object copy
    newItems[ind].highlighted = !newItems[ind].highlighted;
    this.setState({items: newItems})
  }

  makeItem = (obj, ind) => {
    return (<TodoItem
      deleteItem={this.itemDeleter}
      swapItem={this.swapElements}
      //moveUp={this.moveUp}
      arr={this.state.items}
      description={obj.description}
      highlighted={obj.highlighted}
      highlight={this.highlight}
      index={ind} />)
  }

  render() {
    return (
      <div className="App">
        <ul>
          {this.state.items.map((obj, index) => this.makeItem(obj, index))}
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
