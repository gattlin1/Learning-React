import { useCallback, useReducer } from 'react';
const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: '',
};

function httpReducer(httpState, action) {
  switch (action.type) {
    case 'SEND':
      return {
        ...httpState,
        loading: true,
        data: null,
        identifier: action.identifier,
      };
    case 'RESPONSE':
      return {
        ...httpState,
        loading: false,
        data: action.data,
        extra: action.extra,
      };
    case 'ERROR':
      return { ...httpState, error: action.error, loading: false };
    case 'CLEAR':
      return initialState;
    default:
      throw new Error(`Unhandled type: ${action.type}`);
  }
}
function useHttp() {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const clear = useCallback(() => {
    dispatchHttp({ type: 'CLEAR' });
  }, []);

  const sendRequest = useCallback((url, method, body, extra) => {
    dispatchHttp({ type: 'SEND', identifier: method });
    fetch(url, {
      method: method,
      body: body,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        dispatchHttp({ type: 'RESPONSE', data: responseData, extra: extra });
      })
      .catch((err) => {
        dispatchHttp({ type: 'ERROR', error: err.message });
      });
  }, []);

  return {
    isLoading: httpState.loading,
    resError: httpState.error,
    resData: httpState.data,
    clear: clear,
    sendRequest: sendRequest,
    reqExtra: httpState.extra,
    identifier: httpState.identifier,
  };
}

export default useHttp;
