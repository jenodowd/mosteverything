import React, { Component } from 'react';
import './App.css';
import Reviewer from './Reviewer.js';
import { Link } from 'react-router-dom'

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


var reviews = [
  {
    name: 'Jack',
    authorId : 0,
    review: 'great',
  },
  {
    name: "Joe",
    authorId : 1,
    review: "good",
  },
  {
    name: "Bob",
    authorId : 2,
    review: "awesome!",
  },
  {
    name: "Fred",
    authorId : 3,
    review: "ok",
  },
  {
    name: "Jane",
    authorId : 4,
    review: "ok",
  },
  {
    name: "Lucy",
    authorId : 5,
    review: "not bad",
  },
  {
    name: "Jack",
    authorId : 0,
    review: "really bad",
  },
]


let formatDetails = (details) => {

var reviewsListJSX = details.reviews.map((reviewID) => {
  return (
    <div> 
      Name:
     <Link to={"/reviewer/" + reviews[reviewID].authorId}> {reviews[reviewID].name} </Link>
      <br/>
      Review:{reviews[reviewID].review}
      <hr/>
    </div>
    )
  })

  return (<div className="card center">
    <div>
      <div>{details.info}</div>
      <br />
      <div>{ reviewsListJSX }
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
