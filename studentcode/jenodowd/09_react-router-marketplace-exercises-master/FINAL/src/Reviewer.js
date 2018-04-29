import React, { Component } from 'react';
import './App.css';
import { reviews } from './Data.js'

let getReviewerReviews = (id) => {
  var newArr = [];
  for(var i = 0; i < reviews.length; i++) {
    if (Number(reviews[i].reviewerId) === Number(id)) {
      newArr.push(<div>{reviews[i].name + ": " + reviews[i].text}</div>)
    }
  } return newArr;
}


class Reviewer extends Component {
  render() {
    return (<div>
      <div>{getReviewerReviews(this.props.reviewerId)}</div>
      </div>
    )}
}

export default Reviewer;

