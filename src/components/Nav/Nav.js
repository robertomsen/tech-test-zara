import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

function Nav() {
  return (
    <nav>
      <Link to="/">Podcaster</Link>
      <div id="nav__loading">LOADING</div>
    </nav>
  );
}

export default Nav;
