import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    console.log('RENDERING INGREDIENTS');
  }, [ingredients]);

  const addIngredientHandler = (ingredient) => {
    setIsLoading(true);
    fetch(
      'https://react-hooks-cd957-default-rtdb.firebaseio.com/ingredients.jon',
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
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  const removeIngredientHandler = (id) => {
    setIsLoading(true);
    fetch(
      `https://react-hooks-cd957-default-rtdb.firebaseio.com/ingredients/${id}.json`,
      {
        method: 'Delete',
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setIngredients((prevIngredients) =>
          prevIngredients.filter((ig) => ig.id !== id)
        );
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const filteredIngredientsHandler = useCallback((ingredients) => {
    setIngredients(ingredients);
  }, []);

  const clearErrorHandler = () => {
    setError(null);
  };

  return (
    <div className='App'>
      {error && <ErrorModal onClose={clearErrorHandler}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={IsLoading}
      />
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
