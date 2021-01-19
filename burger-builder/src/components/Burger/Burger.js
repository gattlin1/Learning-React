import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import './Burger.css';

const Burger = (props) => {
  const ingredients = Object.keys(props.ingredients).map((ingredient) => {
    return [...Array(props.ingredients[ingredient])].map((_, i) => (
      <BurgerIngredient key={ingredient + i} type={ingredient} />
    ));
  });
  return <div className='Burger'>{ingredients}</div>;
};

export default Burger;
