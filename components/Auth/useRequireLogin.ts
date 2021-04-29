import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useRequireLogin = (isLogin: boolean): void => {
  const router = useRouter();

  useEffect(() => {
    // NOTE: redirectLogin()の route.push('/') がうまくいかない場合、以下を使用する
    // router.beforePopState(({ as, options, url }) => {
    //   if (url === '/' || url === '/signUp' || url === '/_error') {
    //     return true;
    //   }

    //   if (isLogin) {
    //     return true;
    //   }

    //   // CSR リダイレクト処理
    //   // window.location.href = '/';
    //   void router.push('/');

    //   return false;
    // });

    const redirectLogin = async () => {
      if (isLogin) {
        return;
      }

      const allowUrls = ['/', '/signup', '/_error'];

      if (allowUrls.includes(router.pathname)) {
        return;
      }

      await router.push('/');
    };

    void redirectLogin();
  }, [isLogin, router]);
};
