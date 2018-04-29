import React, { Component } from 'react';
import './App.css';

class TodoItem extends Component {

  removeSelf = () => {
    this.props.deleteItem(this.props.index);
  }

  highlight = () => {
    this.props.highlight(this.props.index)

  }

  moveToTop = () => {
    this.props.swapItem(this.props.arr, this.props.index, 0)
  }

  moveUpOne = () => {
    this.props.swapItem(this.props.arr, this.props.index, this.props.index - 1)
  }

  render() {
    let color = this.props.highlighted ? "red" : "black"
    return (
      <li style = {{color: color}}>
        <div>{this.props.description}</div>
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
