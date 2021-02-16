import * as actionTypes from '../actions/actionTypes';

const initialState = { orders: [], loading: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return { ...state, loaading: true };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = { ...action.order, id: action.id };
      return { ...state, orders: state.orders.concat(newOrder) };
    case actionTypes.PURCHASE_BURGER_FAILED:
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
