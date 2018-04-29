
let reviews = [{
  name: "Bob",
  text: "great boat",
  reviewerId: 0
},
{
  name: "Joe",
  text: "cool",
  reviewerId: 3
},
{
  name: "Jack",
  text: "great chair",
  reviewerId: 4
},
{
  name: "Joe",
  text: "not bad",
  reviewerId: 5
},
{
  name: "Bob",
  text: "great ?",
  reviewerId: 0
}
]


let items = [{
  itemId: 0,
  description: "Nice boats. 50% off. wow.",
  price: 10000,
  image: "boat.png",
  sellerId: 0,
  reviews: [0, 1]
},
{
  itemId: 1,
  description: "Lawn chairs",
  price: 50,
  image: "lawnchair.jpg",
  sellerId: 1,
  reviews: [2, 3]
},
{
  itemId: 2,
  description: "Chair",
  price: 50,
  image: "chair.jpg",
  sellerId: 2,
  reviews: [4, 1]
},
{
  itemId: 3,
  description: "Table",
  price: 50,
  image: "table.jpg",
  sellerId: 2,
  reviews: [0, 3]
},
{
  itemId: 4,
  description: "Mug",
  price: 50,
  image: "mug.jpg",
  sellerId: 2,
  reviews: [1, 4]
}
]


let sellers = [{
  name: "Jack Frost",
  rating: "5 stars"
},
{
  name: "Hank Green",
  rating: "2 stars"
},
{
  name: "Josie",
  rating: "3 stars"
}
]


export {items};
export {sellers};
export {reviews};