import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom'
import Seller from './Seller.js'
import Details from './Details.js'
import Item from './Item.js'
import './App.css';
import Reviewer from './Reviewer.js';
import {x} from "./Seller.js"
import {sellers} from './Seller.js'
//////////////////
console.log(x)

export let items = [{
    description: "Nice boats. 50% off. wow.",
    price: '$10000',
    stock: 1 + " left",
    image: "boat.png",
    sellerId: 0,
    detailId: 0
  },
  {
    description: "Lawn chairs",
    price: '$50',
    stock: 2 + " left",
    image: "lawnchair.jpg",
    sellerId: 1,
    detailId: 1
  },
  {
    description: "Chair",
    price: '$50',
    stock: 4 + " left",
    image: "chair.jpg",
    sellerId: 2,
    detailId: 2
  },
  {
    description: "Mug",
    price: '$5',
    stock: 10 + " left",
    image: "mug.jpg",
    sellerId: 2,
    detailId: 3
  },
  {
    description: "table",
    price: '$150',
    stock: 1 + " left",
    image: "table.jpg",
    sellerId: 2,
    detailId: 4,
    // reviews: [0]
  }
]


let renderAllItems = () => {
  return items.map(item => (<Item
    price={item.price}
    stock={item.stock}
    sellerId={item.sellerId}
    detailId={item.detailId}
    imageLocation={item.image}
    description={item.description} />))
}

let renderAllSellers = () => {
  return (<div>
    {sellers[0].name + " " + sellers[0].rating}
    <br />
    <Link to={"/seller/" + 0}>Shop</Link>
    <br />
    <br />
    {sellers[1].name + " " + sellers[1].rating}
    <br />
    <Link to={"/seller/" + 1}>Shop</Link>
    <br />
    <br />
    {sellers[2].name + " " + sellers[2].rating}
    <br />
    <Link to={"/seller/" + 2}>Shop</Link>
    </div>)
}



let renderSeller = routerData => {
  // the .id is the same as the :id from the Route below. 
  // You can give it any name, but they have to match.
  // For example, routerData.match.params.uniqueID would be fine too
  // But you would have to modify the Route below to /seller/:uniqueID
  return (<Seller id={routerData.match.params.id} />)
}

let renderDetails = routerData => {
  return (<Details id={routerData.match.params.id} />)
}

let renderReviewer = routerData => {
  return (
    <Reviewer
      id={routerData.match.params.id}
    />
  )

}

class App extends Component {
  constructor() {
    super()
    this.state = {
    }
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          {/* <Route exact={true} path='/seller' render={renderAllSellers} /> */}
          <Link to = {"/sellers"}>Sellers</Link>
          <Route exact={true} path='/' render={renderAllItems} />
          <Route exact={true} path='/sellers' render={renderAllSellers} />
          <Route exact={true} path='/seller/:id' render={renderSeller} />
          <Route exact={true} path='/details/:id' render={renderDetails} />
          <Route exact={true} path='/reviewer/:id' render={renderReviewer} />
          {/* <div>{renderAllSellers}</div> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
