import React, { Component } from 'react';
import './App.css';
//import Reviewer from './Reviewer.js'

let details = [{
  info: "Here is some product info",
  reviews: [0, 1]
},
{
  info: "Here is some product info",
  reviews: [5, 2]
},
{
  info: "Here is some product info",
  reviews: [1, 2]
},
{
  info: "Here is some product info",
  reviews: [3, 4]
},
{
  info: "Here is some product info",
  reviews: [3, 1]
}
]


let reviews = [
  {
    name: 'Jack',
    review: 'great'
  },
  {
    name: "Joe",
    review: "good",
  },
  {
    name: "Bob",
    review: "awesome!",
  },
  {
    name: "Fred",
    review: "ok",
  },
  {
    name: "Jane",
    review: "ok",
  },
  {
    name: "Lucy",
    review: "not bad",
  },
]


let formatDetails = (details) => {
  return (<div className="card center">
    <div>
      <div>{details.info}</div>
      <br />
      <div>{ details.reviews.map(reviewID => <div> {`Name: ${reviews[reviewID].name}
        Review: ${reviews[reviewID].review}`} </div>) }
        <br />
      </div>
    </div>
  </div>)
}


class Details extends Component {
  render() {
    return (
      <div>{formatDetails(details[this.props.id])}</div>
    );
  }
}

export default Details;
