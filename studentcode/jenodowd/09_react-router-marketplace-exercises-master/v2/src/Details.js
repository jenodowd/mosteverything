import React, { Component } from 'react';
import './App.css';
import { items } from './Data.js'
import { sellers } from './Data.js'
import { reviews } from './Data.js'
import { Link } from 'react-router-dom'


class Details extends Component {

  render() {

    var reviewsJSX = items[this.props.itemId].reviews.map((el)=>{
      return (
        <div>
          <Link to = {'/reviewer/' + reviews[el].reviewerId}> {reviews[el].name} </Link>:
          {reviews[el].text}
        </div>
      )
    })
    return(
      <div>
        {items[this.props.itemId].description}
        <br />
        {reviewsJSX}
      </div>
    )
  }

}


export default Details;
