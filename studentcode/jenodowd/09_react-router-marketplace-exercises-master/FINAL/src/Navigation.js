import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './App.css';

class Navigation extends Component {
  render() {
    return (
      <div className = "navContainer">
        <Link to={'/'}><img src = "http://localhost:3000/./images/router.png" alt="logo" /></Link>
        <ul className="navUL">
          <li className="navLI"><Link className="link" to={'/'}> Home  &nbsp;&nbsp;|&nbsp;&nbsp; </Link> </li>
          <li className="navLI"><Link className="link" to={'/allsellers/'}> All Sellers &nbsp;&nbsp;|&nbsp;&nbsp; </Link> </li>
          <li className="navLI"><Link className="link" to={'/newarrivals/'}> New Arrivals</Link> </li>
        </ul>
      </div>
    )
  }
}

export default Navigation;