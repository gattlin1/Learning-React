import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: { meat: 0, cheese: 0, salad: 0, bacon: 0 },
  prices: { salad: 0.5, cheese: 0.4, meat: 1.3, bacon: 0.7 },
  totalPrice: 4,
  error: false,
  building: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1,
        },
        totalPrice: state.totalPrice + state.prices[action.ingredient],
        building: true,
      };
    }
    case actionTypes.REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1,
        },
        totalPrice: state.totalPrice - state.prices[action.ingredient],
        building: true,
      };
    }
    case actionTypes.SET_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: initialState.totalPrice,
        building: true,
      };
    }
    case actionTypes.FETCH_INGREDIENTS_FAILED: {
      return {
        ...state,
        error: true,
      };
    }
    default:
      return state;
  }
};

export default reducer;
