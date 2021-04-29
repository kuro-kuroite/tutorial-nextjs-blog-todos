import '../styles/tailwind.css';
import '../styles/reset.css';
import '../styles/a11y.css';
import '../styles/base.css';

import { AppProps } from 'next/app';
import React, { VFC } from 'react';

import { LoginContextProvider } from '../components/Auth/LoginProvider';

const App: VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <LoginContextProvider>
      <Component {...pageProps} />
    </LoginContextProvider>
  );
};

export default App;
