import React from 'react';
import './CheckoutSummary.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';

function CheckoutSummary(props) {
  let burger = props.ingredients ? (
    <Burger ingredients={props.ingredients} />
  ) : (
    <Spinner />
  );

  return (
    <div className='CheckoutSummary'>
      <h1>We hope it tastes good!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>{burger}</div>
      <Button type='Danger' clicked={props.onCheckoutCancelled}>
        Cancel
      </Button>
      <Button type='Success' clicked={props.onCheckoutContinued}>
        Continue
      </Button>
    </div>
  );
}

export default CheckoutSummary;
