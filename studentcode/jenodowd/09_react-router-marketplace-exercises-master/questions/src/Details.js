import React, { Component } from 'react';
import './App.css';

let details = [{
  name: "Jack",
  review: "great",
},
{
  name: "Joe",
  review: "good",
},
{
  name: "Bob",
  review: "ok",
},
]

let formatDetails = (details) => {
  return (<div className="card center">
    <div>
      <div>{details.name}: {details.review}</div>
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
