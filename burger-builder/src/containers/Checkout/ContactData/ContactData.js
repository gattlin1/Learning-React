import React, { Component } from 'react';
import './ContactData.css';

import Button from '../../../components/UI/Button/Button';

export class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
  };

  render() {
    return (
      <div className='ContactData'>
        <h4>Enter your Contact Data</h4>
        <form>
          <input type='text' name='name' placeholder='name' />
          <input type='email' name='email' placeholder='email' />
          <input type='text' name='street' placeholder='street' />
          <input type='text' name='postalCode' placeholder='zip code' />
          <Button type='Success'>Order</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
