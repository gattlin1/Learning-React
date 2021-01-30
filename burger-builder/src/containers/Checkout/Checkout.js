import React, { Component } from 'react';
import { Route } from 'react-router';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = { ingredients: null };

  componentDidMount() {
    const queryParams = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let [ingredient, count] of queryParams.entries()) {
      ingredients[ingredient] = +count;
    }

    this.setState({ ingredients: ingredients });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  onCheckoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };
  render() {
    console.log(this.props.match.path);
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onCheckoutCancelled={this.checkoutCancelledHandler}
          onCheckoutContinued={this.onCheckoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
}

export default Checkout;
