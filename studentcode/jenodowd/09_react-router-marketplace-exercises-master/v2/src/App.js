import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom'
import Seller from './Seller.js'
import Item from './Item.js'
import Details from './Details.js'
import Reviewer from './Reviewer.js'
import './App.css';
import { items } from './Data.js'
import { reviews } from './Data.js'
import { sellers } from './Data.js'

let renderAllItems = () => {
  return <div>
    <Link to ={'/allsellers/'}> All Sellers </Link>{
    items.map(item => (<Item
    price={item.price}
    sellerId={item.sellerId}
    itemId={item.itemId}
    imageLocation={item.image}
    description={item.description} />))}
    </div>
}

let renderSeller = routerData => {
  // the .id is the same as the :id from the Route below. 
  // You can give it any name, but they have to match.
  // For example, routerData.match.params.uniqueID would be fine too
  // But you would have to modify the Route below to /seller/:uniqueID
  return (<Seller sellerId={routerData.match.params.id} />)
}

let renderDetails = routerData => {
  return (<Details itemId={routerData.match.params.id}/>)
}

let renderReviewers = routerData => {
  return (<Reviewer reviewerId={routerData.match.params.id}/>)
}

let renderAllSellers = () => {
  var tempArray = []
  for(var i = 0; i < sellers.length; i++) {
   tempArray.push(<div><Link to = {'/seller/' + i}> {sellers[i].name} </Link></div>)
  } return tempArray;
}

class App extends Component {
  render() {
    return (
      <div>
      <BrowserRouter>
        <div>
          <Route exact={true} path='/' render={renderAllItems} />
          <Route exact={true} path='/seller/:id' render={renderSeller} />
          <Route exact={true} path='/details/:id' render={renderDetails} />
          <Route exact={true} path='/reviewer/:id' render={renderReviewers} />
          <Route exact={true} path='/allsellers/' render={renderAllSellers} />
        </div>
      </BrowserRouter>
      
      </div>
    );
  }
}

export default App;
