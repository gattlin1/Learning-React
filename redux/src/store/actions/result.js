import * as actionTypes from './actionTypes';

export const storeResult = (value) => {
  return (dispatch) => {
    setTimeout(() => {
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
