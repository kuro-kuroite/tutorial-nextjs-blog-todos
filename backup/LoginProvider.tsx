import React, { createContext, FC } from 'react';

import { isLogin } from '../lib/auth';

export const LoginContext = createContext<{
  isLogin: boolean;
}>({
  isLogin: false,
});

export const LoginContextProvider: FC = ({ children }) => {
  return (
    <LoginContext.Provider value={{ isLogin: isLogin() }}>
      {children}
    </LoginContext.Provider>
  );
};
