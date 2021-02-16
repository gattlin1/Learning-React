import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, data) => {
  return { type: actionTypes.PURCHASE_BURGER_SUCCESS, id: id, data: data };
};

export const purchaseBurgerFailed = (error) => {
  return { type: actionTypes.PURCHASE_BURGER_FAILED, error: error };
};

export const purchaseBurgerStart = () => {
  return { type: actionTypes.PURCHASE_BURGER_START };
};
export const purchaseBurger = (data) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post('/orders.json', data)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(purchaseBurgerFailed(error));
      });
  };
};
