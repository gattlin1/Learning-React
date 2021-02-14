import * as ActionTypes from '../actions/actionTypes';
const initialState = { results: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.STORE_RESULT:
      return {
        ...state,
        results: state.results.concat({
          id: new Date(),
          value: action.value,
        }),
      };
    case ActionTypes.DELETE_RESULT:
      const newResults = state.results.filter((e) => e.id !== action.id);
      return { ...state, results: newResults };
    default:
      return state;
  }
};

export default reducer;
