import * as actionTypes from './actions';

const initialState = { persons: [] };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PERSON: {
      return {
        ...state,
        persons: state.persons.concat({
          name: action.payload.person.name,
          id: action.payload.person.id,
          age: action.payload.person.age,
        }),
      };
    }
    case actionTypes.DELETE_PERSON: {
      const newPersons = state.persons.filter(
        (person) => person.id !== action.payload.person.id
      );

      return { ...state, persons: newPersons };
    }
    default:
      return state;
  }
};

export default reducer;
