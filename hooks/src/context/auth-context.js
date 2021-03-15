import React, { useState } from 'react';

export const AuthContext = React.createContext({
  isAuth: false,
  login: () => {},
});

function AuthContextProvider(props) {
  const [isAuth, setIsAuth] = useState(false);

  const login = () => {
    setIsAuth(true);
  };

  return (
    <AuthContext.Provider value={{ login: login, isAuth: isAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
