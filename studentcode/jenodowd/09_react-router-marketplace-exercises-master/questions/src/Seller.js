import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'

let sellers = [{
  name: "Jack Frost",
  rating: "5 stars",
},
{
  name: "Hank Green",
  rating: "2 stars"
},
{
  name: "New Seller",
  rating: "4 stars"
},
]
//////////////////
export var x = "A"

class Seller extends Component {
  render() {
    return (
      <div>
        <div className="card center">
          <div>
            <div>{sellers[this.props.id].name}</div>
            <div>{sellers[this.props.id].rating}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Seller;
