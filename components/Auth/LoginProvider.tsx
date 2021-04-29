import React, {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from 'react';

export const LoginContext = createContext<{
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}>({
  isLogin: false,
  setIsLogin: () => {
    return;
  },
});

export const LoginContextProvider: FC = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
