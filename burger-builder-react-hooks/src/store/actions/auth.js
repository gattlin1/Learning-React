import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return { type: actionTypes.AUTH_START };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};

export const authFailed = (error) => {
  return { type: actionTypes.AUTH_FAILED, error: error };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');

  return { type: actionTypes.AUTH_LOGOUT };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDB62nE8yd5LdyUUzWTVxI046gx7w04Vek';
    if (!isSignUp) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDB62nE8yd5LdyUUzWTVxI046gx7w04Vek';
    }
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    axios
      .post(url, data)
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);

        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFailed(error.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return { type: actionTypes.SET_AUTH_REDIRECT, path: path };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId');
        const expirationTime =
          (expirationDate.getTime() - new Date().getTime()) / 1000;
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout(expirationTime));
      } else {
        dispatch(logout());
      }
    }
  };
};
