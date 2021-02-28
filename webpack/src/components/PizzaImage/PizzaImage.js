import React from 'react';
import './PizzaImage.css';
import PizzaImage from '../../assets/pizza.jpg';

const PizzaImage = () => {
  return (
    <div className='PizzaImage'>
      <img src={PizzaImage} alt='pizza' className='PizzaImg' />
    </div>
  );
};

export default PizzaImage;
