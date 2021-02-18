import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return { type: actionTypes.AUTH_START };
};

export const authSuccess = (authData) => {
  return { type: actionTypes.AUTH_SUCCESS, authData: authData };
};
export const authFailed = (error) => {
  return { type: actionTypes.AUTH_FAILED, error: error };
};

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDB62nE8yd5LdyUUzWTVxI046gx7w04Vek';
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    axios
      .post(url, data)
      .then((response) => {
        dispatch(authSuccess(response));
      })
      .catch((error) => {
        dispatch(authFailed(error));
      });
  };
};
