import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import './Burger.css';

const Burger = (props) => {
  let ingredients = Object.keys(props.ingredients)
    .map((ingredient) => {
      return [...Array(props.ingredients[ingredient])].map((_, i) => (
        <BurgerIngredient key={ingredient + i} type={ingredient} />
      ));
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (ingredients.length === 0) {
    ingredients = <p>Please Start Adding Ingredients</p>;
  }
  return (
    <div className='Burger'>
      <BurgerIngredient type='bread-top' />
      {ingredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default Burger;
