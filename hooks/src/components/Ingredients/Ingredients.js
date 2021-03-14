import React, { useReducer, useEffect, useCallback } from 'react';

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

function httpReducer(httpState, action) {
  switch (action.type) {
    case 'SEND':
      return { ...httpState, loading: true };
    case 'RESPONSE':
      return { ...httpState, loading: false };
    case 'ERROR':
      return { error: action.error, loading: false };
    case 'CLEAR':
      return { ...httpState, error: null };
    default:
      throw new Error(`Unhandled type: ${action.type}`);
  }
}

function Ingredients() {
  const [ingredients, dispatchIngrednients] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });

  useEffect(() => {
    console.log('RENDERING INGREDIENTS');
  }, [ingredients]);

  const addIngredientHandler = (ingredient) => {
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
  };

  const removeIngredientHandler = (id) => {
    dispatchHttp({ type: 'SEND' });
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
        dispatchIngrednients({ type: 'DELETE', id: id });
        dispatchHttp({ type: 'RESPONSE' });
      })
      .catch((err) => {
        dispatchHttp({ type: 'ERROR', error: err.message });
      });
  };

  const filteredIngredientsHandler = useCallback((ingredients) => {
    dispatchIngrednients({ type: 'SET', ingredients: ingredients });
  }, []);

  const clearErrorHandler = () => {
    dispatchHttp({ type: 'CLEAR' });
  };

  return (
    <div className='App'>
      {httpState.error && (
        <ErrorModal onClose={clearErrorHandler}>{httpState.error}</ErrorModal>
      )}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={httpState.loading}
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
