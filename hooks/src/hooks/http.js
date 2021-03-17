import { useCallback, useReducer } from 'react';

function httpReducer(httpState, action) {
  switch (action.type) {
    case 'SEND':
      return { ...httpState, loading: true, data: null };
    case 'RESPONSE':
      return {
        ...httpState,
        loading: false,
        data: action.data,
        extra: action.extra,
      };
    case 'ERROR':
      return { error: action.error, loading: false };
    case 'CLEAR':
      return { ...httpState, error: null };
    default:
      throw new Error(`Unhandled type: ${action.type}`);
  }
}
function useHttp() {
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
    data: null,
    extra: null,
  });

  const sendRequest = useCallback((url, method, body, extra) => {
    dispatchHttp({ type: 'SEND', extra: extra });
    fetch(url, {
      method: method,
      body: body,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        dispatchHttp({ type: 'RESPONSE', data: responseData });
      })
      .catch((err) => {
        dispatchHttp({ type: 'ERROR', error: err.message });
      });
  }, []);

  return {
    isLoading: httpState.loading,
    error: httpState.error,
    data: httpState.data,
    sendRequest: sendRequest,
    reqExtra: httpState.extra,
  };
}

export default useHttp;
