// import PropTypes from 'prop-types';
/* eslint-disable */
import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
// import Stripe from 'stripe';


class Cart extends Component {
  // constructor(props, ...rest) {
  //   super(props, ...rest);
  //   this.state = {};
  // }

  checkout = () => {
    let stripe = Stripe('pk_test_Wn2YO7OeD2dXg6WO7AEbZavF');

    stripe.redirectToCheckout({
      items: [
        // Replace with the ID of your SKU
        {sku: 'evt_1EhcQ4DOpEtVw4yVhgnHvqWd', quantity: 1}
      ],
      successUrl: 'https://example.com/success',
      cancelUrl: 'https://example.com/cancel',
    }).then(function (result) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    });

  }

  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  render() {
    return (
      <div className="container cart">
        <h2>Cart (1 item)</h2>
        <table>
          <thead>
            <tr>
              <th>ITEM</th>
              <th>QUANTITY</th>
              <th>UNIT PRICE</th>
              <th>SUBTOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img></img>
                <span>{this.props.cart.item['Entry Title']}</span>
              </td>
              <td>
                <select>
                  {
                    Array(10).fill(0).map((no, index) => (
                      <option value={index+1}>{index+1}</option>
                    ))
                  }
                </select>
              </td>
              <td>
                ₦ 10,000
              </td>
              <td>
              ₦ 10,000
              </td>
            </tr>
          </tbody>
        </table>
        <div className="total-wrapper">
          <div>
            <span><b>Total:</b> { '     ' }</span>
            <span><b>#10,000</b></span>
          </div>
          <br></br>

          <StripeCheckout
            token={this.onToken}
            name={this.props.cart.item['Entry Title']} // the pop-in header title// the pop-in header subtitle
            stripeKey="pk_test_Wn2YO7OeD2dXg6WO7AEbZavF"
          />
        </div>
      </div>
    );
  }
}

// Cart.propTypes = {};

export default Cart;