import React, { Component } from 'react';
import './App.css';

class TodoItem extends Component {

  constructor() {
    super()
    this.state = { color: "black" }
  }

  removeSelf = () => {
    this.props.deleteItem(this.props.index);
  }

  highlight = () => {
    this.setState({ color: "red" })
  }

  moveToTop = () => {
    this.props.swapItem(this.props.arr, this.props.index, 0)
  }

  moveUpOne = () => {
    this.props.swapItem(this.props.arr, this.props.index, this.props.index - 1)
  }

  render() {
    return (
      <li>
        <div style={{color: this.state.color}}>{this.props.description}</div>
        <button onClick={this.removeSelf} style={{ "margin-left": "20px" }}>
          delete
          </button>
        <button onClick={this.highlight}>
          highlight
        </button>
        <button onClick={this.moveToTop}>
          move to top
        </button>
        <button onClick={this.moveUpOne}>
          move up
        </button>
      </li>
    );
  }
}

export default TodoItem;
