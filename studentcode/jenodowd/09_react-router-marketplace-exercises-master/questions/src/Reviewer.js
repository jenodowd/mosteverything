import React, { Component } from 'react';
import './App.css';

let reviewer = [{
  name: "Jack",
  review: [0, 2]
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

let formatDetails = (reviewer) => {
  return (<div className="card center">
    <div>
      <div>{reviewer.name}: {reviewer.review}</div>
    </div>
  </div>)
}


class Reviewer extends Component {
  render() {
    return (
      <div>{formatDetails(reviewer[this.props.id])}</div>
    );
  }
}

export default Reviewer;
