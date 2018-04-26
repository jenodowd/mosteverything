import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import {items} from './App.js'
import Item from './Item.js'


export let sellers = [{
  name: "Jack Frost",
  rating: "5 stars",
},
{
  name: "Hank Green",
  rating: "2 stars",
},
{
  name: "New Seller",
  rating: "4 stars",
},
]
//////////////////
export var x = "A"




class Seller extends Component {

  render() {

    var sellerId = this.props.id

    var itemsBySeller = items.filter((el,id)=>{
      return (Number(el.sellerId) === Number(sellerId))
    })

    console.log(itemsBySeller)
    var renderAllItems = itemsBySeller.map(item => (<Item
        price={item.price}
        stock={item.stock}
        // sellerId={item.sellerId}
        detailId={item.detailId}
        imageLocation={item.image}
        description={item.description} />))
    

    return (
      <div>
        <div className="card center">
          <div>
            <div>{sellers[this.props.id].name}</div>
            <div>{sellers[this.props.id].rating}</div>
            <div>{renderAllItems}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Seller;
