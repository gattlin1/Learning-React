import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

function Checkout(props) {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const onCheckoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  let summary = <Redirect to='/' />;
  if (props.ingredients) {
    const purchasedRedirect = props.purchased ? <Redirect to='/' /> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ingredients}
          onCheckoutCancelled={checkoutCancelledHandler}
          onCheckoutContinued={onCheckoutContinuedHandler}
        />
        <Route
          path={props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
  return summary;
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
