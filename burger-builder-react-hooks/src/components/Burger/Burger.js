import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import './Burger.css';

const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingredient) => {
      return [...Array(props.ingredients[ingredient])].map((_, i) => (
        <BurgerIngredient key={ingredient + i} type={ingredient} />
      ));
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please Start Adding Ingredients</p>;
  }
  return (
    <div className='Burger'>
      <BurgerIngredient type='bread-top' />
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default Burger;
