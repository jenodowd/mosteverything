import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './App.css';

class Item extends Component {
  render() {
    return (
      <div className="center">
        <img height="100px" src={this.props.imageLocation} alt="useruploadeditem" />
        <div> <div>{this.props.description}</div>
          <div>{this.props.price}</div>
          <Link to={"/seller/" + this.props.sellerId}> Link to seller </Link>
          <br />
          <Link to={"/details/" + this.props.itemId}> Link to Details </Link>
        </div>
      </div>
    )
  }
}

export default Item;