import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import Seller from './Seller.js';
import { items } from './Data.js'
import { sellers } from './Data.js'
import { reviews } from './Data.js'

import './App.css';

class Item extends Component {
  render() {
    return (<div className="card center ">
      <img height="100px" src={this.props.imageLocation} />
      <div> <div>{this.props.description}</div>
        <div>{this.props.price}</div>
        <Link to={"/seller/" + this.props.sellerId}> Link to seller </Link>
        <br />
        <Link to={"/details/" + this.props.itemId}> Link to Details </Link>
      </div>
    </div>)
  }
}

export default Item;