import React, { Component } from 'react';
import './App.css';

class ChatLine extends Component {

  constructor() {
    super()
  }
  deleteItem = () => {
    this.props.deleteItem(this.props.index)
  }
  render(){
    return (
      <div>
        {this.props.userName + " : " + this.props.text} 
        <button onClick={this.deleteItem}> DELETE </button>
      </div>
    )
  }
}

export default ChatLine;
