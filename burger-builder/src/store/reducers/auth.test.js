import React from 'react';
import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';
import Adapter from 'enzyme-adapter-react-16';

describe('Auth Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      redirectPath: '/',
    });
  });

  it('should store the token upon login', () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          redirectPath: '/',
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          token: 'some-token',
          userId: 'some-user-id',
        }
      )
    ).toEqual({
      token: 'some-token',
      userId: 'some-user-id',
      error: null,
      loading: false,
      redirectPath: '/',
    });
  });
});
