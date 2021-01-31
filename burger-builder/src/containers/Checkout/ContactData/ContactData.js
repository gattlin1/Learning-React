import React, { Component } from 'react';
import './ContactData.css';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

export class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: this.state.name,
        email: this.state.email,
        address: {
          street: this.state.address.street,
          zipCode: this.state.address.postalCode,
          country: 'United States',
        },
      },
      deliveryMethod: 'pickup',
    };
    axios
      .post('/orders.json', order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = this.state.loading ? (
      <Spinner />
    ) : (
      <form>
        <input type='text' name='name' placeholder='name' />
        <input type='email' name='email' placeholder='email' />
        <input type='text' name='street' placeholder='street' />
        <input type='text' name='postalCode' placeholder='zip code' />
        <Button type='Success' clicked={this.orderHandler}>
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

export default ContactData;
