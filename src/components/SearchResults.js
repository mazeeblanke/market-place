// import PropTypes from 'prop-types';
import React, { Component } from 'react';

class SearchResults extends Component {

  handleBuyAction = (result) => {
    this.props.addToCart(result);
    this.props.history.push('cart');
  }

  render() {
    return (
      <div className="container">
        <h3>Search Results ({this.props.results.length})</h3>
        <table>
          <thead>
            <tr>
              <th>Concept Id</th>
              <th>Entry Title</th>
              <th>Provider Id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.results.map((result) => {
                return (
                  <tr key={result['Concept Id']}>
                    <td>{ result['Concept Id'] }</td>
                    <td className="title">{ result['Entry Title'] }</td>
                    <td>{ result['Provider Id'] }</td>
                    <td>
                      <button onClick={() => this.handleBuyAction(result) } className="btn">Buy</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

// SearchResults.propTypes = {};

export default SearchResults;