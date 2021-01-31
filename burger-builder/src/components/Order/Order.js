import React from 'react';
import './Order.css';

function Order(props) {
  const ingredients = [];
  for (const ingredient in props.ingredients) {
    ingredients.push({
      name: ingredient,
      amount: props.ingredients[ingredient],
    });
  }
  console.log(ingredients);

  const ingredientOutput = ingredients.map((ingredient) => {
    return (
      <span
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px',
        }}
        key={ingredient.name}
      >
        {ingredient.name}: ({ingredient.amount})
      </span>
    );
  });

  return (
    <div className='Order'>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
}

export default Order;
