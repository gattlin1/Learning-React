import * as actionTypes from './actionTypes';

export const storeResult = (value) => {
  return (dispatch, getState) => {
    setTimeout(() => {
      const oldCounter = getState().counter.counter;
      console.log('oldCounter', oldCounter);
      dispatch({
        type: actionTypes.STORE_RESULT,
        value: value,
      });
    }, 2000);
  };
};

export const deleteResult = (id) => {
  return {
    type: actionTypes.DELETE_RESULT,
    id: id,
  };
};
