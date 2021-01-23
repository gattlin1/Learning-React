import React from 'react';
import './NavigaitonItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => {
  return (
    <ul className='NavigationItems'>
      <NavigationItem link='/' active>
        Burger Builder
      </NavigationItem>
      <NavigationItem link='/'>Checkout</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
