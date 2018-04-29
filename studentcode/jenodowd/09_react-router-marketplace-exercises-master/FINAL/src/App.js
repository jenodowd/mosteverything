import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom'
import Seller from './Seller.js'
import Item from './Item.js'
import Details from './Details.js'
import Reviewer from './Reviewer.js'
import Navigation from './Navigation.js'
import SideNav from './SideNav.js'
import { items } from './Data.js'
import { sellers } from './Data.js'
import './App.css';

let renderAllItems = () => {
  return <div>
    <SideNav />
    <div className="items">
      {items.map(item => (
        <Item
          price={item.price}
          sellerId={item.sellerId}
          itemId={item.itemId}
          imageLocation={item.image}
          description={item.description} />
      ))}
    </div>
  </div>
}

let renderNewArrivals = () => {
  var tempArray = []
  for (var i = 0; i < items.length; i++) {
    if (items[i].dateAdded === "April") {
      tempArray.push(items[i])
    }
  }
  return <div>
  <SideNav />
  <div className="newArrivals">
    {tempArray.map(item => (
      <Item
        price={item.price}
        sellerId={item.sellerId}
        itemId={item.itemId}
        imageLocation={"http://localhost:3000/" + item.image}
        description={item.description} />
    ))}
  </div>
</div>
}


let under50 = () => {
  var tempArray = []
  for (var i = 0; i < items.length; i++) {
    if (items[i].price <= 50) {
      tempArray.push(items[i])
    }
  }
  return <div>
  <SideNav />
  <div className="newArrivals">
    {tempArray.map(item => (
      <Item
        price={item.price}
        sellerId={item.sellerId}
        itemId={item.itemId}
        imageLocation={"http://localhost:3000/" + item.image}
        description={item.description} />
    ))}
  </div>
</div>
}

let under100 = () => {
  var tempArray = []
  for (var i = 0; i < items.length; i++) {
    if (items[i].price <= 100) {
      tempArray.push(items[i])
    }
  }
  return <div>
  <SideNav />
  <div className="newArrivals">
    {tempArray.map(item => (
      <Item
        price={item.price}
        sellerId={item.sellerId}
        itemId={item.itemId}
        imageLocation={"http://localhost:3000/" + item.image}
        description={item.description} />
    ))}
  </div>
</div>
}


let under200 = () => {
  var tempArray = []
  for (var i = 0; i < items.length; i++) {
    if (items[i].price <= 200) {
      tempArray.push(items[i])
    }
  }
  return <div>
  <SideNav />
  <div className="newArrivals">
    {tempArray.map(item => (
      <Item
        price={item.price}
        sellerId={item.sellerId}
        itemId={item.itemId}
        imageLocation={"http://localhost:3000/" + item.image}
        description={item.description} />
    ))}
  </div>
</div>
}

let pink = () => {
  var tempArray = []
  for (var i = 0; i < items.length; i++) {
    if (items[i].colour === "pink") {
      tempArray.push(items[i])
    }
  }
  return <div>
  <SideNav />
  <div className="newArrivals">
    {tempArray.map(item => (
      <Item
        price={item.price}
        sellerId={item.sellerId}
        itemId={item.itemId}
        imageLocation={"http://localhost:3000/" + item.image}
        description={item.description} />
    ))}
  </div>
</div>
}

let blue = () => {
  var tempArray = []
  for (var i = 0; i < items.length; i++) {
    if (items[i].colour === "blue") {
      tempArray.push(items[i])
    }
  }
  return <div>
  <SideNav />
  <div className="newArrivals">
    {tempArray.map(item => (
      <Item
        price={item.price}
        sellerId={item.sellerId}
        itemId={item.itemId}
        imageLocation={"http://localhost:3000/" + item.image}
        description={item.description} />
    ))}
  </div>
</div>
}

let white = () => {
  var tempArray = []
  for (var i = 0; i < items.length; i++) {
    if (items[i].colour === "white") {
      tempArray.push(items[i])
    }
  }
  return <div>
  <SideNav />
  <div className="newArrivals">
    {tempArray.map(item => (
      <Item
        price={item.price}
        sellerId={item.sellerId}
        itemId={item.itemId}
        imageLocation={"http://localhost:3000/" + item.image}
        description={item.description} />
    ))}
  </div>
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
  return (<Details itemId={routerData.match.params.id} />)
}

let renderReviewers = routerData => {
  return (<Reviewer reviewerId={routerData.match.params.id} />)
}

let renderAllSellers = () => {
  var tempArray = []
  for (var i = 0; i < sellers.length; i++) {
    tempArray.push(<div><Link className = "allsellers" to={'/seller/' + i}> {sellers[i].name} </Link></div>)
  } return tempArray;
}

let sortByPrice = () => {
  //TEST:
  // var price = [];
  // var sort = [];
  // for (var i = 0; i < items.length; i++) {
  //    price.push(<div>{items[i].price}</div>)
  // } 
  // for (var ii = 0; ii < price.length; ii++) {
  //   sort.push(price[ii].props.children)
  // }
  // return sort.sort(function(a, b){return a-b});

  return <div>
    <SideNav />
    <div className="items">
      {items.map(item => (
      <Item
        price={item.price}
        sellerId={item.sellerId}
        itemId={item.itemId}
        imageLocation={item.image}
        description={item.description} />
      )).sort(function(a, b){a.price-b.price})}
      
  </div>
  </div>
}


class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Navigation />
            <Route exact={true} path='/' render={renderAllItems} />
            <Route exact={true} path='/newarrivals' render={renderNewArrivals} />
            <Route exact={true} path='/under50' render={under50} />
            <Route exact={true} path='/under100' render={under100} />
            <Route exact={true} path='/under200' render={under200} />
            <Route exact={true} path='/pink' render={pink} />
            <Route exact={true} path='/blue' render={blue} />
            <Route exact={true} path='/white' render={white} />
            <Route exact={true} path='/seller/:id' render={renderSeller} />
            <Route exact={true} path='/details/:id' render={renderDetails} />
            <Route exact={true} path='/reviewer/:id' render={renderReviewers} />
            {/* <Route exact={true} path='/price/' render={sortByPrice} /> */}
            <Route exact={true} path='/allsellers/' render={renderAllSellers} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
