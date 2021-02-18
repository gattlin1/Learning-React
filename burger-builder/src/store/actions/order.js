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

export const purchaseInit = () => {
  return { type: actionTypes.PURCHASE_INIT };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error,
  };
};

export const fetchOrdersStart = () => {
  return { type: actionTypes.FETCH_ORDERS_START };
};
export const fetchOrders = () => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    axios
      .get('/orders.json')
      .then((response) => {
        const fetchedOrders = [];
        for (const key in response.data) {
          fetchedOrders.push({ ...response.data[key], id: key });
        }

        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((error) => {
        dispatch(fetchOrdersFailed(error));
      });
  };
};
