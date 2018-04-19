import React from 'react'
import ReactDOM from 'react-dom'

var div = document.getElementById("div");

var elem = React.createElement("h1", null, "hello");

ReactDOM.render(elem, div)