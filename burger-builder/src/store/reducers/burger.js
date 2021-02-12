import * as actionTypes from '../actions';

const initialState = {
  ingredients: { meat: 0, cheese: 0, salad: 0, bacon: 0 },
  prices: { salad: 0.5, cheese: 0.4, meat: 1.3, bacon: 0.7 },
  totalPrice: 4,
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
      };
    }
    default:
      return state;
  }
};

export default reducer;
