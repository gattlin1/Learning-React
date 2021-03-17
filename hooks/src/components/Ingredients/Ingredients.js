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
  const { isLoading, httpError, httpData, sendRequest, reqExtra } = useHttp();

  useEffect(() => {
    dispatchIngrednients({ type: 'DELETE', id: reqExtra });
  }, [httpData, reqExtra]);

  const addIngredientHandler = useCallback(
    (ingredient) => {
      sendRequest(
        'https://react-hooks-cd957-default-rtdb.firebaseio.com/ingredients.json',
        'POST',
        JSON.stringify(ingredient),
        null
      );
    },
    [sendRequest]
  );

  const removeIngredientHandler = useCallback(
    (id) => {
      sendRequest(
        `https://react-hooks-cd957-default-rtdb.firebaseio.com/ingredients/${id}.json`,
        'DELETE',
        null,
        id
      );
    },
    [sendRequest]
  );

  const filteredIngredientsHandler = useCallback((ingredients) => {
    dispatchIngrednients({ type: 'SET', ingredients: ingredients });
  }, []);

  const clearErrorHandler = useCallback(() => {
    //dispatchHttp({ type: 'CLEAR' });
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
