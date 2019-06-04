// import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Header extends Component {
  // constructor(props, ...rest) {
  //   super(props, ...rest);
  //   this.state = {};
  // }



  render() {
    return (
      <div className="banner">
        <div style={{ height: this.props.searchText ? '400px' : '100%' }} className="overlay">
          <h1> The Best Market Place </h1>
          <input placeholder="Search for something amazing" value={this.props.searchText} onChange={this.props.onSearchText}></input>
        </div>


      </div>
    );
  }
}

// Header.propTypes = {};

export default Header;