import React, { Component } from 'react';
import './App.css';
import { items } from './Data.js'
import { reviews } from './Data.js'
import { Link } from 'react-router-dom'


class Details extends Component {

  render() {

    var reviewsJSX = items[this.props.itemId].reviews.map((el) => {
      return (
        <div className = "reviews">
          <Link className = "reviewLink" to={'/reviewer/' + reviews[el].reviewerId}>{reviews[el].name}</Link>:
          &nbsp;{reviews[el].text}
        </div>
      )
    })
    return (
      <div className = "details">
        <img src={"http://localhost:3000/" + items[this.props.itemId].biggerImage} alt="useruploadeditem" />
        <div className = "itemInfo">
        <div className = "description">{items[this.props.itemId].description}</div>
        <div>${items[this.props.itemId].price}</div>
        <br />
        <div>Reviews:</div>
        {reviewsJSX}
        </div>
      </div>
    )
  }

}


export default Details;
