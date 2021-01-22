import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import './BuildControls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];
const BuildControls = (props) => {
  return (
    <div className='BuildControls'>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((ingredient) => {
        return (
          <BuildControl
            key={ingredient.type}
            label={ingredient.label}
            disabled={props.disabled[ingredient.type]}
            added={() => props.ingredientAdded(ingredient.type)}
            removed={() => props.ingredientRemoved(ingredient.type)}
          />
        );
      })}
      <button
        className='OrderButton'
        disabled={!props.purchaseable}
        onClick={props.ordered}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;
