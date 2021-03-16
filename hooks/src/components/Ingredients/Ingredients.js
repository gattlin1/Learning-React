import React, { useReducer, useEffect, useCallback, useMemo } from 'react';

import useHttp from '../../hooks/http';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

function ingredientReducer(currentIngredients, action) {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter((ig) => ig.id !== action.id);
    default:
      throw new Error(`Unhandled type: ${action.type}`);
  }
}

function Ingredients() {
  const [ingredients, dispatchIngrednients] = useReducer(ingredientReducer, []);

  useEffect(() => {
    console.log('RENDERING INGREDIENTS');
  }, [ingredients]);

  const { isLoading, httpError, httpData, sendRequest } = useHttp();

  const addIngredientHandler = useCallback((ingredient) => {
    dispatchHttp({ type: 'SEND' });
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
        dispatchIngrednients({
          type: 'ADD',
          ingredient: { id: responseData.name, ...ingredient },
        });
        dispatchHttp({ type: 'RESPONSE' });
      })
      .catch((err) => {
        dispatchHttp({ type: 'ERROR', error: err.message });
      });
  }, []);

  const removeIngredientHandler = useCallback(
    (id) => {
      sendRequest(
        `https://react-hooks-cd957-default-rtdb.firebaseio.com/ingredients/${id}.json`,
        'DELETE'
      );
    },
    [sendRequest]
  );

  const filteredIngredientsHandler = useCallback((ingredients) => {
    dispatchIngrednients({ type: 'SET', ingredients: ingredients });
  }, []);

  const clearErrorHandler = useCallback(() => {
    dispatchHttp({ type: 'CLEAR' });
  }, []);

  const ingredientList = useMemo(
    () => (
      <IngredientList
        ingredients={ingredients}
        onRemoveItem={removeIngredientHandler}
      />
    ),
    [ingredients, removeIngredientHandler]
  );

  return (
    <div className='App'>
      {httpError && (
        <ErrorModal onClose={clearErrorHandler}>{httpError}</ErrorModal>
      )}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
