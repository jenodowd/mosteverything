import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './App.css';

class SideNav extends Component {
  render() {
    return (
      <div className = "sideNavContainer">
        <ul className="sideNavUL">
          <li className="sideNavTitle">Sort by:</li>
          <li className="sideNavLI"><Link className="sidelink" to={'/'}>Price</Link></li>
          <li className="sideNavLI"><Link className="sidelink" to={'/allsellers/'}> Colour</Link> </li>
          <li className="sideNavLI"><Link className="sidelink" to={'/allsellers/'}> Reviews </Link> </li>
        </ul>
      </div>
    )
  }
}

export default SideNav;