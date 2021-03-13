import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    console.log('RENDERING INGREDIENTS');
  }, [ingredients]);

  const addIngredientHandler = (ingredient) => {
    fetch(
      'https://react-hooks-cd957-default-rtdb.firebaseio.com/ingredients.json',
      {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeIngredientHandler = (id) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ig) => ig.id !== id)
    );
  };

  const filteredIngredientsHandler = useCallback((ingredients) => {
    setIngredients(ingredients);
  }, []);

  return (
    <div className='App'>
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
