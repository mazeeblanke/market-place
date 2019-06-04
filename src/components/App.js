import React from 'react';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import Cart from './Cart';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {reactLocalStorage} from 'reactjs-localstorage';

class App extends React.Component {

  state = {
    cart: {
      quantity: 0,
      item: {},
      unitPrice: 1000
    }
  }

  componentDidMount () {

    let h = reactLocalStorage.getObject('cart');

    if (h && h.item.objectID) {
      this.setState({
        cart: h
      })
    }
  }

  addToCart = (item) => {
    let cart = {
      ...this.state.cart,
      item
    }
    this.setState({
      cart
    })
    console.log(reactLocalStorage.setObject('cart', cart));
  }

  render() {
    return (
      <div className="App">
        <Navbar cart={this.state.cart} />

        <Router>
          <Switch>
            <Route path="/" render={(props) => <Home {...props} addToCart={this.addToCart} />} exact></Route>
            <Route path="/cart" render={(props) => <Cart {...props} cart={this.state.cart}  />} exact></Route>
          </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
