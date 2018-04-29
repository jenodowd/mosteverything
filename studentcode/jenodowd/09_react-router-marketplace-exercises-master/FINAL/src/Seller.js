import React, { Component } from 'react';
import './App.css';
import { sellers } from './Data.js'
import { items } from './Data.js'
import { Link } from 'react-router-dom'

let itemBySeller = (id) => {
  var tempArray = [];
  for (var i = 0; i < items.length; i++) {
    if (Number(items[i].sellerId) === Number(id)) {
      tempArray.push(
        <div><Link className = "sellersLink" to = {'/details/' + items[i].itemId}> {items[i].description} </Link></div>
      )
    }
  } return tempArray;
}


let formatSeller = (seller) => {
  return (<div>
    <div>
      <div className="sellerName">{seller.name}</div>
      <div>{seller.rating}</div>
    </div>
  </div>)
}

class Seller extends Component {
  render() {
    return (
      <div className = "sellers">
      <div>{formatSeller(sellers[this.props.sellerId])}</div>
      <br />
      <div>
        Items for sale: 
        <br />
        {itemBySeller(this.props.sellerId)}</div>
      </div>
    );
  }
}

export default Seller;
