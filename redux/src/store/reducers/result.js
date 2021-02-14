import * as ActionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = { results: [] };

const deleteResult = (state, action) => {
  const newResults = state.results.filter((e) => e.id !== action.id);
  return updateObject(state, { results: newResults });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.STORE_RESULT:
      return updateObject(state, {
        results: state.results.concat({
          id: new Date(),
          value: action.value,
        }),
      });
    case ActionTypes.DELETE_RESULT:
      return deleteResult(state, action);
    default:
      return state;
  }
};

export default reducer;
