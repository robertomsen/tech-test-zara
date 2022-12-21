/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import './Nav.css';

function Nav({ loading }) {
  return (
    <nav>
      <Link to="/">Podcaster</Link>
      <div id="nav__loading">{loading === true ? <Spinner /> : loading}</div>
    </nav>
  );
}

export default Nav;
