import React, { useState } from 'react';
import './ContactData.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Forms/Input/Input';
import { connect } from 'react-redux';
import * as contactDataActions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-orders';
import {
  checkValidity,
  createInputElement,
  updateObject,
} from '../../../shared/utility';

const initialOrderFormState = {
  name: createInputElement('input', 'text', null, 'Your Name', '', {
    required: true,
  }),
  street: createInputElement('input', 'text', null, 'Street', '', {
    required: true,
  }),
  zipCode: createInputElement('input', 'text', null, 'Zip Code', '', {
    required: true,
    minLength: 5,
    maxLength: 5,
  }),
  country: createInputElement('input', 'text', null, 'Country', '', {
    required: true,
  }),
  email: createInputElement('input', 'email', null, 'Email', '', {
    required: true,
  }),
  deliveryMethod: createInputElement(
    'select',
    '',
    [
      { value: 'pickup', displayValue: 'Pickup' },
      { value: 'delivery', displayValue: 'Delivery' },
    ],
    '',
    'pickup',
    {}
  ),
};

export function ContactData(props) {
  const [orderForm, setOrderForm] = useState(initialOrderFormState);

  const orderHandler = (event) => {
    event.preventDefault();
    console.log('made it here');
    const formData = {};
    for (const formElement in orderForm) {
      formData[formElement] = orderForm[formElement].value;
    }

    const order = {
      ingredients: props.ingredients,
      price: props.price,
      orderData: formData,
      userId: props.userId,
    };
    props.onSubmitOrder(order, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      touched: true,
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation
      ),
    });
    const form = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement,
    });

    form[inputIdentifier] = updatedFormElement;
    setOrderForm(form);
  };

  const formElementsArray = [];
  for (const key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }

  let validForm = true;
  for (const element of formElementsArray) {
    validForm = element.config.valid && validForm;
  }

  let form = props.loading ? (
    <Spinner />
  ) : (
    <form onSubmit={orderHandler}>
      {formElementsArray.map((element) => (
        <Input
          key={element.id}
          elementType={element.config.elementType}
          elementConfig={element.config.elementConfig}
          value={element.config.value}
          invalid={!element.config.valid}
          shouldValidate={element.config.validation}
          touched={element.config.touched}
          changed={(event) => inputChangedHandler(event, element.id)}
        />
      ))}
      <Button type='Success' disabled={!validForm}>
        Order
      </Button>
    </form>
  );
  return (
    <div className='ContactData'>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitOrder: (data, userId, token) => {
      dispatch(contactDataActions.purchaseBurger(data, userId, token));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
