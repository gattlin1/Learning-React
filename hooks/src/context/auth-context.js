import React from 'react';

export const AuthContext = React.createContext({
  isAuth: false,
  login: () => {},
});

function AuthContextProvider(props) {
  return <AuthContext.Provider>{...props.children}</AuthContext.Provider>;
}
