import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './App.css';

class SideNav extends Component {
  render() {
    return (
      <div className = "sideNavContainer" style={{height : "100%"}}>
        <ul className="sideNavUL">
          <li className="sideNavTitle">Sort by:</li>
          <li className="sideNavLI"><Link className="sidelink" to={'/'}>Price</Link></li>
          <li className="sideLI"><Link className="sideSubLink" to={'/lowtohigh'}>Low to High</Link></li>
          <li className="sideLI"><Link className="sideSubLink" to={'/hightolow'}>High to Low</Link></li>
          <li className="sideLI"><Link className="sideSubLink" to={'/under50'}>Under $50</Link></li>
          <li className="sideLI"><Link className="sideSubLink" to={'/under100'}>Under $100</Link></li>
          <li className="sideLI"><Link className="sideSubLink" to={'/under200'}>Under $200</Link></li>
          <li className="sideNavLI"><Link className="sidelink" to={'/allsellers/'}> Colour</Link> </li>
          <Link className="sidelink" to={'/pink/'}> <img src = "http://localhost:3000/pink.jpg" alt=""/> </Link> 
          <Link className="sidelink" to={'/blue/'}> <img src = "http://localhost:3000/blue.jpg" alt=""/> </Link> 
          <Link className="sidelink" to={'/white/'}> <img src = "http://localhost:3000/white.jpg" alt=""/> </Link> 
        </ul>
      </div>
    )
  }
}

export default SideNav;