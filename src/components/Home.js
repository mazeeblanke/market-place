// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header'
import Spinner from './Spinner';
import Display from './Display';
import SearchResults from './SearchResults';
import { withFirebase } from './Firebase'

class Home extends Component {
  state = {
    searchText: '',
    results: {hits: []},
    loading: false
  }

  handleInput = (e) => {
    this.setState({
      searchText: e.target.value,
      results: { hits: [] }
    })
    if (e.target.value) {
      this.search()
    }

  }


  search = () => {
    this.setState({ loading: true })
    this.props.algoliaIndex.search(this.state.searchText)
    .then((res) => {
      this.setState({
        results: res
      })
      this.setState({ loading: false })
    })
    .catch(() => {
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      <div>
        <Header searchText={this.state.searchText} onSearchText={this.handleInput} />
        <Display if={!this.state.searchText && !this.state.loading && !this.state.results.hits.length}>
          <img className="splashimg" src="/img/undraw_empty_cart_co35.svg" />
        </Display>
        <Display if={this.state.loading}>
          <Spinner height="40vh" />
        </Display>
        <Display if={!this.state.loading && this.state.results.hits.length}>
          <SearchResults {...this.props} addToCart={this.props.addToCart} results={this.state.results.hits} />
        </Display>
        <Display if={!this.state.loading && this.state.results.nbHits === 0}>
          <img className="emptystate" src="/img/emptystate.png" />
        </Display>
      </div>
    );
  }
}

// componentName.propTypes = {};

export default withFirebase(Home);