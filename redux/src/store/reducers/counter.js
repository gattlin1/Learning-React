import * as ActionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = { counter: 0 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return updateObject(state, { counter: state.counter + 1 });
    case ActionTypes.DECREMENT:
      return updateObject(state, { counter: state.counter - 1 });
    case ActionTypes.ADD:
      return updateObject(state, { counter: state.counter + action.value });
    case ActionTypes.SUB:
      return updateObject(state, { counter: state.counter - action.value });
    default:
      return state;
  }
};

export default reducer;
