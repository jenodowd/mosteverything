import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './App.css';

class Item extends Component {
  render() {
    return (
      <div className="center">
        <Link to={"/details/" + this.props.itemId}><img src={this.props.imageLocation} alt="useruploadeditem" /></Link>
          <div>{this.props.description}</div>
          <div>{this.props.price}</div>
          <Link to={"/seller/" + this.props.sellerId}> Link to seller </Link>
      </div>
          )
        }
      }
      
export default Item;