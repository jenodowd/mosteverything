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
      </li>
    );
  }
}

export default TodoItem;
