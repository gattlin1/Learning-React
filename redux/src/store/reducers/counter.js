import * as ActionTypes from '../actions/actionTypes';
const initialState = { counter: 0 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return { ...state, counter: state.counter + 1 };
    case ActionTypes.DECREMENT:
      return { ...state, counter: state.counter - 1 };
    case ActionTypes.ADD:
      return { ...state, counter: state.counter + action.value };
    case ActionTypes.SUB:
      return { ...state, counter: state.counter - action.value };
    default:
      return state;
  }
};

export default reducer;
