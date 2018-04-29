
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
  description: "Tassle Pillow",
  price: 20,
  image: "./images/1.jpg",
  biggerImage: "./images/1-b.jpg",
  sellerId: 0,
  reviews: [0, 1],
  dateAdded: 'March',
  colour: "pink"
},
{
  itemId: 1,
  description: "Fringe Pillow",
  price: 25,
  image: "./images/2.jpg",
  biggerImage: "./images/2-b.jpg",
  sellerId: 1,
  reviews: [2, 3],
  dateAdded: 'April',
  colour: "white"
},
{
  itemId: 2,
  description: "Ceramic Vase",
  price: 50,
  image: "./images/3.jpg",
  biggerImage: "./images/3-b.jpg",
  sellerId: 2,
  reviews: [4, 1],
  dateAdded: 'March',
  colour: "white"
  
},
{
  itemId: 3,
  description: "Chair",
  price: 250,
  image: "./images/4.jpg",
  biggerImage: "./images/4-b.jpg",
  sellerId: 2,
  reviews: [0, 3],
  dateAdded: 'April',
  colour: "pink"
  
},
{
  itemId: 4,
  description: "Ottoman",
  price: 200,
  image: "./images/5.jpg",
  biggerImage: "./images/5-b.jpg",
  sellerId: 2,
  reviews: [1, 4],
  dateAdded: 'March',
  colour: "pink"
},
{
  itemId: 5,
  description: "Velvet Chair",
  price: 350,
  image: "./images/6.jpg",
  biggerImage: "./images/6-b.jpg",
  sellerId: 2,
  reviews: [1, 4],
  dateAdded: 'March',
  colour: "blue"
},
{
  itemId: 6,
  description: "Chair",
  price: 275,
  image: "./images/7.jpg",
  biggerImage: "./images/7-b.jpg",
  sellerId: 2,
  reviews: [1, 4],
  dateAdded: 'April',
  colour: "white"
},
{
  itemId: 7,
  description: "Embroidered Pillow",
  price: 60,
  image: "./images/8.jpg",
  biggerImage: "./images/8-b.jpg",
  sellerId: 2,
  reviews: [1, 4],
  dateAdded: 'March',
  colour: "white"
},
{
  itemId: 8,
  description: "Candle Holder",
  price: 30,
  image: "./images/9.jpg",
  biggerImage: "./images/9-b.jpg",
  sellerId: 2,
  reviews: [1, 4],
  dateAdded: 'April',
  colour: "white"
},
{
  itemId: 9,
  description: "Knit Blanket",
  price: 220,
  image: "./images/10.jpg",
  biggerImage: "./images/10-b.jpg",
  sellerId: 2,
  reviews: [1, 4],
  dateAdded: 'March',
  colour: "pink"
},
{
  itemId: 10,
  description: "Multicolour Vases",
  price: 75,
  image: "./images/11.jpg",
  biggerImage: "./images/11-b.jpg",
  sellerId: 2,
  reviews: [1, 4],
  dateAdded: 'April',
  colour: "blue"
},
{
  itemId: 11,
  description: "Fringe Blanket",
  price: 150,
  image: "./images/12.jpg",
  biggerImage: "./images/12-b.jpg",
  sellerId: 2,
  reviews: [1, 4],
  dateAdded: 'March',
  colour: "white"
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