import React, { Component } from 'react';

export default (props) => {
  return (
    <div className="navbar">
      <div className="top-nav-wrapper">
        <div className="container">
          <ul className="left">
            <li>About</li>
            <li>Blog</li>
            <li>License</li>
          </ul>
          <ul className="right">
            <li>{Object.keys(props.cart.item).length > 1 ? 1 : 0} Item(s)</li>
            <li>Register</li>
            <li>Login</li>
          </ul>
        </div>
      </div>
      <nav>
        <div class="nav-wrapper">
          <div className="container">
            <a href="#" class="brand-logo">
              <img src="/img/logo.png" ></img>
            </a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li><a href="sass.html">Products</a></li>
              <li><a href="badges.html">Become a partner</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

  );
}