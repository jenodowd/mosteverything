import React, { Component } from 'react';
import './App.css';


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

let reviewer = [{
  name: "Jack",
  reviewList : [0,6],
},
{
  name: "Joe",
  reviewList : [1],
},
{
  name: "Bob",
  reviewList : [2],
},
{
  name: "Fred",
  reviewList : [3],
},
{
  name: "Jane",
  reviewList : [4],
},
{
  name: "Lucy",
  reviewList : [5], 
}
]

class Reviewer extends Component {
  render() {
    console.log(this.props)
    console.log(reviewer[Number(this.props.id)].reviewList)
    var tempArray = reviewer[Number(this.props.id)].reviewList
    var reviewsJSX = tempArray.map((el)=>{
      return(
        <div>
          item : 
          {reviews[el].review}
          <hr/>
        </div>
      )
    })

    return (
      <div>{reviewsJSX}</div>
    );
  }
}

export default Reviewer;
