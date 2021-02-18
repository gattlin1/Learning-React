import React from 'react';
import './NavigaitonItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => {
  return (
    <ul className='NavigationItems'>
      <NavigationItem link='/'>Burger Builder</NavigationItem>
      <NavigationItem link='/orders'>Orders</NavigationItem>
      <NavigationItem link='/auth'>Sign In</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
