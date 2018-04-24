import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom'
import Seller from './Seller.js'
import Item from './Item.js'
import './App.css';

let items = [{
  description: "Nice boats. 50% off. wow.",
  price: '$10000',
  stock: 1 + " left",
  image: "boat.png",
  sellerId: 0
},
{
  description: "Lawn chairs",
  price: '$50',
  stock: 2 + " left",
  image: "lawnchair.jpg",
  sellerId: 1
},
{
  description: "Chair",
  price: '$50',
  stock: 4 + " left",
  image: "chair.jpg",
  sellerId: 2
},
{
  description: "Mug",
  price: '$5',
  stock: 10 + " left",
  image: "mug.jpg",
  sellerId: 2
},
{
  description: "table",
  price: '$150',
  stock: 1 + " left",
  image: "table.jpg",
  sellerId: 2
}
]

let renderAllItems = () => {
  return items.map(item => (<Item
    price={item.price}
    stock={item.stock}
    sellerId={item.sellerId}
    imageLocation={item.image}
    description={item.description} />))
}

let renderSeller = routerData => {
  // the .id is the same as the :id from the Route below. 
  // You can give it any name, but they have to match.
  // For example, routerData.match.params.uniqueID would be fine too
  // But you would have to modify the Route below to /seller/:uniqueID
  return (<Seller id={routerData.match.params.id} />)

}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path='/' render={renderAllItems} />
          <Route exact={true} path='/seller/:id' render={renderSeller} />
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
