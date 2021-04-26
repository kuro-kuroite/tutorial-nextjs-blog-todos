import { NextPage } from 'next';
import React from 'react';

import { Auth } from '../components/Auth/Auth';
import { Layout } from '../components/Layout/Layout';

const SignUpPage: NextPage = () => (
  <Layout title="Login">
    {/* <h1>
      Hello Next.js
      <span aria-label="hello" role="img">
        👋
      </span>
    </h1> */}
    <Auth />
  </Layout>
);

export default SignUpPage;
