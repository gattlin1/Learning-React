import React, { Component } from 'react';
import './ContactData.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Forms/Input/Input';
import { connect } from 'react-redux';
import * as contactDataActions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-orders';

export class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: { required: true },
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: { required: true },
        valid: false,
        touched: false,
      },

      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code',
        },
        value: '',
        validation: { required: true, minLength: 5, maxLength: 5 },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: { required: true },
        valid: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
        },
        value: '',
        validation: { required: true },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'pickup', displayValue: 'Pickup' },
            { value: 'delivery', displayValue: 'Delivery' },
          ],
        },
        validation: {},
        value: 'pickup',
        valid: true,
        touched: false,
      },
    },
  };

  orderHandler = (event) => {
    event.preventDefault();
    console.log('made it here');
    const formData = {};
    for (const formElement in this.state.orderForm) {
      formData[formElement] = this.state.orderForm[formElement].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };
    this.props.onSubmitOrder(order, this.props.token);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const form = { ...this.state.orderForm };
    const updatedFormElement = { ...form[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    form[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: form });
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  render() {
    const formElementsArray = [];
    for (const key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let validForm = true;
    for (const element of formElementsArray) {
      validForm = element.config.valid && validForm;
    }

    let form = this.props.loading ? (
      <Spinner />
    ) : (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((element) => (
          <Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            invalid={!element.config.valid}
            shouldValidate={element.config.validation}
            touched={element.config.touched}
            changed={(event) => this.inputChangedHandler(event, element.id)}
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
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitOrder: (data, token) => {
      dispatch(contactDataActions.purchaseBurger(data, token));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
